import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';

export interface MetricCardProps {
  readonly label: string;
  readonly value: string;
  readonly iconName?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  iconName,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      {iconName ? (
        <View style={styles.iconContainer}>
          <Icon name={iconName} />
        </View>
      ) : null}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.gutter,
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    gap: spacing.unit,
    ...shadows.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    color: colors.primary,
  },
  value: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  label: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default MetricCard;
