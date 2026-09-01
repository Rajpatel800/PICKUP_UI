import { useEffect } from 'react';
import { ArrivalDetectionService } from '../services/trip/ArrivalDetectionService';
import type { ArrivalEvent } from '../services/trip/ArrivalDetectionService';

/**
 * Hook to consume arrival detection events in the UI layer.
 * Note: The UI component (like ActiveTripScreen) does not manage the geofence lifecycle directly.
 * It merely reacts to arrival events to navigate or show prompts.
 */
export function useArrivalDetection(onArrival: (event: ArrivalEvent) => void) {
  useEffect(() => {
    const service = ArrivalDetectionService.getInstance();
    const unsubscribe = service.subscribe(onArrival);
    
    return () => {
      unsubscribe();
    };
  }, [onArrival]);
}
