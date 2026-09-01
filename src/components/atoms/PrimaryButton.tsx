import React from 'react';
import { Pressable, Text, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing, shadows } from '../../theme';

export interface PrimaryButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
  style,
  testID,
}) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled }}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator color={colors.onPrimary} size="small" />
      ) : (
        <Text style={[styles.label, isDisabled && styles.labelDisabled]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.gutter,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.rowHeightMd,
    ...shadows.md,
  },
  disabled: {
    backgroundColor: colors.outlineVariant,
  },
  pressed: {
    opacity: 0.88,
  },
  label: {
    ...typography.headlineSm,
    color: colors.onPrimary,
    textAlign: 'center',
  },
  labelDisabled: {
    color: colors.outline,
  },
});

export default PrimaryButton;
