import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { PrimaryButton } from '../atoms/PrimaryButton';
import { StatusPill } from '../atoms/StatusPill';

export interface BalanceCardProps {
  readonly balance: number;
  readonly currency: string;
  readonly minimumBalance: number;
  readonly isLowBalance: boolean;
  readonly balanceLabel?: string;
  readonly onRechargePress: () => void;
  readonly rechargeLabel?: string;
  readonly lowBalanceWarning?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({
  balance,
  currency,
  minimumBalance,
  isLowBalance,
  balanceLabel = 'CURRENT BALANCE',
  onRechargePress,
  rechargeLabel = 'RECHARGE WALLET',
  lowBalanceWarning,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      <Text style={styles.label}>{balanceLabel}</Text>
      <Text style={styles.balance}>
        {currency}{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
      </Text>
      <Text style={styles.minBalance}>
        Minimum Balance: {currency}{minimumBalance.toLocaleString('en-IN')}
      </Text>
      {isLowBalance && lowBalanceWarning ? (
        <StatusPill label={lowBalanceWarning} variant="warning" iconName="warning" />
      ) : null}
      <PrimaryButton
        label={rechargeLabel}
        onPress={onRechargePress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    ...shadows.lg,
  },
  label: {
    ...typography.labelCaps,
    color: colors.onPrimaryContainer,
  },
  balance: {
    ...typography.displaySm,
    color: colors.onPrimary,
  },
  minBalance: {
    ...typography.labelSm,
    color: colors.onPrimaryContainer,
  },
  button: {
    backgroundColor: colors.onPrimary,
    marginTop: spacing.xs,
  },
});

export default BalanceCard;
