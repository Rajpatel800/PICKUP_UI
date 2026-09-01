import type { Coordinate } from '../../map/types';
import type { RouteBounds } from './types';

// Haversine distance in meters
export function distanceBetween(p1: Coordinate, p2: Coordinate): number {
  const R = 6371e3; // metres
  const f1 = p1.latitude * Math.PI / 180;
  const f2 = p2.latitude * Math.PI / 180;
  const df = (p2.latitude - p1.latitude) * Math.PI / 180;
  const dl = (p2.longitude - p1.longitude) * Math.PI / 180;

  const a = Math.sin(df/2) * Math.sin(df/2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl/2) * Math.sin(dl/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

// Distance from a point to a line segment
function pointToSegmentDistance(p: Coordinate, v: Coordinate, w: Coordinate): number {
  const l2 = Math.pow(distanceBetween(v, w), 2);
  if (l2 === 0) return distanceBetween(p, v);
  
  // Approximate flat earth for projection (only valid for very short segments)
  // For highly accurate cross-track distance we would use spherical trigonometry,
  // but this is sufficient for a 50m deviation threshold calculation assuming dense polylines.
  const t = Math.max(0, Math.min(1, 
    ((p.latitude - v.latitude) * (w.latitude - v.latitude) + 
     (p.longitude - v.longitude) * (w.longitude - v.longitude)) / 
     ((w.latitude - v.latitude)**2 + (w.longitude - v.longitude)**2)
  ));
  
  const projection = {
    latitude: v.latitude + t * (w.latitude - v.latitude),
    longitude: v.longitude + t * (w.longitude - v.longitude)
  };
  
  return distanceBetween(p, projection);
}

// Point to polyline distance
export function pointToPolylineDistance(point: Coordinate, polyline: Coordinate[]): number {
  if (polyline.length === 0) return Infinity;
  if (polyline.length === 1) return distanceBetween(point, polyline[0]);
  
  let minDistance = Infinity;
  for (let i = 0; i < polyline.length - 1; i++) {
    const dist = pointToSegmentDistance(point, polyline[i], polyline[i + 1]);
    if (dist < minDistance) {
      minDistance = dist;
    }
  }
  return minDistance;
}

export function getRouteBounds(points: Coordinate[]): RouteBounds | null {
  if (!points || points.length === 0) return null;
  let minLat = points[0].latitude;
  let maxLat = points[0].latitude;
  let minLng = points[0].longitude;
  let maxLng = points[0].longitude;

  for (const p of points) {
    if (p.latitude < minLat) minLat = p.latitude;
    if (p.latitude > maxLat) maxLat = p.latitude;
    if (p.longitude < minLng) minLng = p.longitude;
    if (p.longitude > maxLng) maxLng = p.longitude;
  }

  return {
    southwest: { latitude: minLat, longitude: minLng },
    northeast: { latitude: maxLat, longitude: maxLng }
  };
}

export function validateCoordinate(coord: Coordinate | null | undefined): boolean {
  if (!coord) return false;
  if (typeof coord.latitude !== 'number' || typeof coord.longitude !== 'number') return false;
  if (coord.latitude < -90 || coord.latitude > 90) return false;
  if (coord.longitude < -180 || coord.longitude > 180) return false;
  return true;
}
