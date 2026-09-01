import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface TabChipProps {
  readonly label: string;
  readonly selected?: boolean;
  readonly onPress: () => void;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const TabChip: React.FC<TabChipProps> = ({
  label,
  selected = false,
  onPress,
  style,
  testID,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        selected ? styles.selected : styles.unselected,
        style,
      ]}
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      testID={testID}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.containerPadding,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  unselected: {
    backgroundColor: colors.transparent,
    borderColor: colors.outlineVariant,
  },
  label: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});

export default TabChip;
