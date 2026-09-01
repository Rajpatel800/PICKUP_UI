import { GeofenceService } from '../../location/GeofenceService';
import type { GeofenceEvent } from '../../location/types';
import type { ActiveTrip, TripStop } from '../../types/trip';

export interface ArrivalConfig {
  defaultRadiusMeters: number;
  maxStaleEventAgeMs: number;
}

export type ArrivalEvent = {
  tripId: string;
  stopId: string;
  stopType: 'pickup' | 'drop' | 'drop_final';
  timestamp: number;
};

export class ArrivalDetectionService {
  private static instance: ArrivalDetectionService;
  
  private geofenceService: GeofenceService;
  private listeners = new Set<(event: ArrivalEvent) => void>();
  private geofenceSub: (() => void) | null = null;
  
  private currentTripId: string | null = null;
  private expectedStop: TripStop | null = null;
  private lastProcessedTimestamp = 0;
  private hasArrivedAtCurrentStop = false;

  private config: ArrivalConfig = {
    defaultRadiusMeters: 100, // configurable
    maxStaleEventAgeMs: 60000, // 60s
  };

  private constructor() {
    this.geofenceService = GeofenceService.getInstance();
    this.geofenceSub = this.geofenceService.subscribe(this.handleGeofenceEvent.bind(this));
  }

  static getInstance(): ArrivalDetectionService {
    if (!ArrivalDetectionService.instance) {
      ArrivalDetectionService.instance = new ArrivalDetectionService();
    }
    return ArrivalDetectionService.instance;
  }

  setConfig(config: Partial<ArrivalConfig>) {
    this.config = { ...this.config, ...config };
  }

  async syncTripState(trip: ActiveTrip | null): Promise<void> {
    if (!trip) {
      await this.clearState();
      return;
    }

    if (trip.status === 'completed' || trip.status === 'cancelled' || trip.status === 'expired') {
      await this.clearState();
      return;
    }

    const currentStop = trip.stops[trip.currentStopIndex];
    if (!currentStop) {
      await this.clearState();
      return;
    }

    if (trip.status === 'en_route_pickup' || trip.status === 'in_transit') {
      await this.registerStopGeofence(trip.id, currentStop);
    } else {
      await this.clearState();
    }
  }

  private async clearState(): Promise<void> {
    if (this.expectedStop) {
      await this.geofenceService.removeGeofence(this.expectedStop.id);
    }
    this.currentTripId = null;
    this.expectedStop = null;
    this.hasArrivedAtCurrentStop = false;
  }

  private async registerStopGeofence(tripId: string, stop: TripStop): Promise<void> {
    if (this.expectedStop?.id === stop.id && this.currentTripId === tripId) {
      return;
    }

    if (this.expectedStop && this.expectedStop.id !== stop.id) {
      await this.geofenceService.removeGeofence(this.expectedStop.id);
    }

    this.currentTripId = tripId;
    this.expectedStop = stop;
    this.hasArrivedAtCurrentStop = false;
    this.lastProcessedTimestamp = 0;

    try {
      await this.geofenceService.addGeofence({
        id: stop.id,
        latitude: stop.latitude,
        longitude: stop.longitude,
        radiusMeters: this.config.defaultRadiusMeters,
      });
    } catch (error) {
      console.warn(`[ArrivalDetection] Failed to add geofence for stop ${stop.id}:`, error);
    }
  }

  private handleGeofenceEvent(event: GeofenceEvent) {
    if (!this.expectedStop || !this.currentTripId) {
      return;
    }

    if (event.geofenceId !== this.expectedStop.id) {
      return;
    }

    if (Date.now() - event.timestamp > this.config.maxStaleEventAgeMs) {
      return;
    }

    if (event.timestamp <= this.lastProcessedTimestamp) {
      return;
    }

    if (event.transitionType === 'enter') {
      if (this.hasArrivedAtCurrentStop) {
        return;
      }
      
      this.hasArrivedAtCurrentStop = true;
      this.lastProcessedTimestamp = event.timestamp;
      
      this.emitArrivalEvent({
        tripId: this.currentTripId,
        stopId: this.expectedStop.id,
        stopType: this.expectedStop.type,
        timestamp: event.timestamp,
      });
    }
  }

  private emitArrivalEvent(event: ArrivalEvent) {
    this.listeners.forEach(listener => listener(event));
  }

  subscribe(callback: (event: ArrivalEvent) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }
}
