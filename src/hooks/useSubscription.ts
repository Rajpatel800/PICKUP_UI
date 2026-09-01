import { useState, useCallback, useEffect } from 'react';
import { SubscriptionService } from '../services/subscription/SubscriptionService';
import type { SubscriptionPlan, CurrentSubscription } from '../types/user';

export function useSubscription() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [current, setCurrent] = useState<CurrentSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [allPlans, currentSub] = await Promise.all([
        SubscriptionService.getInstance().getPlans(),
        SubscriptionService.getInstance().getCurrent(),
      ]);
      setPlans(allPlans);
      setCurrent(currentSub);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch subscription data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const purchase = useCallback(async (planId: string, paymentMethodId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newSub = await SubscriptionService.getInstance().purchase(planId, paymentMethodId);
      setCurrent(newSub);
      return newSub;
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Purchase failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { plans, current, isLoading, error, fetchData, purchase };
}
