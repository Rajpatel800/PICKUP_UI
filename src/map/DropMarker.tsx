import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { colors, typography, shadows } from '../theme';
import type { Coordinate } from './types';

export interface DropMarkerProps {
  coordinate: Coordinate;
  label?: string; // e.g. for multi-stop "2"
  isCurrent?: boolean;
}

export const DropMarker: React.FC<DropMarkerProps> = ({ coordinate, label, isCurrent = true }) => {
  return (
    <Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }} tracksViewChanges={false}>
      <View style={[styles.container, !isCurrent && styles.containerInactive]}>
        <View style={[styles.inner, !isCurrent && styles.innerInactive]}>
          {label ? (
            <Text style={styles.labelText}>{label}</Text>
          ) : (
            <View style={styles.square} />
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
    borderRadius: 6,
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
    borderRadius: 4,
    backgroundColor: colors.error, // red for drop
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerInactive: {
    backgroundColor: colors.outline,
  },
  square: {
    width: 6,
    height: 6,
    backgroundColor: colors.surface,
  },
  labelText: {
    ...typography.labelSm,
    color: colors.surface,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
