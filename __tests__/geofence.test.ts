import { ArrivalDetectionService } from '../src/services/trip/ArrivalDetectionService';
import { GeofenceService } from '../src/location/GeofenceService';
import type { GeofenceEvent } from '../src/location/types';

jest.mock('../src/location/LocationService', () => ({
  LocationService: {
    addGeofence: jest.fn().mockResolvedValue(true),
    removeGeofence: jest.fn().mockResolvedValue(true),
    subscribeToGeofenceEvents: jest.fn().mockReturnValue({ remove: jest.fn() }),
  }
}));

describe('Geofence & Arrival Detection', () => {
  let arrivalService: any;
  let geofenceService: any;
  let emittedEvents: any[] = [];
  
  beforeEach(() => {
    jest.clearAllMocks();
    emittedEvents = [];
    
    // @ts-ignore
    GeofenceService.instance = undefined;
    // @ts-ignore
    ArrivalDetectionService.instance = undefined;

    geofenceService = GeofenceService.getInstance();
    arrivalService = ArrivalDetectionService.getInstance();
    
    arrivalService.setConfig({ defaultRadiusMeters: 100 });
    arrivalService.subscribe((event: any) => {
      emittedEvents.push(event);
    });
  });

  const fireNativeEvent = (event: GeofenceEvent) => {
    geofenceService.handleNativeEvent(event);
  };

  it('syncTripState registers geofence for en_route_pickup', async () => {
    const addSpy = jest.spyOn(geofenceService, 'addGeofence');
    const mockTrip: any = {
      id: 'trip-1',
      status: 'en_route_pickup',
      currentStopIndex: 0,
      stops: [{ id: 'stop-pickup', type: 'pickup', latitude: 10, longitude: 20 }],
    };
    await arrivalService.syncTripState(mockTrip);
    expect(addSpy).toHaveBeenCalledWith({
      id: 'stop-pickup', latitude: 10, longitude: 20, radiusMeters: 100,
    });
  });

  it('ENTER event for current stop emits arrival', async () => {
    const mockTrip: any = {
      id: 'trip-1', status: 'en_route_pickup', currentStopIndex: 0,
      stops: [{ id: 'stop-pickup', type: 'pickup', latitude: 10, longitude: 20 }],
    };
    await arrivalService.syncTripState(mockTrip);
    geofenceService.activeGeofences.add('stop-pickup');

    fireNativeEvent({
      geofenceId: 'stop-pickup', transitionType: 'enter',
      latitude: 10, longitude: 20, timestamp: Date.now() - 1000,
    });

    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents[0].stopId).toBe('stop-pickup');
  });

  it('Stale event is rejected', async () => {
    const mockTrip: any = {
      id: 'trip-1', status: 'en_route_pickup', currentStopIndex: 0,
      stops: [{ id: 'stop-pickup', type: 'pickup', latitude: 10, longitude: 20 }],
    };
    await arrivalService.syncTripState(mockTrip);
    geofenceService.activeGeofences.add('stop-pickup');
    
    fireNativeEvent({
      geofenceId: 'stop-pickup', transitionType: 'enter',
      latitude: 10, longitude: 20, timestamp: Date.now() - 100000,
    });

    expect(emittedEvents).toHaveLength(0);
  });
  
  it('Duplicate ENTER event is deduplicated', async () => {
    const mockTrip: any = {
      id: 'trip-1', status: 'en_route_pickup', currentStopIndex: 0,
      stops: [{ id: 'stop-pickup', type: 'pickup', latitude: 10, longitude: 20 }],
    };
    await arrivalService.syncTripState(mockTrip);
    geofenceService.activeGeofences.add('stop-pickup');
    
    const now = Date.now();
    fireNativeEvent({
      geofenceId: 'stop-pickup', transitionType: 'enter',
      latitude: 10, longitude: 20, timestamp: now - 2000,
    });
    
    // Duplicate newer event
    fireNativeEvent({
      geofenceId: 'stop-pickup', transitionType: 'enter',
      latitude: 10, longitude: 20, timestamp: now - 1000,
    });

    expect(emittedEvents).toHaveLength(1);
  });

  it('Trip completion removes all geofences', async () => {
    const removeSpy = jest.spyOn(geofenceService, 'removeGeofence');
    const mockTrip: any = {
      id: 'trip-1', status: 'completed', currentStopIndex: 0, stops: [],
    };
    arrivalService.expectedStop = { id: 'stop-pickup' };
    geofenceService.activeGeofences.add('stop-pickup');

    await arrivalService.syncTripState(mockTrip);
    expect(removeSpy).toHaveBeenCalledWith('stop-pickup');
  });
});
