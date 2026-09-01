import React from 'react';
import { Pressable, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../theme';

export interface RadioOptionProps {
  readonly label: string;
  readonly selected: boolean;
  readonly onPress: () => void;
  readonly disabled?: boolean;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  return (
    <Pressable
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{ selected, disabled }}
      testID={testID}
    >
      <View style={[styles.outerCircle, selected && styles.outerCircleSelected]}>
        {selected && <View style={styles.innerCircle} />}
      </View>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.gutter,
    gap: spacing.gutter,
  },
  outerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerCircleSelected: {
    borderColor: colors.primary,
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  label: {
    ...typography.bodyMd,
    color: colors.onSurface,
    flex: 1,
  },
  labelDisabled: {
    color: colors.outline,
  },
});

export default RadioOption;
