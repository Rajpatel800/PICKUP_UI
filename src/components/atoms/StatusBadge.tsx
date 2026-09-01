import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export type BadgeVariant = 'approved' | 'verified' | 'pending' | 'under_review' | 'rejected' | 'active' | 'expired';

export interface StatusBadgeProps {
  readonly label: string;
  readonly variant: BadgeVariant;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

const variantStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
  approved: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
  verified: { bg: '#e8f5e9', text: '#2e7d32', border: '#a5d6a7' },
  active: { bg: '#e3f2fd', text: '#1565c0', border: '#90caf9' },
  pending: { bg: '#fff8e1', text: '#f57f17', border: '#ffe082' },
  under_review: { bg: '#fff3e0', text: '#e65100', border: '#ffcc80' },
  rejected: { bg: colors.errorContainer, text: colors.onErrorContainer, border: colors.errorContainer },
  expired: { bg: colors.surfaceContainerHigh, text: colors.onSurfaceVariant, border: colors.outlineVariant },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant,
  style,
  testID,
}) => {
  const variantStyle = variantStyles[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: variantStyle.bg,
          borderColor: variantStyle.border,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
    >
      <Text style={[styles.label, { color: variantStyle.text }]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.unit,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  label: {
    ...typography.labelSm,
    textTransform: 'uppercase',
  },
});

export default StatusBadge;
