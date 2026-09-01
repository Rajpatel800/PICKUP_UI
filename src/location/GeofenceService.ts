import { LocationService } from './LocationService';
import type { GeofenceEvent, GeofenceRequest } from './types';
import type { EmitterSubscription } from 'react-native';

export class GeofenceService {
  private static instance: GeofenceService;
  private activeGeofences = new Set<string>();
  private nativeSub: EmitterSubscription | null = null;
  private listeners = new Set<(event: GeofenceEvent) => void>();

  private constructor() {}

  static getInstance(): GeofenceService {
    if (!GeofenceService.instance) {
      GeofenceService.instance = new GeofenceService();
    }
    return GeofenceService.instance;
  }

  async addGeofence(request: GeofenceRequest): Promise<boolean> {
    const success = await LocationService.addGeofence(request);
    if (success) {
      this.activeGeofences.add(request.id);
      this.ensureSubscription();
    }
    return success;
  }

  async removeGeofence(id: string): Promise<boolean> {
    const success = await LocationService.removeGeofence(id);
    if (success) {
      this.activeGeofences.delete(id);
      if (this.activeGeofences.size === 0) {
        this.clearSubscription();
      }
    }
    return success;
  }

  async clearAllGeofences(): Promise<void> {
    const ids = Array.from(this.activeGeofences);
    await Promise.all(ids.map(id => this.removeGeofence(id)));
  }

  hasGeofence(id: string): boolean {
    return this.activeGeofences.has(id);
  }

  subscribe(callback: (event: GeofenceEvent) => void): () => void {
    this.listeners.add(callback);
    this.ensureSubscription();
    return () => {
      this.listeners.delete(callback);
      if (this.listeners.size === 0 && this.activeGeofences.size === 0) {
        this.clearSubscription();
      }
    };
  }

  private ensureSubscription() {
    if (!this.nativeSub) {
      this.nativeSub = LocationService.subscribeToGeofenceEvents(this.handleNativeEvent.bind(this));
    }
  }

  private clearSubscription() {
    if (this.nativeSub) {
      this.nativeSub.remove();
      this.nativeSub = null;
    }
  }

  private handleNativeEvent(event: GeofenceEvent) {
    // Only dispatch events for geofences we explicitly know about in JS
    if (this.activeGeofences.has(event.geofenceId)) {
      this.listeners.forEach(listener => listener(event));
    }
  }
}
