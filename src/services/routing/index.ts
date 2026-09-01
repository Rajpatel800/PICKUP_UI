import { RoutingService } from './RoutingService';
import { MockRoutingProvider } from './MockRoutingProvider';

// Export everything from the routing namespace
export * from './types';
export * from './geometry';
export * from './MockRoutingProvider';
export * from './RoutingService';

// Default singleton for development
const defaultProvider = new MockRoutingProvider({ averageSpeedKmh: 30 });
export const routingService = new RoutingService(defaultProvider);
