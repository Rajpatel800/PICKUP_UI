import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { Feather } from '@expo/vector-icons';

export interface SelectDropLocationScreenProps {
  readonly onBack?: () => void;
  readonly onConfirm?: () => void;
  readonly onAddAnother?: () => void;
}

const SelectDropLocationScreen: React.FC<SelectDropLocationScreenProps> = ({
  onBack,
  onConfirm,
  onAddAnother,
}) => {
  const [searchQuery, setSearchQuery] = useState('Shastri Nagar, Jodhpur');
  const [instructions, setInstructions] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Map Canvas (Simulated via ImageBackground) */}
      <ImageBackground
        source={{
          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHX5v6oEO5mXpNSd790XoqMkOxo9EvFZ0x3NYamS_sp84oQY_T0sj08XoELN2rr9vbXpY6JP3yJyFwf15VVLn2QI0StttP4vjXa58XHNxIe_lEFxgvhMmxpwwWru2MJ4j74RMhRyj1L2YZ_6Esh5-5C5tLb2vlp8Uf-_lbE-h_FnnZtUy90VgWxdEiR7WEOOWMLV-sKepCW_bv7PMRcAeWYgRqvqRTmDL1Hl69AP9iAGkv1hZzS1yY',
        }}
        style={styles.mapCanvas}
        resizeMode="cover"
      >
        {/* Top Controls Overlay */}
        <View style={[styles.topControls, { paddingTop: Math.max(insets.top, spacing.marginMobile) }]}>
          {/* Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
          >
            <Feather name="arrow-left" size={22} color={colors.onSurface} />
          </Pressable>

          {/* Search Field */}
          <View style={styles.searchContainer}>
            <Feather name="search" size={20} color={colors.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search drop location"
              placeholderTextColor={colors.onSurfaceVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable
                style={styles.clearButton}
                onPress={() => setSearchQuery('')}
                accessibilityRole="button"
                accessibilityLabel="Clear search"
              >
                <Feather name="x" size={20} color={colors.onSurfaceVariant} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Map Pin (Center) */}
        <View style={styles.mapPinContainer}>
          <View style={styles.mapPin}>
            <Feather name="map-pin" size={24} color={colors.onPrimary} />
          </View>
          <View style={styles.mapPinDot} />
        </View>

        {/* FAB (My Location) */}
        <Pressable
          style={styles.fab}
          accessibilityRole="button"
          accessibilityLabel="Center map"
        >
          <Feather name="crosshair" size={20} color={colors.onSurfaceVariant} />
        </Pressable>
      </ImageBackground>

      {/* Bottom Information Panel */}
      <SafeAreaView edges={['bottom']} style={styles.bottomSheet}>
        {/* Drag Handle */}
        <View style={styles.dragHandleWrapper}>
          <View style={styles.dragHandle} />
        </View>

        <View style={styles.sheetContent}>
          {/* Header */}
          <View style={styles.sheetHeader}>
            <Text style={styles.dropIndex}>Drop 1</Text>
            <Text style={styles.locationTitle}>Shastri Nagar, Jodhpur</Text>
          </View>

          {/* Instructions Input */}
          <View style={styles.instructionsContainer}>
            <Feather name="edit-2" size={20} color={colors.onSurfaceVariant} style={styles.instructionsIcon} />
            <TextInput
              style={styles.instructionsInput}
              placeholder="Add Landmark / Instructions (Optional)"
              placeholderTextColor={colors.onSurfaceVariant}
              value={instructions}
              onChangeText={setInstructions}
            />
          </View>

          {/* Actions */}
          <View style={styles.actionsContainer}>
            <Pressable
              style={styles.addDropButton}
              onPress={onAddAnother}
              accessibilityRole="button"
            >
              <Feather name="plus" size={18} color={colors.primary} />
              <Text style={styles.addDropText}>Add another drop</Text>
            </Pressable>

            <Pressable
              style={styles.confirmButton}
              onPress={onConfirm}
              accessibilityRole="button"
            >
              <Text style={styles.confirmText}>CONFIRM DROP</Text>
              <Feather name="check" size={18} color={colors.onPrimary} />
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
  },
  
  // Map Canvas
  mapCanvas: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  
  // Top Controls
  topControls: {
    flexDirection: 'row',
    paddingHorizontal: spacing.marginMobile,
    gap: spacing.md,
    zIndex: 10,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.full,
    height: 48,
    paddingHorizontal: spacing.md,
    ...shadows.card,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.bodyMd.fontSize,
    fontFamily: typography.bodyMd.fontFamily,
    color: colors.onSurface,
    padding: 0, // Remove default padding
  },
  clearButton: {
    marginLeft: spacing.xs,
    padding: spacing.xs,
  },

  // Map Pin
  mapPinContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -40 }], // Center adjustment
    alignItems: 'center',
  },
  mapPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
  },
  mapPinDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 4,
    opacity: 0.8,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 40,
    right: spacing.marginMobile,
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceContainerLowest,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.elevated,
    zIndex: 10,
  },

  // Bottom Sheet
  bottomSheet: {
    backgroundColor: colors.surfaceContainerLowest,
    borderTopLeftRadius: borderRadius.lg, // approx 16px
    borderTopRightRadius: borderRadius.lg,
    marginTop: -16, // overlap map
    ...shadows.elevated, // 0 -4px 24px rgba(0,0,0,0.06)
  },
  dragHandleWrapper: {
    alignItems: 'center',
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: borderRadius.full,
    backgroundColor: colors.outlineVariant,
    opacity: 0.5,
  },
  sheetContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingBottom: spacing.marginMobile,
    paddingTop: spacing.xs,
    gap: spacing.xl,
  },

  // Header
  sheetHeader: {
    gap: 4,
  },
  dropIndex: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelCaps.fontFamily,
    letterSpacing: typography.labelCaps.letterSpacing,
    textTransform: 'uppercase',
  },
  locationTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
  },

  // Instructions Input
  instructionsContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructionsIcon: {
    position: 'absolute',
    left: spacing.md,
    zIndex: 1,
  },
  instructionsInput: {
    flex: 1,
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.md,
    paddingLeft: 44, // space for icon
    paddingRight: spacing.md,
    fontSize: typography.bodyMd.fontSize,
    fontFamily: typography.bodyMd.fontFamily,
    color: colors.onSurface,
  },

  // Actions
  actionsContainer: {
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  addDropButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignSelf: 'center',
  },
  addDropText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.labelSm.fontFamily,
  },
  confirmButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.marginMobile,
  },
  confirmText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '600', // matches tracking-wide font-label-sm in uppercase
    color: colors.onPrimary,
    fontFamily: typography.labelSm.fontFamily,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default SelectDropLocationScreen;
