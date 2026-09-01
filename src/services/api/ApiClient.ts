import { env } from '../../config/env';
import {
  ApiError,
  NetworkError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  ValidationError,
  RateLimitError,
  ServerError,
} from './ApiError';

export interface ApiRequestConfig extends Omit<RequestInit, 'body'> {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, unknown> | FormData | string;
  params?: Record<string, string | number | boolean>;
  timeoutMs?: number;
  retryable?: boolean;
  maxRetries?: number;
  deduplicate?: boolean;
  withAuth?: boolean;
}

interface PendingRequest {
  promise: Promise<unknown>;
  timestamp: number;
}

export class ApiClient {
  private static instance: ApiClient;
  private token: string | null = null;
  private pendingRequests = new Map<string, PendingRequest>();

  private constructor() {}

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    if (!env.API_BASE_URL) {
      throw new ApiError(
        'API_BASE_URL is not configured. Cannot make API requests in mock mode.',
        'CONFIG_ERROR',
      );
    }
    const url = new URL(endpoint.startsWith('http') ? endpoint : `${env.API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    return url.toString();
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data: unknown = isJson ? await response.json().catch(() => null) : await response.text();

    if (response.ok) {
      return data as T;
    }

    const errorData = data as Record<string, unknown> | null;
    const message =
      (errorData?.message as string) ||
      (errorData?.error as string) ||
      response.statusText ||
      'Unknown error';

    switch (response.status) {
      case 400:
        throw new ValidationError(message, errorData);
      case 401:
        throw new UnauthorizedError(message, errorData);
      case 403:
        throw new ForbiddenError(message, errorData);
      case 404:
        throw new NotFoundError(message, errorData);
      case 409:
        throw new ConflictError(message, errorData);
      case 429:
        throw new RateLimitError(message, errorData);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError(message, errorData);
      default:
        throw new ApiError(message, 'UNKNOWN', response.status, errorData);
    }
  }

  private async executeWithRetry<T>(
    requestFn: () => Promise<T>,
    retryable: boolean = false,
    maxRetries: number = 2,
    currentAttempt: number = 1
  ): Promise<T> {
    try {
      return await requestFn();
    } catch (error) {
      const isRetryableError =
        error instanceof NetworkError || error instanceof ServerError || error instanceof RateLimitError;

      if (retryable && isRetryableError && currentAttempt <= maxRetries) {
        const delay = Math.pow(2, currentAttempt) * 500 + Math.random() * 500;
        await new Promise<void>((resolve) => setTimeout(resolve, delay));
        return this.executeWithRetry(requestFn, retryable, maxRetries, currentAttempt + 1);
      }
      throw error;
    }
  }

  async request<T>(config: ApiRequestConfig): Promise<T> {
    const {
      endpoint,
      method = 'GET',
      body,
      params,
      headers = {},
      timeoutMs = env.REQUEST_TIMEOUT_MS,
      retryable = method === 'GET',
      maxRetries = 2,
      deduplicate = method === 'GET',
      withAuth = true,
      ...rest
    } = config;

    const url = this.buildUrl(endpoint, params);
    
    const requestKey = deduplicate ? `${method}:${url}:${JSON.stringify(body || {})}` : null;

    if (requestKey && this.pendingRequests.has(requestKey)) {
      return this.pendingRequests.get(requestKey)!.promise as Promise<T>;
    }

    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeoutMs);

    const requestHeaders = new Headers(headers);
    if (!requestHeaders.has('Content-Type') && !(body instanceof FormData)) {
      requestHeaders.set('Content-Type', 'application/json');
    }
    if (this.token && withAuth) {
      requestHeaders.set('Authorization', `Bearer ${this.token}`);
    }

    const requestOptions: RequestInit = {
      method,
      headers: requestHeaders,
      signal: abortController.signal,
      ...rest,
    };

    if (body) {
      requestOptions.body = body instanceof FormData ? body : JSON.stringify(body);
    }

    const makeRequest = async (): Promise<T> => {
      try {
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);
        return await this.handleResponse<T>(response);
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        if (error instanceof Error && error.name === 'AbortError') {
          throw new NetworkError('Request timed out');
        }
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
          throw new NetworkError('Network unavailable');
        }
        throw error;
      }
    };

    const promise = this.executeWithRetry<T>(makeRequest, retryable, maxRetries);

    if (requestKey) {
      this.pendingRequests.set(requestKey, { promise, timestamp: Date.now() });
      promise.finally(() => {
        this.pendingRequests.delete(requestKey);
      }).catch(() => {});
    }

    return promise;
  }

  async get<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'endpoint' | 'method'>): Promise<T> {
    return this.request<T>({ ...config, endpoint, method: 'GET' });
  }

  async post<T>(endpoint: string, body?: Record<string, unknown> | FormData, config?: Omit<ApiRequestConfig, 'endpoint' | 'method' | 'body'>): Promise<T> {
    return this.request<T>({ ...config, endpoint, method: 'POST', body });
  }

  async put<T>(endpoint: string, body?: Record<string, unknown> | FormData, config?: Omit<ApiRequestConfig, 'endpoint' | 'method' | 'body'>): Promise<T> {
    return this.request<T>({ ...config, endpoint, method: 'PUT', body });
  }

  async delete<T>(endpoint: string, config?: Omit<ApiRequestConfig, 'endpoint' | 'method'>): Promise<T> {
    return this.request<T>({ ...config, endpoint, method: 'DELETE' });
  }
}