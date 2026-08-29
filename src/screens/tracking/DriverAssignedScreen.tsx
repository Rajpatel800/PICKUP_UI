import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Button from '../../components/atoms/Button';
import DraggableBottomSheet from '../../components/organisms/DraggableBottomSheet';

export interface DriverAssignedScreenProps {
  readonly onMenuPress?: () => void;
  readonly onContactDriver?: () => void;
  readonly onTripDetails?: () => void;
}

const DriverAssignedScreen: React.FC<DriverAssignedScreenProps> = ({
  onMenuPress,
  onContactDriver,
  onTripDetails,
}) => {
  return (
    <View style={styles.container}>
      {/* Map Background Mock */}
      <View style={styles.mapBackground}>
        {/* Pickup Point */}
        <View style={styles.pickupPinContainer}>
          <View style={styles.pickupPinDot} />
          <View style={styles.pickupPinLine} />
        </View>

        {/* Driver Current Location */}
        <View style={styles.driverLocationContainer}>
          <View style={styles.driverPin}>
            <MaterialIcons name="local-shipping" size={24} color={colors.primary} />
          </View>
          <View style={styles.etaBadge}>
            <Text style={styles.etaBadgeText}>5 mins away</Text>
          </View>
        </View>
      </View>

      {/* Top App Bar */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.header}>
          <Pressable style={styles.iconButton} onPress={onMenuPress}>
            <Feather name="menu" size={24} color={colors.primary} />
          </Pressable>
          <Text style={styles.headerTitle}>Pick Up</Text>
          <View style={styles.profileIconBox}>
            <Feather name="user" size={16} color={colors.onSurfaceVariant} />
          </View>
        </View>
      </SafeAreaView>

      {/* Driver Info Bottom Card (Using DraggableBottomSheet for consistent feel, or a static view) */}
      {/* We will use a static positioned view to match the design closely as a fixed bottom card. */}
      <View style={styles.bottomSheetContainer}>
        {/* Drag Handle Indicator */}
        <View style={styles.dragHandle} />

        {/* Status Header */}
        <View style={styles.statusHeaderRow}>
          <View style={styles.statusTextCol}>
            <Text style={styles.statusTitle}>Driver Assigned</Text>
            <Text style={styles.statusSubtitle}>Arriving in 5 mins</Text>
          </View>
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={16} color={colors.onSecondaryContainer} />
            <Text style={styles.ratingText}>4.8</Text>
          </View>
        </View>

        {/* Driver Details */}
        <View style={styles.driverDetailsCard}>
          <View style={styles.driverAvatar}>
            <Feather name="user" size={32} color={colors.onSurfaceVariant} />
          </View>
          <View style={styles.driverInfoText}>
            <Text style={styles.driverName}>Rajesh K.</Text>
            <Text style={styles.vehicleType}>Tata Ace</Text>
          </View>
          <View style={styles.vehiclePlateBox}>
            <Text style={styles.vehiclePlateText}>RJ 19 XX 1234</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <Button
            label="Contact Driver"
            onPress={() => onContactDriver?.()}
            variant="primary"
            fullWidth
            icon={<MaterialIcons name="call" size={20} color={colors.onPrimary} />}
          />
          <Button
            label="Trip Details"
            onPress={() => onTripDetails?.()}
            variant="secondary"
            fullWidth
            icon={<MaterialIcons name="list-alt" size={20} color={colors.onSecondaryContainer} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e5e1e4', // From HTML design
    zIndex: 0,
  },
  pickupPinContainer: {
    position: 'absolute',
    top: '25%',
    left: '33%',
    alignItems: 'center',
    zIndex: 10,
  },
  pickupPinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.surface,
    ...shadows.card,
  },
  pickupPinLine: {
    height: 64,
    width: 0,
    borderLeftWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary + '66', // 40% opacity
    marginTop: -8,
  },
  driverLocationContainer: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    marginLeft: -32,
    marginTop: -32,
    alignItems: 'center',
    zIndex: 20,
  },
  driverPin: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },
  etaBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.surface + 'E6', // 90% opacity
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.surfaceContainer,
    ...shadows.card,
  },
  etaBadgeText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: typography.labelSm.fontWeight,
    color: colors.primary,
    fontFamily: typography.labelSm.fontFamily,
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: colors.surface + 'CC', // 80% opacity
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
    height: spacing.rowHeightStandard,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.primary,
    fontFamily: typography.headlineMd.fontFamily,
  },
  profileIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest + 'E6', // 90% opacity
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceContainerLow,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxxl,
    zIndex: 40,
    ...shadows.elevated,
  },
  dragHandle: {
    width: 48,
    height: 4,
    backgroundColor: colors.surfaceContainerHighest,
    borderRadius: borderRadius.full,
    alignSelf: 'center',
    marginBottom: spacing.xl,
  },
  statusHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  statusTextCol: {
    flexDirection: 'column',
  },
  statusTitle: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.primary,
    fontFamily: typography.headlineSm.fontFamily,
  },
  statusSubtitle: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
    marginTop: 2,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  ratingText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: typography.labelSm.fontWeight,
    color: colors.onSecondaryContainer,
    fontFamily: typography.labelSm.fontFamily,
  },
  driverDetailsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  driverAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.surfaceVariant,
  },
  driverInfoText: {
    flex: 1,
    flexDirection: 'column',
  },
  driverName: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.primary,
    fontFamily: typography.headlineSm.fontFamily,
  },
  vehicleType: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
    marginTop: 2,
  },
  vehiclePlateBox: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  vehiclePlateText: {
    fontSize: typography.dataMono.fontSize,
    fontWeight: typography.dataMono.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.dataMono.fontFamily,
    letterSpacing: typography.dataMono.letterSpacing,
  },
  actionsContainer: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
});

export default DriverAssignedScreen;
