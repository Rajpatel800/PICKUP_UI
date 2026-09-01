import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors, typography, shadows } from '../theme';
import type { Coordinate } from './types';

export interface PickupMarkerProps {
  coordinate: Coordinate;
  label?: string; // e.g. for multi-stop "1"
  isCurrent?: boolean;
}

export const PickupMarker: React.FC<PickupMarkerProps> = ({ coordinate, label, isCurrent = true }) => {
  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
      <View style={[styles.container, !isCurrent && styles.containerInactive]}>
        <View style={[styles.inner, !isCurrent && styles.innerInactive]}>
          {label ? (
            <Text style={styles.labelText}>{label}</Text>
          ) : (
            <View style={styles.dot} />
          )}
        </View>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  containerInactive: {
    backgroundColor: colors.surfaceContainerHighest,
  },
  inner: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#2e7d32', // green for pickup
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerInactive: {
    backgroundColor: colors.outline,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.surface,
  },
  labelText: {
    ...typography.labelSm,
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
