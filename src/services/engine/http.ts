import { ApiClient } from '../api/ApiClient';
import { NetworkError, ServerError, RateLimitError, ApiError as DriverApiError } from '../api/ApiError';

export type ApiErrorKind = 'network' | 'timeout' | 'http' | 'parse' | 'config';

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly body?: unknown;

  constructor(kind: ApiErrorKind, message: string, status?: number, body?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.kind = kind;
    this.status = status;
    this.body = body;
  }

  get isRetryable(): boolean {
    if (this.kind === 'network' || this.kind === 'timeout') return true;
    return this.kind === 'http' && this.status !== undefined && this.status >= 500;
  }

  get userMessage(): string {
    switch (this.kind) {
      case 'config':
        return 'The app is not configured to reach the server.';
      case 'timeout':
        return 'The server took too long to respond. Please try again.';
      case 'network':
        return 'No connection to the server. Check your internet and try again.';
      case 'parse':
        return 'The server sent an unexpected response.';
      case 'http':
        if (this.status === 404) return 'Not found.';
        if (this.status === 409) return 'That action is no longer possible.';
        if (this.status === 400) return this.serverMessage ?? 'That request was rejected.';
        if (this.status && this.status >= 500) return 'The server had a problem. Please try again.';
        return this.serverMessage ?? 'Something went wrong.';
      default:
        return 'Something went wrong.';
    }
  }

  private get serverMessage(): string | undefined {
    const body = this.body as { message?: string | string[] } | undefined;
    if (!body?.message) return undefined;
    return Array.isArray(body.message) ? body.message.join(', ') : body.message;
  }
}

export interface RequestOptions {
  readonly method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  readonly body?: unknown;
  readonly query?: Record<string, string | number | undefined>;
  readonly timeoutMs?: number;
  readonly retries?: number;
  readonly signal?: AbortSignal;
}

export const request = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const { method = 'GET', body, query, timeoutMs = 15000, retries = 2, signal } = options;

  try {
    const response = await ApiClient.getInstance().request<T>({
      endpoint: path,
      method,
      body: body as Record<string, unknown>,
      params: query as Record<string, string | number | boolean>,
      timeoutMs,
      maxRetries: retries,
      retryable: retries > 0, // In ApiClient, retryable flag enables retry logic
      signal,
      // This is a Phase 1 compatibility mechanism, NOT the final Customer security/authentication model.
      withAuth: false, // Do not assume customer requests use Driver token
      deduplicate: false // Customer engine handles its own deduplication/retries
    });
    return response;
  } catch (error: any) {
    if (error.name === 'AbortError' || error.message === 'Request timed out') {
      throw new ApiError('timeout', `Request to ${path} timed out`);
    }
    
    if (error instanceof NetworkError) {
      throw new ApiError('network', `Could not reach ${path}`);
    }

    if (error instanceof DriverApiError) {
      throw new ApiError(
        'http', 
        error.message, 
        error.statusCode, 
        error.data
      );
    }
    
    throw new ApiError('network', String(error));
  }
};

export const toApiError = (error: unknown): ApiError =>
  error instanceof ApiError ? error : new ApiError('network', String(error));
