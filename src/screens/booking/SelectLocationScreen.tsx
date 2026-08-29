import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import Button from '../../components/atoms/Button';

export interface SelectLocationScreenProps {
  readonly type?: 'pickup' | 'dropoff';
  readonly locationAddress?: string;
  readonly onBack?: () => void;
  readonly onConfirm?: () => void;
}

const SelectLocationScreen: React.FC<SelectLocationScreenProps> = ({
  type = 'pickup',
  locationAddress = '14th St & Broadway',
  onBack,
  onConfirm,
}) => {
  const isPickup = type === 'pickup';
  
  return (
    <View style={styles.container}>
      {/* Map Background Mock */}
      <View style={styles.mapBackground} />

      {/* Top Floating Header */}
      <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
        <View style={styles.floatingHeader}>
          <Pressable style={styles.circleButton} onPress={onBack}>
            <Feather name="arrow-left" size={24} color={colors.onSurface} />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Center Marker */}
      <View style={styles.centerMarkerContainer} pointerEvents="none">
        <View style={styles.markerCircle}>
          <MaterialIcons 
            name={isPickup ? 'trip-origin' : 'location-on'} 
            size={24} 
            color={colors.primary} 
          />
        </View>
        <View style={styles.markerStem} />
        <View style={styles.markerDot} />
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sheetTitle}>
            {isPickup ? 'Select Pick Up Location' : 'Select Drop Location'}
          </Text>
        </View>

        <View style={styles.addressContainer}>
          <Feather name="map-pin" size={20} color={colors.primary} />
          <Text style={styles.addressText} numberOfLines={2}>
            {locationAddress}
          </Text>
        </View>

        <Button
          label={isPickup ? 'Confirm Pick Up' : 'Confirm Drop Off'}
          onPress={() => onConfirm?.()}
          variant="primary"
          fullWidth
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: colors.surfaceContainerLowest,
  },
  mapBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLow,
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  floatingHeader: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sm,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  centerMarkerContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20, // half width
    marginTop: -48, // offset to point exactly at center
    alignItems: 'center',
    zIndex: 20,
  },
  markerCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  markerStem: {
    width: 2,
    height: 12,
    backgroundColor: colors.surface,
    ...shadows.card,
  },
  markerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    ...shadows.card,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.marginMobile,
    paddingBottom: spacing.xxxl,
    ...shadows.card,
    elevation: 24,
  },
  sheetHeader: {
    marginBottom: spacing.lg,
  },
  sheetTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
    textAlign: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surfaceVariant,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.xl,
  },
  addressText: {
    flex: 1,
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurface,
    fontFamily: typography.bodyLg.fontFamily,
  },
});

export default SelectLocationScreen;
