import type { Coordinate } from '../../map/types';
import type { RoutingProvider, RoutingRequest, RoutingResponse } from './types';
import { RoutingError } from './types';
import { distanceBetween, getRouteBounds, validateCoordinate } from './geometry';

export interface MockRoutingConfig {
  averageSpeedKmh: number;
}

export class MockRoutingProvider implements RoutingProvider {
  constructor(private config: MockRoutingConfig = { averageSpeedKmh: 30 }) {}

  public async getRoute(request: RoutingRequest): Promise<RoutingResponse> {
    const { origin, destinations } = request;
    
    if (!validateCoordinate(origin)) {
      throw new RoutingError('Invalid origin coordinate', 'INVALID_COORDINATES');
    }
    if (destinations.length === 0) {
      throw new RoutingError('At least one destination is required', 'INVALID_COORDINATES');
    }
    for (const dest of destinations) {
      if (!validateCoordinate(dest)) {
        throw new RoutingError('Invalid destination coordinate', 'INVALID_COORDINATES');
      }
    }

    // Simulate network delay
    await new Promise<void>(resolve => setTimeout(() => resolve(), 200));

    // Build a simple polyline by interpolating points
    const points: Coordinate[] = [origin];
    let totalDistanceMeters = 0;
    
    let current = origin;
    for (const dest of destinations) {
      // Add a mid-point to make it a bit more realistic than a straight line
      const mid = {
        latitude: (current.latitude + dest.latitude) / 2 + 0.001,
        longitude: (current.longitude + dest.longitude) / 2 - 0.001,
      };
      points.push(mid);
      points.push(dest);
      
      totalDistanceMeters += distanceBetween(current, mid);
      totalDistanceMeters += distanceBetween(mid, dest);
      current = dest;
    }

    const bounds = getRouteBounds(points);
    if (!bounds) {
      throw new RoutingError('Failed to generate route bounds', 'PROVIDER_ERROR');
    }

    // Calculate duration based on distance and configured speed
    const speedMps = (this.config.averageSpeedKmh * 1000) / 3600;
    const totalDurationSeconds = totalDistanceMeters / speedMps;
    
    const eta = new Date(Date.now() + totalDurationSeconds * 1000);

    return {
      polylinePoints: points,
      totalDistanceMeters,
      totalDurationSeconds,
      eta,
      bounds
    };
  }
}
