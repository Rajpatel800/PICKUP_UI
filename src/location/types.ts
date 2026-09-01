export interface LocationResult {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  bearing: number;
  timestamp: number;
  provider: string;
}

export type LocationErrorCode =
  | 'PERMISSION_DENIED'
  | 'PERMISSION_PERMANENTLY_DENIED'
  | 'PROVIDER_DISABLED'
  | 'LOCATION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'TRACKING_UNAVAILABLE'
  | 'SERVICE_FAILURE'
  | 'GEOFENCE_FAILURE'
  | 'UNKNOWN';

export interface LocationError {
  code: LocationErrorCode;
  message: string;
}

export type PermissionState = 'granted' | 'denied' | 'permanently_denied' | 'not_determined';

export type TrackingState = 'idle' | 'tracking' | 'background_tracking' | 'stopped';

export type GeofenceTransition = 'enter' | 'exit' | 'dwell';

export interface GeofenceEvent {
  geofenceId: string;
  transitionType: GeofenceTransition;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export interface GeofenceRequest {
  id: string;
  latitude: number;
  longitude: number;
  radiusMeters?: number;
}

export interface LocationConfig {
  priority?: number; // LocationConfig.PRIORITY_* in Kotlin
  intervalMs?: number;
  fastestIntervalMs?: number;
  minDisplacementMeters?: number;
}

// Event Payload Types emitted by NativeLocationModule
export interface NativeLocationErrorPayload {
  code: string;
  message: string;
}

export interface NativeTrackingStatePayload {
  state: TrackingState;
}
