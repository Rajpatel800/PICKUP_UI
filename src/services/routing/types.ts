import type { Coordinate } from '../../map/types';

export interface RoutingRequest {
  origin: Coordinate;
  destinations: Coordinate[];
}

export interface RouteBounds {
  northeast: Coordinate;
  southwest: Coordinate;
}

export interface RoutingResponse {
  polylinePoints: Coordinate[];
  totalDistanceMeters: number;
  totalDurationSeconds: number;
  eta: Date;
  bounds: RouteBounds;
  destinationStopIds?: string[];
}

export interface RoutingProvider {
  getRoute(request: RoutingRequest): Promise<RoutingResponse>;
}

export class RoutingError extends Error {
  constructor(message: string, public readonly code: 'NETWORK' | 'NO_ROUTE' | 'STALE' | 'INVALID_COORDINATES' | 'PROVIDER_ERROR') {
    super(message);
    this.name = 'RoutingError';
  }
}
