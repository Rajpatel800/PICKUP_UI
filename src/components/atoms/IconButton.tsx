import React from 'react';
import { StyleSheet, Pressable, ViewStyle } from 'react-native';
import Icon from './Icon';
import { colors, spacing, borderRadius } from '../../theme';

export interface IconButtonProps {
  readonly iconName: string;
  readonly onPress: () => void;
  readonly size?: number;
  readonly color?: string;
  readonly backgroundColor?: string;
  readonly disabled?: boolean;
  readonly accessibilityLabel: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onPress,
  size = 24,
  color = colors.onSurface,
  backgroundColor = colors.transparent,
  disabled = false,
  accessibilityLabel,
  style,
  testID,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor },
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled }}
      testID={testID}
    >
      <Icon name={iconName} style={[styles.icon, { fontSize: size, color }]} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: spacing.rowHeightSm,
    height: spacing.rowHeightSm,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
  },
});

export default IconButton;
