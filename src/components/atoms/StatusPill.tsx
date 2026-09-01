import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from './Icon';
import { colors, typography, borderRadius, spacing } from '../../theme';

export type PillVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'default' | 'danger_outline';

export interface StatusPillProps {
  readonly label: string;
  readonly variant?: PillVariant;
  readonly iconName?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

const pillColors: Record<PillVariant, { bg: string; text: string; border?: string }> = {
  success: { bg: '#e8f5e9', text: '#2e7d32' },
  warning: { bg: '#fff3e0', text: '#e65100' },
  error: { bg: colors.errorContainer, text: colors.onErrorContainer },
  info: { bg: '#e3f2fd', text: '#1565c0' },
  neutral: { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant },
  default: { bg: colors.surface, text: colors.onSurface },
  danger_outline: { bg: colors.surface, text: colors.error, border: colors.error },
};

export const StatusPill: React.FC<StatusPillProps> = ({
  label,
  variant = 'neutral',
  iconName,
  style,
  testID,
}) => {
  const pillStyle = pillColors[variant];

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: pillStyle.bg },
        pillStyle.border ? { borderWidth: 1, borderColor: pillStyle.border } : null,
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {iconName ? (
        <Icon name={iconName} style={[styles.icon, { color: pillStyle.text }]} />
      ) : null}
      <Text style={[styles.label, { color: pillStyle.text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.unit,
    borderRadius: borderRadius.full,
    gap: spacing.unit,
    alignSelf: 'flex-start',
  },
  icon: {
    fontSize: 14,
  },
  label: {
    ...typography.labelSm,
  },
});

export default StatusPill;
