/**
 * Application environment configuration.
 *
 * In production, API_BASE_URL and WS_ENDPOINT must be provided
 * via environment variables or a build-time configuration tool
 * (e.g., react-native-config). The application operates in
 * mock mode when no backend is configured.
 *
 * DO NOT hardcode production URLs or secrets here.
 */

/** Read from external config if available; undefined otherwise. */
const EXTERNAL_API_BASE_URL: string | undefined = undefined;
const EXTERNAL_WS_ENDPOINT: string | undefined = undefined;

/**
 * When true, domain services use mock adapters instead of
 * making real API calls. This is the default when no production
 * backend endpoint has been configured.
 */
const IS_MOCK_MODE = !EXTERNAL_API_BASE_URL;

export interface AppEnvironment {
  /** Base URL for the REST API. Undefined when no backend is configured. */
  readonly API_BASE_URL: string | undefined;
  /** WebSocket endpoint for real-time features. Undefined when no backend is configured. */
  readonly WS_ENDPOINT: string | undefined;
  readonly ENVIRONMENT: 'development' | 'staging' | 'production';
  readonly IS_MOCK_MODE: boolean;
  /** Default request timeout in milliseconds. */
  readonly REQUEST_TIMEOUT_MS: number;
  readonly googleMapsApiKey?: string;
}

export const env: AppEnvironment = {
  API_BASE_URL: EXTERNAL_API_BASE_URL,
  WS_ENDPOINT: EXTERNAL_WS_ENDPOINT,
  ENVIRONMENT: 'development',
  IS_MOCK_MODE,
  REQUEST_TIMEOUT_MS: 15000,
  googleMapsApiKey: undefined,
};

export const hasGeocodingConfig = () => !!env.googleMapsApiKey;