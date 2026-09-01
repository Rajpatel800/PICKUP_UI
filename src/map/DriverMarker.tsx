import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors } from '../theme';
import type { Coordinate } from './types';

export interface DriverMarkerProps {
  coordinate: Coordinate;
  heading?: number;
}

export const DriverMarker: React.FC<DriverMarkerProps> = ({ coordinate, heading = 0 }) => {
  return (
    <Marker
      coordinate={coordinate}
      anchor={{ x: 0.5, y: 0.5 }}
      flat
      rotation={Platform.OS === 'android' ? heading : undefined}
      // Provide heading logic for iOS or custom styling if required
      style={Platform.OS === 'ios' ? { transform: [{ rotate: `${heading}deg` }] } : undefined}
    >
      <View style={styles.container}>
        <View style={styles.driverDot} />
        {/* We can place an actual car asset here instead of a simple dot */}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(26, 115, 232, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
  },
});
