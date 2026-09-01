/**
 * Trip-related type definitions.
 */

export type TripStatus =
  | 'offered'
  | 'accepted'
  | 'en_route_pickup'
  | 'arrived_pickup'
  | 'pickup_verified'
  | 'in_transit'
  | 'arrived_drop'
  | 'drop_verified'
  | 'completed'
  | 'cancelled'
  | 'expired';

export type StopType = 'pickup' | 'drop' | 'drop_final';

export type StopStatus = 'pending' | 'current' | 'completed';

export type LoadType =
  | 'box_parcel'
  | 'furniture'
  | 'electronics'
  | 'documents'
  | 'food'
  | 'other';

export type CancellationReason =
  | 'vehicle_breakdown'
  | 'customer_unavailable'
  | 'wrong_address'
  | 'safety_concern'
  | 'other';

export interface TripStop {
  readonly id: string;
  readonly type: StopType;
  readonly label: string;
  readonly address: string;
  readonly latitude: number;
  readonly longitude: number;
  readonly status: StopStatus;
  readonly etaMinutes?: number;
  readonly distanceKm?: number;
  readonly notes?: string;
  readonly requiresSignature?: boolean;
  readonly requiresPhoto?: boolean;
  readonly requiresOtp?: boolean;
}

export interface TripOffer {
  readonly id: string;
  readonly estimatedEarning: number;
  readonly currency: string;
  readonly pickupStop: TripStop;
  readonly dropStops: readonly TripStop[];
  readonly totalDistanceKm: number;
  readonly loadType: LoadType;
  readonly vehicleType: string;
  readonly expiresAt: number;
  readonly demandLevel?: 'low' | 'medium' | 'high';
}

export interface ActiveTrip {
  readonly id: string;
  readonly status: TripStatus;
  readonly stops: readonly TripStop[];
  readonly currentStopIndex: number;
  readonly estimatedEarning: number;
  readonly currency: string;
  readonly totalDistanceKm: number;
  readonly loadType: LoadType;
  readonly goodsType: string;
  readonly vehicleId: string;
  readonly vehicleRegistration: string;
  readonly startedAt?: number;
  readonly completedAt?: number;
}

export interface TripEarnings {
  readonly tripId: string;
  readonly grossEarning: number;
  readonly platformCommission: number;
  readonly platformCommissionPercent: number;
  readonly otherDeductions: number;
  readonly netEarning: number;
  readonly currency: string;
  readonly paidToWallet: boolean;
}

export interface HistoricalTrip {
  readonly id: string;
  readonly date: string;
  readonly time: string;
  readonly status: TripStatus;
  readonly stops: readonly TripStop[];
  readonly loadType: LoadType;
  readonly goodsType: string;
  readonly totalWeight: string;
  readonly vehicleType: string;
  readonly vehicleRegistration: string;
  readonly earnings: TripEarnings;
}

export interface CancellationRequest {
  readonly tripId: string;
  readonly reason: CancellationReason;
  readonly details?: string;
}
