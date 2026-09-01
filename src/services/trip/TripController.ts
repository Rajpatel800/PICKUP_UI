import type { ActiveTrip } from '../../types/trip';
import { ArrivalDetectionService } from './ArrivalDetectionService';
import { TripService } from './TripService';

export class TripController {
  private static instance: TripController;
  private currentTrip: ActiveTrip | null = null;
  private listeners = new Set<(trip: ActiveTrip | null) => void>();

  private constructor() {}

  static getInstance(): TripController {
    if (!TripController.instance) {
      TripController.instance = new TripController();
    }
    return TripController.instance;
  }

  setTrip(trip: ActiveTrip | null) {
    this.currentTrip = trip;
    this.notifyListeners();
    ArrivalDetectionService.getInstance().syncTripState(trip);
  }

  getTrip(): ActiveTrip | null {
    return this.currentTrip;
  }

  subscribe(listener: (trip: ActiveTrip | null) => void) {
    this.listeners.add(listener);
    listener(this.currentTrip);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener(this.currentTrip));
  }

  // Application actions
  async acceptOffer(tripId: string) {
    const activeTrip = await TripService.getInstance().acceptTrip(tripId);
    this.setTrip(activeTrip);
  }

  async verifyPickupOTP(tripId: string, otp: string) {
    const updatedTrip = await TripService.getInstance().updateState(tripId, 'in_transit', { otp });
    this.setTrip(updatedTrip);
  }

  async loadInitialTrip() {
    try {
      const trip = await TripService.getInstance().getActiveTrip();
      if (trip) {
        this.setTrip(trip);
      }
    } catch (e) {
      console.warn('Failed to load initial active trip', e);
    }
  }

  // Expose this for development/testing if needed, but primarily we rely on loadInitialTrip
  async loadMockTrip() {
    await this.loadInitialTrip();
  }
}
