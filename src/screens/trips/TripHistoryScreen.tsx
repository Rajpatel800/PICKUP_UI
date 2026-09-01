import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable,  FlatList } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockHistoricalTrip } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { TabChip } from '../../components/atoms/TabChip';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import { EmptyState } from '../../components/molecules/EmptyState';
import type { HistoricalTrip, TripStatus } from '../../types/trip';
import type { BadgeVariant } from '../../components/atoms/StatusBadge';
import type { TripsScreenProps } from '../../types/navigation';

type FilterTab = 'all' | 'completed' | 'cancelled';

const mapTripStatus = (status: TripStatus): BadgeVariant => {
  switch (status) {
    case 'completed': return 'approved';
    case 'cancelled': return 'rejected';
    case 'expired': return 'expired';
    default: return 'pending';
  }
};

const statusLabel = (status: TripStatus): string => {
  switch (status) {
    case 'completed': return 'Completed';
    case 'cancelled': return 'Cancelled';
    case 'expired': return 'Expired';
    default: return status;
  }
};

export interface TripHistoryScreenProps {
  readonly navigation: TripsScreenProps<'TripHistory'>['navigation'];
  readonly testID?: string;
}

export const TripHistoryScreen: React.FC<TripHistoryScreenProps> = ({
  navigation,
  testID,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');

  // Mock: duplicate single historical trip for demo list
  const allTrips: HistoricalTrip[] = [
    mockHistoricalTrip,
    {
      ...mockHistoricalTrip,
      id: 'LOG-9920',
      date: 'Oct 23, 2023',
      time: '2:15 PM',
      status: 'cancelled' as const,
      earnings: { ...mockHistoricalTrip.earnings, tripId: 'LOG-9920', netEarning: 0, grossEarning: 0 },
    },
    {
      ...mockHistoricalTrip,
      id: 'LOG-9919',
      date: 'Oct 22, 2023',
      time: '9:00 AM',
      goodsType: 'Furniture',
      earnings: { ...mockHistoricalTrip.earnings, tripId: 'LOG-9919', grossEarning: 2200, netEarning: 1760 },
    },
  ];

  const filteredTrips = allTrips.filter((trip) => {
    if (activeTab === 'all') return true;
    return trip.status === activeTab;
  });

  const handleTripPress = useCallback((tripId: string) => {
    navigation.navigate('HistoricalTripDetail', { tripId });
  }, [navigation]);

  const renderTripCard = useCallback(({ item }: { item: HistoricalTrip }) => (
    <Pressable
      style={styles.tripCard}
      onPress={() => handleTripPress(item.id)}
      accessibilityRole="button"
    >
      <View style={styles.tripHeader}>
        <View style={styles.tripIdRow}>
          <Icon name="local_shipping" style={styles.tripIcon} />
          <Text style={styles.tripId}>Trip #{item.id}</Text>
        </View>
        <StatusBadge label={statusLabel(item.status)} variant={mapTripStatus(item.status)} />
      </View>

      <View style={styles.tripRoute}>
        <View style={styles.routeDot} />
        <Text style={styles.routeAddress} numberOfLines={1}>
          {item.stops[0]?.address}
        </Text>
      </View>
      <View style={styles.tripRoute}>
        <View style={[styles.routeDot, styles.routeDotDrop]} />
        <Text style={styles.routeAddress} numberOfLines={1}>
          {item.stops[item.stops.length - 1]?.address}
        </Text>
      </View>

      <View style={styles.tripFooter}>
        <Text style={styles.tripMeta}>{item.date} • {item.time}</Text>
        <Text style={styles.tripMeta}>{item.stops.length} stops • {item.goodsType}</Text>
      </View>

      {item.status === 'completed' ? (
        <View style={styles.earningsRow}>
          <Text style={styles.earningsLabel}>Earned</Text>
          <Text style={styles.earningsValue}>
            {item.earnings.currency}{item.earnings.netEarning}
          </Text>
        </View>
      ) : null}
    </Pressable>
  ), [handleTripPress]);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader title="Trip History" showBackButton={false} />

      {/* Filter tabs */}
      <View style={styles.tabRow}>
        <TabChip label="All" selected={activeTab === 'all'} onPress={() => setActiveTab('all')} />
        <TabChip label="Completed" selected={activeTab === 'completed'} onPress={() => setActiveTab('completed')} />
        <TabChip label="Cancelled" selected={activeTab === 'cancelled'} onPress={() => setActiveTab('cancelled')} />
      </View>

      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={renderTripCard}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <EmptyState
            variant="trips"
            subtitle={
              activeTab === 'completed'
                ? 'No completed trips yet.'
                : activeTab === 'cancelled'
                ? 'No cancelled trips.'
                : undefined
            }
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  tabRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.gutter,
  },
  listContent: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
    flexGrow: 1,
  },
  separator: {
    height: spacing.gutter,
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
  tripIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  tripIcon: {
    fontSize: 20,
    color: colors.primary,
  },
  tripId: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: colors.onSurface,
  },
  tripRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.gutter,
    paddingLeft: spacing.xs,
  },
  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  routeDotDrop: {
    backgroundColor: colors.error,
  },
  routeAddress: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    flex: 1,
  },
  tripFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripMeta: {
    ...typography.labelSm,
    color: colors.outline,
  },
  earningsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
    paddingTop: spacing.gutter,
  },
  earningsLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
  },
  earningsValue: {
    ...typography.headlineSm,
    color: colors.primary,
  },
});

export default TripHistoryScreen;
