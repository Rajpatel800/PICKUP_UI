import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { strings, mockActiveTrip, mockRecentLocations } from '../../data/mockData';
import TopAppBar from '../../components/organisms/TopAppBar';
import Card from '../../components/molecules/Card';
import ListRow from '../../components/molecules/ListRow';
import Button from '../../components/atoms/Button';
import Divider from '../../components/atoms/Divider';
import DraggableBottomSheet from '../../components/organisms/DraggableBottomSheet';
import { Feather } from '@expo/vector-icons';

export interface HomeScreenProps {
  readonly onSearchPress?: () => void;
  readonly onTripHistory?: () => void;
  readonly onManageAddresses?: () => void;
  readonly onRecentLocationPress?: (addr: string) => void;
  readonly onActiveTripPress?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onSearchPress,
  onTripHistory,
  onManageAddresses,
  onRecentLocationPress,
  onActiveTripPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header (Fixed on top) */}
      <View style={styles.headerWrapper}>
        <TopAppBar
          title="Pick Up"
          leadingIcon={
            <View style={styles.avatar}>
              <Feather name="user" size={16} color={colors.primary} />
            </View>
          }
          trailingIcon={<Feather name="bell" size={22} color={colors.primary} />}
        />
      </View>

      {/* Map Background (Full Screen behind) */}
      <View style={styles.mapBackground}>
        {/* Map placeholder */}
        <View style={styles.mapPin}>
          <View style={styles.mapPinLabel}>
            <Text style={styles.mapPinText}>12 mins</Text>
          </View>
          <View style={styles.mapPinDot} />
        </View>

        <View style={styles.mapGpsButton}>
          <Feather name="crosshair" size={18} color={colors.primary} />
        </View>

        {/* Active Trip Overlay Pill */}
        <View style={styles.activeTripOverlay}>
          <Card
            variant="elevated"
            padding="sm"
            onPress={onActiveTripPress}
            style={styles.activeTripCard}
          >
            <View style={styles.tripContent}>
              <View style={styles.tripIcon}>
                <Feather name="truck" size={18} color={colors.primary} />
              </View>
              <View style={styles.tripInfo}>
                <View style={styles.tripStatusRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.tripStatusText}>EN ROUTE TO DROP 2</Text>
                </View>
                <Text style={styles.tripDriverText}>
                  {mockActiveTrip.driverName} • {mockActiveTrip.vehicleNumber}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color={colors.onSurfaceVariant} />
            </View>
          </Card>
        </View>
      </View>

      {/* Draggable Bottom Sheet */}
      <DraggableBottomSheet>
        <ScrollView contentContainerStyle={styles.sheetScrollContent} showsVerticalScrollIndicator={false}>
          {/* Booking Card */}
          <View style={styles.bookingCardWrapper}>
            <Card variant="filled" padding="md">
              <View style={styles.bookingInputsContainer}>
                {/* Pickup */}
                <View style={styles.inputRowContainer}>
                  <View style={styles.dotLineWrapper}>
                    <View style={[styles.dot, styles.pickupDot]} />
                    <View style={styles.connectingLine} />
                  </View>
                  <View style={styles.inputContentWrapper}>
                    <Text style={styles.inputLabel}>Pickup</Text>
                    <View style={styles.inputFieldRow}>
                      <Text style={styles.inputValue}>Current Location</Text>
                      <Text style={styles.changeAction}>Change</Text>
                    </View>
                  </View>
                </View>

                <Divider />

                {/* Drop */}
                <View style={styles.inputRowContainer}>
                  <View style={styles.dotLineWrapper}>
                    <Text style={styles.dropPinIcon}>📍</Text>
                    <View style={[styles.connectingLine, styles.connectingLineShort]} />
                  </View>
                  <View style={styles.inputContentWrapper}>
                    <View style={styles.inputFieldRow}>
                      <Text style={styles.placeholderValue}>Enter drop location</Text>
                      <View style={styles.arrowCircle}>
                        <Feather name="arrow-right" size={12} color={colors.onSurfaceVariant} />
                      </View>
                    </View>
                  </View>
                </View>
                
                {/* Add another drop */}
                <View style={styles.addDropRow}>
                  <Feather name="plus" size={16} color={colors.onSurfaceVariant} />
                  <Text style={styles.addDropText}>Add another drop</Text>
                </View>
              </View>

              <Button
                label={strings.home.startBooking}
                onPress={onSearchPress ?? (() => {})}
                variant="primary"
                size="lg"
                fullWidth
              />
            </Card>
          </View>

          {/* Recent Locations */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{strings.home.recentLocations}</Text>
            <Card variant="outlined" padding="none">
              {mockRecentLocations.map((loc, index) => (
                <React.Fragment key={loc.id}>
                  {index > 0 && <Divider />}
                  <ListRow
                    title={loc.name}
                    subtitle={loc.address}
                    leading={<Feather name="clock" size={18} color={colors.onSurfaceVariant} />}
                    onPress={() => onRecentLocationPress?.(loc.address)}
                  />
                </React.Fragment>
              ))}
            </Card>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsGrid}>
            <Card
              variant="outlined"
              padding="lg"
              onPress={onTripHistory}
              style={styles.quickActionCard}
            >
              <View style={styles.iconBadgePrimary}>
                <Feather name="file-text" size={20} color={colors.primary} />
              </View>
              <View style={styles.actionTextWrapper}>
                <Text style={styles.actionTitle}>Trip History</Text>
                <Text style={styles.actionSubtitle}>View past deliveries</Text>
              </View>
            </Card>

            <Card
              variant="outlined"
              padding="lg"
              onPress={onManageAddresses}
              style={styles.quickActionCard}
            >
              <View style={styles.iconBadgeSecondary}>
                <Feather name="bookmark" size={20} color={colors.onSurfaceVariant} />
              </View>
              <View style={styles.actionTextWrapper}>
                <Text style={styles.actionTitle}>Manage Addresses</Text>
                <Text style={styles.actionSubtitle}>Saved locations</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </DraggableBottomSheet>

      {/* Mock Bottom Tab Bar (Fixed at bottom) */}
      <View style={styles.bottomTabBar}>
        <View style={styles.tabItem}>
          <View style={[styles.tabIconWrapper, styles.tabActiveWrapper]}>
            <Feather name="home" size={20} color={colors.primary} />
          </View>
          <Text style={styles.tabLabelActive}>Home</Text>
        </View>
        <View style={styles.tabItem}>
          <View style={styles.tabIconWrapper}>
            <Feather name="navigation" size={20} color={colors.onSurfaceVariant} />
          </View>
          <Text style={styles.tabLabel}>Trips</Text>
        </View>
        <View style={styles.tabItem}>
          <View style={styles.tabIconWrapper}>
            <Feather name="credit-card" size={20} color={colors.onSurfaceVariant} />
          </View>
          <Text style={styles.tabLabel}>Wallet</Text>
        </View>
        <View style={styles.tabItem}>
          <View style={styles.tabIconWrapper}>
            <Feather name="user" size={20} color={colors.onSurfaceVariant} />
          </View>
          <Text style={styles.tabLabel}>Account</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerWrapper: {
    zIndex: 10,
    backgroundColor: colors.surface,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  // Map Section (Absolute)
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F3F4F1',
    zIndex: 0,
    top: 60, // below header
    bottom: 80, // above tabs
  },
  mapPin: {
    alignItems: 'center',
    marginTop: '30%',
  },
  mapPinLabel: {
    backgroundColor: '#03071D',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    marginBottom: 4,
  },
  mapPinText: {
    color: colors.white,
    fontSize: typography.labelSm.fontSize,
    fontWeight: '600',
  },
  mapPinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 4,
    borderColor: '#03071D',
    backgroundColor: colors.white,
  },
  mapGpsButton: {
    position: 'absolute',
    top: '50%',
    right: spacing.marginMobile,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },
  
  activeTripOverlay: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.marginMobile,
    right: spacing.marginMobile,
  },
  activeTripCard: {
    borderRadius: borderRadius.lg,
  },
  tripContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  tripIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tripInfo: {
    flex: 1,
  },
  tripStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.statusGreen,
  },
  tripStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  tripDriverText: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurface,
    fontWeight: '500',
  },

  // Sheet Content
  sheetScrollContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl * 2, // extra padding for scrolling
  },
  bookingCardWrapper: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.xxl,
  },
  bookingInputsContainer: {
    marginBottom: spacing.xl,
  },
  inputRowContainer: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
  },
  dotLineWrapper: {
    width: 24,
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginTop: 6,
  },
  pickupDot: {
    backgroundColor: colors.primary,
  },
  dropPinIcon: {
    fontSize: 14,
    marginTop: 2,
  },
  connectingLine: {
    width: 1,
    flex: 1,
    backgroundColor: colors.outlineVariant,
    marginTop: 4,
    marginBottom: -16,
  },
  connectingLineShort: {
    marginBottom: -8,
  },
  inputContentWrapper: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  inputLabel: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurfaceVariant,
  },
  inputFieldRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  inputValue: {
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurface,
  },
  placeholderValue: {
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurfaceVariant,
  },
  changeAction: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '600',
    color: colors.onSurface,
  },
  arrowCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDropRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 32,
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  addDropText: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
  },

  // Sections
  section: {
    paddingHorizontal: spacing.marginMobile,
    marginBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  quickActionsGrid: {
    flexDirection: 'row',
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  actionTextWrapper: {
    marginTop: spacing.md,
    gap: 2,
  },
  actionTitle: {
    fontSize: typography.bodyMd.fontSize,
    fontWeight: '600',
    color: colors.onSurface,
    fontFamily: typography.bodyMd.fontFamily,
  },
  actionSubtitle: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
  },
  quickActionCard: {
    flex: 1,
  },
  iconBadgePrimary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeSecondary: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Bottom Tabs
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.outlineHairline,
    paddingBottom: spacing.lg,
    paddingTop: spacing.sm,
    zIndex: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  tabIconWrapper: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tabActiveWrapper: {
    backgroundColor: colors.primaryFixed,
  },
  tabLabel: {
    fontSize: typography.labelSm.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
  },
  tabLabelActive: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '700',
    color: colors.onSurface,
    fontFamily: typography.labelSm.fontFamily,
  },
});

export default HomeScreen;
