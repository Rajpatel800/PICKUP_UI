import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';

export interface ITrackingAdapter {
  publishLocation(location: { latitude: number; longitude: number }, tripId: string): Promise<void>;
}

export class MockTrackingAdapter implements ITrackingAdapter {
  async publishLocation(location: { latitude: number; longitude: number }, tripId: string): Promise<void> {
    // Simulate latency
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 200));
    console.log(`[MockTrackingAdapter] Published location [${location.latitude}, ${location.longitude}] for trip ${tripId}`);
  }
}

export class ApiTrackingAdapter implements ITrackingAdapter {
  private client = ApiClient.getInstance();

  async publishLocation(location: { latitude: number; longitude: number }, tripId: string): Promise<void> {
    // Fire and forget, no retry to avoid building up stale locations
    this.client.post(`/tracking/${tripId}/location`, location, { retryable: false }).catch(err => {
      console.warn('[ApiTrackingAdapter] Failed to publish location', err);
    });
  }
}

export class TrackingAdapter {
  private static instance: ITrackingAdapter;

  static getInstance(): ITrackingAdapter {
    if (!TrackingAdapter.instance) {
      TrackingAdapter.instance = env.IS_MOCK_MODE ? new MockTrackingAdapter() : new ApiTrackingAdapter();
    }
    return TrackingAdapter.instance;
  }
}