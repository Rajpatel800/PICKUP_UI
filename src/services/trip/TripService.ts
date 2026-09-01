import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { ActiveTrip, HistoricalTrip, TripOffer } from '../../types/trip';
import { mockActiveTrip, mockHistoricalTrip } from '../../data/mockData';

export interface UpdateStatePayload {
  otp?: string;
  [key: string]: unknown;
}

export interface ITripService {
  getOffer(): Promise<TripOffer | null>;
  acceptTrip(tripId: string): Promise<ActiveTrip>;
  declineTrip(tripId: string): Promise<void>;
  updateState(tripId: string, state: ActiveTrip['status'], payload?: UpdateStatePayload): Promise<ActiveTrip>;
  getHistory(): Promise<HistoricalTrip[]>;
  getActiveTrip(): Promise<ActiveTrip | null>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockTripService implements ITripService {
  async getOffer(): Promise<TripOffer | null> {
    await delay(500);
    return null;
  }

  async acceptTrip(_tripId: string): Promise<ActiveTrip> {
    await delay(500);
    return { ...mockActiveTrip, status: 'en_route_pickup' };
  }

  async declineTrip(_tripId: string): Promise<void> {
    await delay(500);
  }

  async updateState(_tripId: string, state: ActiveTrip['status'], _payload?: UpdateStatePayload): Promise<ActiveTrip> {
    await delay(800);
    return { ...mockActiveTrip, status: state };
  }

  async getHistory(): Promise<HistoricalTrip[]> {
    await delay(800);
    return [mockHistoricalTrip];
  }

  async getActiveTrip(): Promise<ActiveTrip | null> {
    await delay(500);
    return mockActiveTrip;
  }
}

export class ApiTripService implements ITripService {
  private client = ApiClient.getInstance();

  async getOffer(): Promise<TripOffer | null> {
    return this.client.get<TripOffer | null>('/trip/offer');
  }

  async acceptTrip(tripId: string): Promise<ActiveTrip> {
    return this.client.post<ActiveTrip>(`/trip/${tripId}/accept`);
  }

  async declineTrip(tripId: string): Promise<void> {
    await this.client.post(`/trip/${tripId}/decline`);
  }

  async updateState(tripId: string, state: ActiveTrip['status'], payload?: UpdateStatePayload): Promise<ActiveTrip> {
    return this.client.post<ActiveTrip>(`/trip/${tripId}/status`, { state, ...payload });
  }

  async getHistory(): Promise<HistoricalTrip[]> {
    return this.client.get<HistoricalTrip[]>('/trip/history');
  }

  async getActiveTrip(): Promise<ActiveTrip | null> {
    return this.client.get<ActiveTrip | null>('/trip/active');
  }
}

export class TripService {
  private static instance: ITripService;

  static getInstance(): ITripService {
    if (!TripService.instance) {
      TripService.instance = env.IS_MOCK_MODE ? new MockTripService() : new ApiTripService();
    }
    return TripService.instance;
  }
}