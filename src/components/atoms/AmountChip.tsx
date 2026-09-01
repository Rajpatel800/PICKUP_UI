import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface AmountChipProps {
  readonly amount: number;
  readonly currency?: string;
  readonly selected?: boolean;
  readonly onPress: (amount: number) => void;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const AmountChip: React.FC<AmountChipProps> = ({
  amount,
  currency = '₹',
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
      onPress={() => onPress(amount)}
      accessibilityRole="button"
      accessibilityLabel={`${currency}${amount}`}
      accessibilityState={{ selected }}
      testID={testID}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {currency}{amount.toLocaleString('en-IN')}
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
    alignItems: 'center',
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
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});

export default AmountChip;
