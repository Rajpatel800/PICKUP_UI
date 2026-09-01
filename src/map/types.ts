export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface MapRegion extends Coordinate {
  latitudeDelta: number;
  longitudeDelta: number;
}

export type StopType = 'pickup' | 'drop' | 'intermediate';

export interface RouteStop {
  id: string;
  type: StopType;
  coordinate: Coordinate;
  completed?: boolean;
  isCurrent?: boolean;
  label?: string; // e.g., '1', '2' for multi-stop
}

export interface RouteData {
  polylinePoints: Coordinate[];
  stops: RouteStop[];
  bounds?: {
    northeast: Coordinate;
    southwest: Coordinate;
  };
}
