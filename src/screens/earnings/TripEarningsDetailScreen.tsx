import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockHistoricalTrip, earningsLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { TripStopRow } from '../../components/molecules/TripStopRow';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import type { EarningsScreenProps } from '../../types/navigation';

export interface TripEarningsDetailScreenProps {
  readonly navigation: EarningsScreenProps<'TripEarningsDetail'>['navigation'];
  readonly route: EarningsScreenProps<'TripEarningsDetail'>['route'];
  readonly testID?: string;
}

export const TripEarningsDetailScreen: React.FC<TripEarningsDetailScreenProps> = ({
  navigation,
  route,
  testID,
}) => {
  // Mock: use static data — in production, fetched by tripId
  const trip = mockHistoricalTrip;
  const earnings = trip.earnings;

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title={earningsLabels.tripDetailsTitle}
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Trip header */}
        <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <Text style={styles.tripId}>Trip #{trip.id}</Text>
            <StatusBadge label={trip.status} variant="approved" />
          </View>
          <Text style={styles.tripDateTime}>{trip.date} • {trip.time}</Text>
        </View>

        {/* Route section */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{earningsLabels.routeLabel}</Text>
          {trip.stops.map((stop) => (
            <TripStopRow
              key={stop.id}
              label={stop.label}
              address={stop.address}
              status={stop.status}
              type={stop.type}
            />
          ))}
        </View>

        {/* Load details */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{earningsLabels.loadDetailsLabel}</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{earningsLabels.goodsTypeLabel}</Text>
            <Text style={styles.detailValue}>{trip.goodsType}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{earningsLabels.totalWeightLabel}</Text>
            <Text style={styles.detailValue}>{trip.totalWeight}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>{earningsLabels.vehicleLabel}</Text>
            <Text style={styles.detailValue}>{trip.vehicleType} ({trip.vehicleRegistration})</Text>
          </View>
        </View>

        {/* Financials */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>{earningsLabels.financialsLabel}</Text>
          <View style={styles.finRow}>
            <Text style={styles.finLabel}>{earningsLabels.grossEarningsLabel}</Text>
            <Text style={styles.finValue}>{earnings.currency}{earnings.grossEarning}</Text>
          </View>
          <View style={styles.finRow}>
            <Text style={styles.finLabelDeduct}>
              {earningsLabels.platformCommissionLabel} ({earnings.platformCommissionPercent}%)
            </Text>
            <Text style={styles.finValueDeduct}>-{earnings.currency}{earnings.platformCommission}</Text>
          </View>
          <View style={styles.finRow}>
            <Text style={styles.finLabelDeduct}>{earningsLabels.otherDeductionsLabel}</Text>
            <Text style={styles.finValueDeduct}>-{earnings.currency}{earnings.otherDeductions}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.finRow}>
            <Text style={styles.finLabelNet}>{earningsLabels.netEarningsLabel}</Text>
            <Text style={styles.finValueNet}>{earnings.currency}{earnings.netEarning}</Text>
          </View>

          {earnings.paidToWallet ? (
            <View style={styles.paidBadge}>
              <Icon name="check_circle" style={styles.paidIcon} />
              <Text style={styles.paidText}>{earningsLabels.paidToWalletLabel}</Text>
            </View>
          ) : null}
        </View>
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
  headerCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripId: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  tripDateTime: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  sectionCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  sectionLabel: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  finRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  finLabel: {
    ...typography.bodyMd,
    color: colors.onSurface,
  },
  finValue: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  finLabelDeduct: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  finValueDeduct: {
    ...typography.bodyMd,
    color: colors.error,
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginVertical: 4,
  },
  finLabelNet: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.onSurface,
  },
  finValueNet: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  paidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: '#e8f5e9',
    padding: spacing.gutter,
    borderRadius: borderRadius.sm,
    marginTop: 4,
  },
  paidIcon: {
    fontSize: 18,
    color: '#2e7d32',
  },
  paidText: {
    ...typography.labelSm,
    color: '#2e7d32',
    fontWeight: '600',
  },
});

export default TripEarningsDetailScreen;
