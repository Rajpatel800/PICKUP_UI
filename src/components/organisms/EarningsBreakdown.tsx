import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import type { EarningsSummary } from '../../types/wallet';

export interface EarningsBreakdownProps {
  readonly summary: EarningsSummary;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const EarningsBreakdown: React.FC<EarningsBreakdownProps> = ({
  summary,
  style,
  testID,
}) => {
  const rows = [
    { label: 'Gross Earning', value: summary.grossEarnings, isPositive: true },
    { label: 'Platform Commission', value: summary.platformCommission, isPositive: false },
    { label: 'Other Deductions', value: summary.otherDeductions, isPositive: false },
  ];

  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="none">
      {/* Summary header */}
      <View style={styles.summaryHeader}>
        <View>
          <Text style={styles.totalLabel}>Net Earnings</Text>
          <Text style={styles.totalAmount}>
            {summary.currency}{summary.netEarnings.toLocaleString('en-IN')}
          </Text>
        </View>
        <View style={styles.tripBadge}>
          <Text style={styles.tripCount}>{summary.totalTrips} trips</Text>
        </View>
      </View>

      {/* Breakdown rows */}
      <View style={styles.breakdown}>
        {rows.map((row) => (
          <View key={row.label} style={styles.row}>
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={[styles.rowValue, !row.isPositive && styles.deduction]}>
              {row.isPositive ? '' : '-'}{summary.currency}{row.value.toLocaleString('en-IN')}
            </Text>
          </View>
        ))}
      </View>

      {/* Net total */}
      <View style={styles.netRow}>
        <Text style={styles.netLabel}>Paid to Wallet</Text>
        <Text style={styles.netValue}>
          {summary.currency}{summary.netEarnings.toLocaleString('en-IN')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant,
  },
  totalAmount: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  tripBadge: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.unit,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.full,
  },
  tripCount: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  breakdown: {
    gap: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: spacing.gutter,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  rowValue: {
    ...typography.dataMono,
    color: colors.onSurface,
  },
  deduction: {
    color: colors.error,
  },
  netRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: spacing.gutter,
  },
  netLabel: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  netValue: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
});

export default EarningsBreakdown;
