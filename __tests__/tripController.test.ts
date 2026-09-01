import { TripController } from '../src/services/trip/TripController';
import { TripService } from '../src/services/trip/TripService';

jest.mock('../src/services/trip/TripService');

describe('TripController', () => {
  let controller: TripController;

  beforeEach(() => {
    // @ts-ignore
    TripController.instance = undefined;
    controller = TripController.getInstance();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('initializes and attempts to fetch active trip', async () => {
    const mockTrip = { id: 'trip-1', status: 'en_route_pickup', stops: [], currentStopIndex: 0 };
    const mockService = {
      getActiveTrip: jest.fn().mockResolvedValue(mockTrip),
      updateState: jest.fn(),
    };
    (TripService.getInstance as jest.Mock).mockReturnValue(mockService);

    await controller.loadInitialTrip();
    
    expect(mockService.getActiveTrip).toHaveBeenCalled();
    expect(controller.getTrip()).toEqual(mockTrip);
  });

  it('updates state via service and notifies listeners', async () => {
    const mockTrip = { id: 'trip-1', status: 'in_transit', stops: [], currentStopIndex: 0 };
    const mockService = {
      getActiveTrip: jest.fn().mockResolvedValue({ id: 'trip-1', status: 'en_route_pickup', stops: [], currentStopIndex: 0 }),
      updateState: jest.fn().mockResolvedValue(mockTrip),
    };
    (TripService.getInstance as jest.Mock).mockReturnValue(mockService);

    await controller.loadInitialTrip();
    
    const listener = jest.fn();
    controller.subscribe(listener);

    await controller.verifyPickupOTP('trip-1', '1234');

    expect(mockService.updateState).toHaveBeenCalledWith('trip-1', 'in_transit', { otp: '1234' });
    expect(listener).toHaveBeenCalledWith(mockTrip);
  });
});