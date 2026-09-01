import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface SecondaryButtonProps {
  readonly label: string;
  readonly onPress: () => void;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    paddingVertical: spacing.gutter,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.rowHeightMd,
  },
  disabled: {
    borderColor: colors.surfaceContainerHigh,
  },
  pressed: {
    backgroundColor: colors.surfaceContainerLow,
  },
  label: {
    ...typography.headlineSm,
    color: colors.primary,
    textAlign: 'center',
  },
  labelDisabled: {
    color: colors.outline,
  },
});

export default SecondaryButton;
