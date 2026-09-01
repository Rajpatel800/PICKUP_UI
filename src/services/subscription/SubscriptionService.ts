import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { SubscriptionPlan, CurrentSubscription } from '../../types/user';

export interface ISubscriptionService {
  getPlans(): Promise<SubscriptionPlan[]>;
  getCurrent(): Promise<CurrentSubscription | null>;
  purchase(planId: string, paymentMethodId: string): Promise<CurrentSubscription>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockSubscriptionService implements ISubscriptionService {
  async getPlans(): Promise<SubscriptionPlan[]> {
    await delay(500);
    return [
      { id: 'PLAN-001', name: 'Basic', price: 0, durationDays: 30, features: ['Standard Support'] },
      { id: 'PLAN-002', name: 'Premium', price: 499, durationDays: 30, features: ['Priority Support', 'Lower Commission'] },
    ];
  }

  async getCurrent(): Promise<CurrentSubscription | null> {
    await delay(500);
    return {
      planId: 'PLAN-002',
      status: 'active',
      expiresAt: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }

  async purchase(planId: string, _paymentMethodId: string): Promise<CurrentSubscription> {
    await delay(1000);
    return {
      planId,
      status: 'active',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
  }
}

export class ApiSubscriptionService implements ISubscriptionService {
  private client = ApiClient.getInstance();

  async getPlans(): Promise<SubscriptionPlan[]> {
    return this.client.get<SubscriptionPlan[]>('/subscription/plans');
  }

  async getCurrent(): Promise<CurrentSubscription | null> {
    return this.client.get<CurrentSubscription | null>('/subscription/current');
  }

  async purchase(planId: string, paymentMethodId: string): Promise<CurrentSubscription> {
    return this.client.post<CurrentSubscription>('/subscription/purchase', { planId, paymentMethodId }, { retryable: false });
  }
}

export class SubscriptionService {
  private static instance: ISubscriptionService;

  static getInstance(): ISubscriptionService {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = env.IS_MOCK_MODE ? new MockSubscriptionService() : new ApiSubscriptionService();
    }
    return SubscriptionService.instance;
  }
}