import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing } from '../../theme';
import type { StopStatus, StopType } from '../../types/trip';

export interface TripStopRowProps {
  readonly label: string;
  readonly address: string;
  readonly type: StopType;
  readonly status: StopStatus;
  readonly notes?: string;
  readonly isLast?: boolean;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

const dotColors: Record<StopStatus, string> = {
  completed: '#2e7d32',
  current: colors.primary,
  pending: colors.outline,
};

export const TripStopRow: React.FC<TripStopRowProps> = ({
  label,
  address,
  type,
  status,
  notes,
  isLast = false,
  style,
  testID,
}) => {
  const dotColor = dotColors[status];

  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      <View style={styles.timeline}>
        <View style={[styles.dot, { backgroundColor: dotColor }]}>
          {status === 'completed' ? (
            <Icon name="check" style={styles.checkIcon} />
          ) : null}
        </View>
        {!isLast ? <View style={[styles.line, { backgroundColor: dotColor }]} /> : null}
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.address} numberOfLines={2}>{address}</Text>
        {notes ? (
          <Text style={styles.notes}>{notes}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  timeline: {
    alignItems: 'center',
    width: 20,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 10,
    color: colors.onPrimary,
  },
  line: {
    width: 2,
    flex: 1,
    minHeight: 20,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.containerPadding,
    gap: 2,
  },
  label: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant,
  },
  address: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  notes: {
    ...typography.labelSm,
    color: colors.outline,
  },
});

export default TripStopRow;
