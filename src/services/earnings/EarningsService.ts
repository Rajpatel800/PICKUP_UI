import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { EarningsSummary, TripEarnings } from '../../types/wallet';
import { mockEarningsSummary } from '../../data/mockData';

export interface IEarningsService {
  getSummary(timeframe?: 'day' | 'week' | 'month'): Promise<EarningsSummary>;
  getTripEarnings(tripId: string): Promise<TripEarnings>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockEarningsService implements IEarningsService {
  async getSummary(_timeframe: 'day' | 'week' | 'month' = 'day'): Promise<EarningsSummary> {
    await delay(500);
    return mockEarningsSummary;
  }

  async getTripEarnings(tripId: string): Promise<TripEarnings> {
    await delay(500);
    return {
      tripId,
      date: new Date().toISOString(),
      distance: 12.5,
      duration: 35,
      baseFare: 150,
      distanceFare: 120,
      timeFare: 35,
      surgeMultiplier: 1.2,
      tolls: 40,
      tips: 50,
      tax: -15,
      platformFee: -30,
      total: 350,
    };
  }
}

export class ApiEarningsService implements IEarningsService {
  private client = ApiClient.getInstance();

  async getSummary(timeframe: 'day' | 'week' | 'month' = 'day'): Promise<EarningsSummary> {
    return this.client.get<EarningsSummary>('/earnings/summary', { params: { timeframe } });
  }

  async getTripEarnings(tripId: string): Promise<TripEarnings> {
    return this.client.get<TripEarnings>(`/earnings/trip/${tripId}`);
  }
}

export class EarningsService {
  private static instance: IEarningsService;

  static getInstance(): IEarningsService {
    if (!EarningsService.instance) {
      EarningsService.instance = env.IS_MOCK_MODE ? new MockEarningsService() : new ApiEarningsService();
    }
    return EarningsService.instance;
  }
}