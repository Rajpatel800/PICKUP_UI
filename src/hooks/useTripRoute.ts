import { useState, useEffect, useRef, useMemo } from 'react';
import { useDriverLocation } from '../location';
import { useActiveTrip } from './useActiveTrip';
import { routingService } from '../services/routing';
import type { RoutingResponse, RoutingError } from '../services/routing';
import { pointToPolylineDistance } from '../services/routing/geometry';

export interface UseTripRouteConfig {
  deviationThresholdMeters?: number;
  staleRouteThresholdMs?: number;
}

export interface UseTripRouteResult {
  route: RoutingResponse | null;
  isLoading: boolean;
  error: RoutingError | null;
}

export function useTripRoute(config?: UseTripRouteConfig): UseTripRouteResult {
  const { deviationThresholdMeters = 50, staleRouteThresholdMs = 60000 } = config || {};
  
  const { currentLocation } = useDriverLocation();
  const trip = useActiveTrip();
  
  const [route, setRoute] = useState<RoutingResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<RoutingError | null>(null);
  
  const lastFetchTime = useRef<number>(0);
  const lastTargetStopIds = useRef<string>('');
  const requestVersion = useRef<number>(0);

  // Compute remaining stops from current trip
  const remainingStops = useMemo(() => {
    if (!trip) return [];
    // Only route to the current stop and subsequent stops
    return trip.stops.slice(trip.currentStopIndex).map(s => ({
      id: s.id,
      coordinate: { latitude: s.latitude, longitude: s.longitude }
    }));
  }, [trip, trip?.currentStopIndex]);

  useEffect(() => {
    if (!currentLocation || remainingStops.length === 0) {
      if (route !== null) setRoute(null);
      return;
    }

    const currentStopIds = remainingStops.map(s => s.id).join(',');
    let needsRefresh = false;

    // 1. Destination/Sequence change
    if (currentStopIds !== lastTargetStopIds.current) {
      needsRefresh = true;
    }
    
    // 2. Stale Route
    if (!needsRefresh && Date.now() - lastFetchTime.current > staleRouteThresholdMs) {
      needsRefresh = true;
    }

    // 3. Route Deviation
    if (!needsRefresh && route?.polylinePoints) {
      const dist = pointToPolylineDistance(currentLocation, route.polylinePoints);
      if (dist > deviationThresholdMeters) {
        needsRefresh = true;
      }
    }

    // 4. No route yet
    if (!route && !isLoading && !error) {
      needsRefresh = true;
    }

    if (needsRefresh) {
      const fetchRoute = async () => {
        const currentVersion = ++requestVersion.current;
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await routingService.getRoute({
            origin: currentLocation,
            destinations: remainingStops.map(s => s.coordinate)
          });
          
          // Stale response protection
          if (currentVersion === requestVersion.current) {
            setRoute(response);
            lastFetchTime.current = Date.now();
            lastTargetStopIds.current = currentStopIds;
            setError(null);
          }
        } catch (err: unknown) {
          if (currentVersion === requestVersion.current) {
            // Wait, RoutingService might throw STALE error internally if provider takes long, 
            // but we also have our own hook-level stale protection.
            if ((err as any)?.code !== 'STALE') {
              setError(err as RoutingError);
            }
          }
        } finally {
          if (currentVersion === requestVersion.current) {
            setIsLoading(false);
          }
        }
      };

      fetchRoute();
    }
  }, [currentLocation, remainingStops, route, deviationThresholdMeters, staleRouteThresholdMs, isLoading, error]);

  return { route, isLoading, error };
}
