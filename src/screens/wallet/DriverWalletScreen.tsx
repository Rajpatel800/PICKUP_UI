import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockWalletBalance, mockTransactions, walletLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { BalanceCard } from '../../components/molecules/BalanceCard';
import { TransactionRow } from '../../components/molecules/TransactionRow';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { StatusPill } from '../../components/atoms/StatusPill';
import type { WalletScreenProps } from '../../types/navigation';

export interface DriverWalletScreenProps {
  readonly navigation: WalletScreenProps<'DriverWallet'>['navigation'];
  readonly testID?: string;
}

export const DriverWalletScreen: React.FC<DriverWalletScreenProps> = ({
  navigation,
  testID,
}) => {
  const wallet = mockWalletBalance;
  const transactions = mockTransactions;

  const handleRecharge = useCallback(() => {
    navigation.navigate('Recharge');
  }, [navigation]);

  const handleViewHistory = useCallback(() => {
    navigation.navigate('TransactionHistory');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader title={walletLabels.walletTitle} showBackButton={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Balance Card */}
        <BalanceCard
          balance={wallet.balance}
          currency={wallet.currency}
          minimumBalance={wallet.minimumBalance}
          isLowBalance={wallet.isLowBalance}
          balanceLabel={walletLabels.currentBalanceLabel}
          onRechargePress={handleRecharge}
          lowBalanceWarning={walletLabels.lowBalanceWarning}
        />

        {wallet.isLowBalance ? (
          <StatusPill label={walletLabels.lowBalanceWarning} variant="warning" iconName="warning" />
        ) : null}

        {/* Quick Recharge CTA */}
        <PrimaryButton
          label="RECHARGE WALLET"
          onPress={handleRecharge}
          style={styles.rechargeCta}
        />

        {/* Recent Transactions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <Text style={styles.viewAllLink} onPress={handleViewHistory}>
            View All
          </Text>
        </View>

        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((txn) => (
            <TransactionRow
              key={txn.id}
              title={txn.title}
              description={txn.description}
              amount={txn.amount}
              currency={txn.currency}
              type={txn.type}
              date={txn.date}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Icon name="receipt_long" style={styles.emptyIcon} />
            <Text style={styles.emptyText}>No transactions yet</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
    gap: spacing.containerPadding,
  },
  rechargeCta: {
    marginTop: spacing.xs,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  viewAllLink: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.xs,
  },
  emptyIcon: {
    fontSize: 40,
    color: colors.outline,
  },
  emptyText: {
    ...typography.bodyMd,
    color: colors.outline,
  },
});

export default DriverWalletScreen;
