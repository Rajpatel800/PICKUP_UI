import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { StatusBadge, type BadgeVariant } from '../atoms/StatusBadge';

export interface VehicleCardProps {
  readonly name: string;
  readonly registration: string;
  readonly iconName: string;
  readonly status?: BadgeVariant;
  readonly statusLabel?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  name,
  registration,
  iconName,
  status,
  statusLabel,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      <View style={styles.iconContainer}>
        <Icon name={iconName} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.registration}>{registration}</Text>
      </View>
      {status && statusLabel ? (
        <StatusBadge label={statusLabel} variant={status} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.containerPadding,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 24,
    color: colors.primary,
  },
  content: {
    flex: 1,
    gap: spacing.unit,
  },
  name: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  registration: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
});

export default VehicleCard;
