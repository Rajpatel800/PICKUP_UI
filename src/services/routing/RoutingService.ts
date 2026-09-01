import type { RoutingProvider, RoutingRequest, RoutingResponse } from './types';
import { RoutingError } from './types';

export class RoutingService {
  private requestCounter = 0;

  constructor(private provider: RoutingProvider) {}

  public async getRoute(request: RoutingRequest): Promise<RoutingResponse> {
    const currentRequestId = ++this.requestCounter;

    try {
      const response = await this.provider.getRoute(request);
      
      if (currentRequestId !== this.requestCounter) {
        throw new RoutingError('Stale response ignored', 'STALE');
      }
      
      return response;
    } catch (error: unknown) {
      if (error instanceof RoutingError) {
        throw error;
      }
      const message = error instanceof Error ? error.message : 'Unknown routing error';
      throw new RoutingError(message, 'PROVIDER_ERROR');
    }
  }
}
