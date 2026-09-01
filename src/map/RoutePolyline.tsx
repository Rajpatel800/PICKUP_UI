import React from 'react';
import { Polyline } from 'react-native-maps';
import { colors } from '../theme';
import type { Coordinate } from './types';

export interface RoutePolylineProps {
  coordinates: Coordinate[];
  color?: string;
  width?: number;
}

export const RoutePolyline: React.FC<RoutePolylineProps> = ({ 
  coordinates, 
  color = colors.primary,
  width = 4 
}) => {
  if (!coordinates || coordinates.length === 0) return null;

  return (
    <Polyline
      coordinates={coordinates}
      strokeColor={color}
      strokeWidth={width}
      lineCap="round"
      lineJoin="round"
    />
  );
};
