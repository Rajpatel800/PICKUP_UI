import { useState, useCallback, useEffect } from 'react';
import { EarningsService } from '../services/earnings/EarningsService';
import type { EarningsSummary } from '../types/wallet';

export function useEarnings() {
  const [summary, setSummary] = useState<EarningsSummary | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async (timeframe: 'day' | 'week' | 'month' = 'day') => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await EarningsService.getInstance().getSummary(timeframe);
      setSummary(data);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch earnings summary');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSummary('day');
  }, [fetchSummary]);

  return { summary, isLoading, error, fetchSummary };
}
