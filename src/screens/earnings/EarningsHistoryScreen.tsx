import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockEarningsSummary, mockHistoricalTrip, earningsLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { TabChip } from '../../components/atoms/TabChip';
import { MetricCard } from '../../components/molecules/MetricCard';
import { EarningsBreakdown } from '../../components/organisms/EarningsBreakdown';
import type { EarningsSummary } from '../../types/wallet';
import type { HistoricalTrip } from '../../types/trip';
import type { EarningsScreenProps } from '../../types/navigation';

type PeriodTab = 'today' | 'weekly' | 'monthly';

export interface EarningsHistoryScreenProps {
  readonly navigation: EarningsScreenProps<'EarningsHistory'>['navigation'];
  readonly testID?: string;
}

export const EarningsHistoryScreen: React.FC<EarningsHistoryScreenProps> = ({
  navigation,
  testID,
}) => {
  const [activeTab, setActiveTab] = useState<PeriodTab>('today');

  // Mock: same data for all periods — in production, fetched per period
  const summary: EarningsSummary = { ...mockEarningsSummary, period: activeTab };
  const trips: HistoricalTrip[] = [mockHistoricalTrip];

  const handleTripPress = useCallback((tripId: string) => {
    navigation.navigate('TripEarningsDetail', { tripId });
  }, [navigation]);

  const renderTripItem = useCallback(({ item }: { item: HistoricalTrip }) => (
    <Pressable
      style={styles.tripCard}
      onPress={() => handleTripPress(item.id)}
      accessibilityRole="button"
    >
      <View style={styles.tripHeader}>
        <Text style={styles.tripId}>Trip #{item.id}</Text>
        <Text style={styles.tripAmount}>
          {item.earnings.currency}{item.earnings.netEarning}
        </Text>
      </View>
      <View style={styles.tripMeta}>
        <Text style={styles.tripDate}>{item.date} • {item.time}</Text>
        <Text style={styles.tripStops}>{item.stops.length} stops</Text>
      </View>
      <View style={styles.tripRoute}>
        <Icon name="route" style={styles.routeIcon} />
        <Text style={styles.routeText} numberOfLines={1}>
          {item.stops[0]?.address} → {item.stops[item.stops.length - 1]?.address}
        </Text>
      </View>
    </Pressable>
  ), [handleTripPress]);

  const renderEmpty = useCallback(() => (
    <View style={styles.emptyContainer}>
      <Icon name="payments" style={styles.emptyIcon} />
      <Text style={styles.emptyTitle}>No Earnings Yet</Text>
      <Text style={styles.emptySubtitle}>Complete trips to start earning.</Text>
    </View>
  ), []);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader title={earningsLabels.earningsTitle} showBackButton={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Period tabs */}
        <View style={styles.tabRow}>
          <TabChip label={earningsLabels.todayTab} selected={activeTab === 'today'} onPress={() => setActiveTab('today')} />
          <TabChip label={earningsLabels.weeklyTab} selected={activeTab === 'weekly'} onPress={() => setActiveTab('weekly')} />
          <TabChip label={earningsLabels.monthlyTab} selected={activeTab === 'monthly'} onPress={() => setActiveTab('monthly')} />
        </View>

        {/* Summary metrics */}
        <View style={styles.metricsRow}>
          <MetricCard
            label="Total Earnings"
            value={`${summary.currency}${summary.totalEarnings}`}
            iconName="account_balance_wallet"
            style={styles.metricCard}
          />
          <MetricCard
            label="Total Trips"
            value={`${summary.totalTrips}`}
            iconName="local_shipping"
            style={styles.metricCard}
          />
        </View>

        {/* Earnings breakdown */}
        <EarningsBreakdown summary={summary} />

        {/* Trip history */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{earningsLabels.tripHistoryTitle}</Text>
        </View>

        {trips.length > 0 ? (
          trips.map((trip) => (
            <View key={trip.id}>
              {renderTripItem({ item: trip })}
            </View>
          ))
        ) : (
          renderEmpty()
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
  tabRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.gutter,
  },
  metricCard: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: spacing.xs,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  tripCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripId: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  tripAmount: {
    ...typography.headlineSm,
    color: colors.primary,
  },
  tripMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripDate: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  tripStops: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  routeIcon: {
    fontSize: 16,
    color: colors.outline,
  },
  routeText: {
    ...typography.labelSm,
    color: colors.outline,
    flex: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg * 2,
    gap: spacing.xs,
  },
  emptyIcon: {
    fontSize: 48,
    color: colors.outline,
  },
  emptyTitle: {
    ...typography.headlineSm,
    color: colors.onSurfaceVariant,
  },
  emptySubtitle: {
    ...typography.bodyMd,
    color: colors.outline,
    textAlign: 'center',
  },
});

export default EarningsHistoryScreen;
