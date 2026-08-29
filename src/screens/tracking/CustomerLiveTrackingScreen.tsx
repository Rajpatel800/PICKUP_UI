import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Feather } from '@expo/vector-icons';
import { mockActiveTrip } from '../../data/mockData';

export interface CustomerLiveTrackingScreenProps {
  readonly onBack?: () => void;
  readonly onCall?: () => void;
  readonly onChat?: () => void;
  readonly onShare?: () => void;
}

const CustomerLiveTrackingScreen: React.FC<CustomerLiveTrackingScreenProps> = ({
  onBack,
  onCall,
  onChat,
  onShare,
}) => {
  return (
    <View style={styles.container}>
      {/* Network Offline Banner (Simulated Hidden State) */}
      {/* 
      <View style={styles.networkBanner}>
        <Feather name="wifi-off" size={16} color={colors.onErrorContainer} />
        <Text style={styles.networkBannerText}>Reconnecting... trying to find your driver</Text>
      </View>
      */}

      {/* Top App Bar */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Pressable
              style={styles.iconButton}
              onPress={onBack}
              accessibilityRole="button"
            >
              <Feather name="arrow-left" size={24} color={colors.onSurfaceVariant} />
            </Pressable>
            <Text style={styles.headerTitle}>Live Tracking</Text>
          </View>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        </View>
      </SafeAreaView>

      {/* Main Content Area (Map) */}
      <View style={styles.mapCanvas}>
        <View style={styles.mockMapPattern} />

        {/* Pickup Marker */}
        <View style={styles.pickupMarkerContainer}>
          <View style={styles.pickupMarkerIcon}>
            <View style={styles.pickupMarkerInner} />
          </View>
          <View style={styles.markerLabelContainer}>
            <Text style={styles.markerLabel}>Pickup</Text>
          </View>
        </View>

        {/* Driver Marker (Pulsing) */}
        <View style={styles.driverMarkerContainer}>
          <View style={styles.driverMarkerIcon}>
            <Feather name="truck" size={24} color={colors.onPrimaryContainer} />
          </View>
          <View style={styles.driverTimeLabel}>
            <Text style={styles.driverTimeText}>10s ago</Text>
          </View>
        </View>

        {/* Drop 1 Marker */}
        <View style={styles.drop1MarkerContainer}>
          <View style={styles.dropMarkerIcon}>
            <Text style={styles.dropMarkerText}>1</Text>
          </View>
        </View>

        {/* Drop 2 Marker */}
        <View style={styles.drop2MarkerContainer}>
          <View style={styles.dropMarkerIcon}>
            <Text style={styles.dropMarkerText}>2</Text>
          </View>
        </View>
      </View>

      {/* Bottom Overlay Container */}
      <View style={styles.bottomOverlay}>
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
          <View style={styles.tripStatusCard}>
            <View style={styles.tripStatusHeader}>
              <View>
                <Text style={styles.tripStatusTitle}>Drop 1 of 3</Text>
                <Text style={styles.tripStatusSubtitle}>
                  Arriving at Ratanada Hub in <Text style={styles.tripStatusHighlight}>8 mins</Text>
                </Text>
              </View>
              <View style={styles.onTimeBadge}>
                <Feather name="clock" size={14} color={colors.onSecondaryContainer} />
                <Text style={styles.onTimeText}>On time</Text>
              </View>
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBarFill, { width: '33%' }]} />
            </View>

            <View style={styles.driverDetailsContainer}>
              <View style={styles.driverDetailsHeader}>
                <View style={styles.driverInfoLeft}>
                  <View style={styles.driverAvatarContainer}>
                    <Image
                      source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYxDfKWkql2FzNNKIvWwllsFCfV1EJB7hgJVlqQnN2zZddz3ghiCKWVDPh6vT148pwJsJ0-t5hQSMLgWIHA3fI_whpumXXal41ET6rm3ikc97ewMjgK5AZOILyLBCP0RwitS2uFtAJopxWPD_mEAW3OhDHhUjFnO4YAMnjz8EFhTi-xIzHpBZ7mrAqYjbRfs4o0ee3MtFxJYBk6QexvPED286SMZgBwsNy4MFskQGuwA6B2Nj5kG4W' }}
                      style={styles.driverAvatar}
                    />
                  </View>
                  <View>
                    <Text style={styles.driverName}>{mockActiveTrip.driverName}</Text>
                    <View style={styles.driverSubInfo}>
                      <Feather name="star" size={12} color={colors.tertiary} />
                      <Text style={styles.driverSubInfoText}>
                        {mockActiveTrip.driverRating} • {mockActiveTrip.vehicleType}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.licensePlateBadge}>
                  <Text style={styles.licensePlateText}>{mockActiveTrip.vehicleNumber}</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionsContainer}>
                <Pressable style={styles.actionButton} onPress={onCall}>
                  <Feather name="phone" size={18} color={colors.onSurface} />
                  <Text style={styles.actionButtonText}>Call</Text>
                </Pressable>
                <Pressable style={styles.actionButton} onPress={onChat}>
                  <Feather name="message-circle" size={18} color={colors.onSurface} />
                  <Text style={styles.actionButtonText}>Chat</Text>
                </Pressable>
                <Pressable style={styles.iconOnlyButton} onPress={onShare}>
                  <Feather name="share-2" size={20} color={colors.onSurface} />
                </Pressable>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f0f2', // map bg pattern color
  },
  
  // Header
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: spacing.rowHeightStandard,
    backgroundColor: colors.surface + 'CC', // 80% opacity
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.headlineMd.fontFamily,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  liveBadgeText: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelCaps.fontFamily,
    letterSpacing: typography.labelCaps.letterSpacing,
  },

  // Map Canvas
  mapCanvas: {
    flex: 1,
    position: 'relative',
  },
  mockMapPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f3f0f2',
  },
  pickupMarkerContainer: {
    position: 'absolute',
    top: '20%',
    left: '20%',
    alignItems: 'center',
    zIndex: 10,
  },
  pickupMarkerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    ...shadows.sm,
  },
  pickupMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primaryContainer,
  },
  markerLabelContainer: {
    marginTop: 4,
    backgroundColor: colors.surface + 'CC',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  markerLabel: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
  },

  driverMarkerContainer: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    alignItems: 'center',
    zIndex: 20,
  },
  driverMarkerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.md,
  },
  driverTimeLabel: {
    marginTop: 8,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    ...shadows.sm,
  },
  driverTimeText: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurface,
    fontFamily: typography.labelSm.fontFamily,
  },

  drop1MarkerContainer: {
    position: 'absolute',
    top: '55%',
    left: '45%',
    alignItems: 'center',
    zIndex: 10,
  },
  drop2MarkerContainer: {
    position: 'absolute',
    top: '75%',
    left: '80%',
    alignItems: 'center',
    zIndex: 10,
  },
  dropMarkerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.outlineVariant,
    ...shadows.sm,
  },
  dropMarkerText: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelCaps.fontFamily,
  },

  // Bottom Overlay
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.lg,
    zIndex: 30,
  },
  safeArea: {
    width: '100%',
  },
  tripStatusCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
    ...shadows.card,
  },
  tripStatusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  tripStatusTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
  },
  tripStatusSubtitle: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
    marginTop: 4,
  },
  tripStatusHighlight: {
    fontWeight: '600',
    color: colors.primary,
  },
  onTimeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  onTimeText: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSecondaryContainer,
    fontFamily: typography.labelSm.fontFamily,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: colors.surfaceContainerHigh,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.full,
  },
  
  driverDetailsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerHighest,
    paddingTop: spacing.lg,
  },
  driverDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  driverInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  driverAvatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerHigh,
    overflow: 'hidden',
  },
  driverAvatar: {
    width: '100%',
    height: '100%',
  },
  driverName: {
    fontSize: typography.dataMono.fontSize,
    fontWeight: '500',
    color: colors.onSurface,
    fontFamily: typography.dataMono.fontFamily,
  },
  driverSubInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  driverSubInfoText: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
  },
  licensePlateBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.xs,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  licensePlateText: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.labelCaps.fontFamily,
    letterSpacing: typography.labelCaps.letterSpacing,
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceContainerLow,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
  actionButtonText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '500',
    color: colors.onSurface,
    fontFamily: typography.labelSm.fontFamily,
  },
  iconOnlyButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.surfaceContainerHighest,
  },
});

export default CustomerLiveTrackingScreen;
