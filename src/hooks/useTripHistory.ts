import { useState, useCallback, useEffect } from 'react';
import { TripService } from '../services/trip/TripService';
import type { HistoricalTrip } from '../types/trip';

export function useTripHistory() {
  const [trips, setTrips] = useState<HistoricalTrip[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await TripService.getInstance().getHistory();
      setTrips(data);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch trip history');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return { trips, isLoading, error, fetchHistory };
}
