import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockActiveTrip } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { MultiStopTimeline } from '../../components/organisms/MultiStopTimeline';
import { SecondaryButton } from '../../components/atoms/SecondaryButton';
import { DriverMap, MapOverlay, RouteData, StopType } from '../../map';
import { useDriverLocation } from '../../location';
import { useActiveTrip } from '../../hooks/useActiveTrip';
import { useTripRoute } from '../../hooks/useTripRoute';
import type { HomeScreenProps } from '../../types/navigation';

export interface MultiStopJourneyScreenProps {
  readonly navigation: HomeScreenProps<'MultiStopJourney'>['navigation'];
  readonly route: HomeScreenProps<'MultiStopJourney'>['route'];
  readonly testID?: string;
}

export const MultiStopJourneyScreen: React.FC<MultiStopJourneyScreenProps> = ({
  navigation,
  route: navRoute,
  testID,
}) => {
  const { currentLocation } = useDriverLocation();
  const trip = useActiveTrip() || mockActiveTrip;
  const { route: routingData } = useTripRoute();

  const handleNavigateToStop = useCallback((stopId: string) => {
    const stopIndex = trip.stops.findIndex((s) => s.id === stopId);
    const stop = trip.stops[stopIndex];
    if (!stop) return;

    if (stop.type === 'pickup') {
      navigation.navigate('ArrivedAtPickup', { tripId: trip.id, stopId });
    } else if (stop.requiresOtp) {
      navigation.navigate('DropOTP', { tripId: trip.id, stopId });
    }
  }, [navigation, trip]);

  const routeData = useMemo<RouteData | undefined>(() => {
    if (!trip) return undefined;
    return {
      polylinePoints: routingData?.polylinePoints || [],
      bounds: routingData?.bounds,
      stops: trip.stops.map((stop, index) => ({
        id: stop.id,
        type: stop.type as StopType,
        coordinate: {
          latitude: stop.latitude,
          longitude: stop.longitude,
        },
        isCurrent: index === trip.currentStopIndex,
        completed: stop.status === 'completed',
        label: stop.type === 'drop' && trip.stops.length > 2 ? String(index) : undefined
      }))
    };
  }, [trip, routingData]);

  const currentStopIndex = trip.currentStopIndex;
  const totalDrops = trip.stops.filter(s => s.type === 'drop').length;
  // Calculate which drop this is. If index 0 is pickup, then index 1 is Drop 1.
  const currentDropNumber = currentStopIndex; 
  const isPickup = trip.stops[currentStopIndex]?.type === 'pickup';
  
  const topIndicatorLabel = isPickup ? 'PICKUP' : `DROP ${currentDropNumber} OF ${totalDrops}`;
  const topIndicatorName = trip.stops[currentStopIndex]?.address?.split(',')[0] || 'Destination';

  const displayEta = routingData?.eta 
    ? Math.max(0, Math.ceil((routingData.eta.getTime() - Date.now()) / 60000))
    : trip.stops[currentStopIndex]?.etaMinutes || 0;
  
  const displayDistance = routingData?.totalDistanceMeters ? (routingData.totalDistanceMeters / 1000).toFixed(1) : 2.4; // mock fallback

  return (
    <View style={styles.safeArea} testID={testID}>
      {/* Absolute back button overlay on map */}
      <SafeAreaView edges={['top']} style={styles.backButtonContainer}>
        <Icon 
          name="arrow_back" 
          style={styles.backButtonIcon} 
        />
        <View style={styles.backButtonTouch} onTouchEnd={() => navigation.goBack()} />
      </SafeAreaView>

      <View style={styles.mapContainer}>
        <DriverMap
          currentLocation={currentLocation || undefined}
          routeData={routeData}
          showControls={false}
        />
        
        <SafeAreaView edges={['top']} style={styles.mapOverlays}>
          <MapOverlay position="top" style={styles.topIndicatorContainer}>
            <View style={styles.topIndicatorCard}>
              <Text style={styles.topIndicatorLabel}>{topIndicatorLabel}</Text>
              <Text style={styles.topIndicatorName}>{topIndicatorName}</Text>
            </View>
          </MapOverlay>
        </SafeAreaView>
      </View>

      <View style={styles.bottomPanel}>
        <View style={styles.summaryRow}>
          <Text style={styles.distanceText}>{displayDistance} km</Text>
          <Text style={styles.etaText}> • {displayEta} min</Text>
        </View>

        <View style={styles.arrivingRow}>
          <Text style={styles.arrivingText}>
            {isPickup ? 'Arriving at Pickup' : `Arriving at Drop ${currentDropNumber}`}
          </Text>
          <View style={styles.onTimeBadge}>
            <Icon name="schedule" style={styles.onTimeIcon} />
            <Text style={styles.onTimeText}>On Time</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.timelineContainer}>
          <MultiStopTimeline stops={trip.stops} currentStopIndex={trip.currentStopIndex} />
        </View>

        <SecondaryButton
          label="TRIP DETAILS"
          onPress={() => {}} // No-op for now as it's not specified
          style={styles.detailsButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    padding: spacing.md,
  },
    backButtonTouch: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: 60,
    zIndex: 11,
  },
  backButtonIcon: {
    fontSize: 24,
    color: colors.onSurface,
    backgroundColor: colors.surface,
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    ...shadows.sm,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  mapOverlays: {
    flex: 1,
    pointerEvents: 'box-none',
  },
  topIndicatorContainer: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  topIndicatorCard: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    ...shadows.md,
  },
  topIndicatorLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '700',
  },
  topIndicatorName: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: 'bold',
  },
  bottomPanel: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingTop: spacing.md,
    ...shadows.lg,
    marginTop: -20,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  distanceText: {
    ...typography.headlineMd,
    color: colors.onSurface,
    fontWeight: '600',
  },
  etaText: {
    ...typography.bodyLg,
    color: colors.onSurfaceVariant,
  },
  arrivingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  arrivingText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  onTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8eaf6',
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    gap: 4,
  },
  onTimeIcon: {
    fontSize: 14,
    color: '#3f51b5',
  },
  onTimeText: {
    ...typography.labelSm,
    color: '#3f51b5',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: colors.outlineVariant,
    marginVertical: spacing.md,
  },
  timelineContainer: {
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.lg,
  },
  detailsButton: {
    backgroundColor: colors.surface,
  },
});

export default MultiStopJourneyScreen;
