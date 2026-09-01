export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly data?: unknown;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', statusCode?: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = 'Network unavailable or request timed out') {
    super(message, 'NETWORK_ERROR');
    this.name = 'NetworkError';
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message: string = 'Unauthorized', data?: unknown) {
    super(message, 'UNAUTHORIZED', 401, data);
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message: string = 'Forbidden', data?: unknown) {
    super(message, 'FORBIDDEN', 403, data);
    this.name = 'ForbiddenError';
  }
}

export class ValidationError extends ApiError {
  constructor(message: string = 'Validation failed', data?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, data);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApiError {
  constructor(message: string = 'Resource not found', data?: unknown) {
    super(message, 'NOT_FOUND', 404, data);
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends ApiError {
  constructor(message: string = 'Resource conflict', data?: unknown) {
    super(message, 'CONFLICT', 409, data);
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends ApiError {
  constructor(message: string = 'Too many requests', data?: unknown) {
    super(message, 'RATE_LIMIT_EXCEEDED', 429, data);
    this.name = 'RateLimitError';
  }
}

export class ServerError extends ApiError {
  constructor(message: string = 'Internal server error', data?: unknown) {
    super(message, 'SERVER_ERROR', 500, data);
    this.name = 'ServerError';
  }
}