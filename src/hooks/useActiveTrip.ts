import { useState, useEffect } from 'react';
import { TripController } from '../services/trip/TripController';
import type { ActiveTrip } from '../types/trip';

export function useActiveTrip() {
  const [activeTrip, setActiveTrip] = useState<ActiveTrip | null>(null);

  useEffect(() => {
    const controller = TripController.getInstance();
    
    // For development, load the mock trip if none is set
    if (!controller.getTrip()) {
      controller.loadMockTrip();
    }

    const unsubscribe = controller.subscribe(setActiveTrip);
    
    return () => {
      unsubscribe();
    };
  }, []);

  return activeTrip;
}
