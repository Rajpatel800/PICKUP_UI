import { LocationService } from '../../location/LocationService';
import { TrackingAdapter } from './TrackingAdapter';
import { EmitterSubscription } from 'react-native';

export class TrackingService {
  private static instance: TrackingService;
  private currentTripId: string | null = null;
  private locationSubscription: EmitterSubscription | null = null;

  private constructor() {}

  static getInstance(): TrackingService {
    if (!TrackingService.instance) {
      TrackingService.instance = new TrackingService();
    }
    return TrackingService.instance;
  }

  public startPublishingForTrip(tripId: string) {
    this.currentTripId = tripId;
    if (!this.locationSubscription) {
      this.locationSubscription = LocationService.subscribeToLocationUpdates((location) => {
        if (this.currentTripId) {
          TrackingAdapter.getInstance().publishLocation(
            { latitude: location.latitude, longitude: location.longitude },
            this.currentTripId
          ).catch((e: unknown) => {
            console.warn('[TrackingService] Failed to publish location:', e instanceof Error ? e.message : 'Unknown error');
          });
        }
      });
    }
  }

  public stopPublishing() {
    this.currentTripId = null;
    if (this.locationSubscription) {
      this.locationSubscription.remove();
      this.locationSubscription = null;
    }
  }
}