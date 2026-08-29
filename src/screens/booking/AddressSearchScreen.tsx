import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export interface AddressSearchScreenProps {
  readonly onBack?: () => void;
  readonly onClose?: () => void;
  readonly onLocationSelect?: (location: string) => void;
  readonly onMapSelect?: () => void;
  readonly onCurrentLocation?: () => void;
}

const RECENT_LOCATIONS = [
  { id: '1', name: '123 Main Street', address: 'San Francisco, CA 94105', icon: 'clock' as const },
  { id: '2', name: 'San Francisco International Airport (SFO)', address: 'Terminal 2, San Francisco, CA 94128', icon: 'clock' as const },
  { id: '3', name: 'Home', address: '456 Oak Ave, San Francisco, CA 94117', icon: 'home' as const, color: colors.primary },
  { id: '4', name: 'Work', address: '789 Market St, San Francisco, CA 94103', icon: 'briefcase' as const, color: colors.primary },
];

const AddressSearchScreen: React.FC<AddressSearchScreenProps> = ({
  onBack,
  onClose,
  onLocationSelect,
  onMapSelect,
  onCurrentLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Pick Up</Text>
        <Pressable style={styles.iconButton} onPress={onClose}>
          <Feather name="x" size={24} color={colors.primary} />
        </Pressable>
      </View>

      <View style={styles.mainContent}>
        {/* Search Input Area */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={20} color={colors.onSurfaceVariant} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search location"
              placeholderTextColor={colors.onSurfaceVariant}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <MaterialIcons name="cancel" size={20} color={colors.onSurfaceVariant} />
              </Pressable>
            )}
          </View>
        </View>

        {/* Quick Actions Group */}
        <View style={styles.quickActionsContainer}>
          <Pressable style={styles.quickActionBtn} onPress={onCurrentLocation}>
            <MaterialIcons name="my-location" size={18} color={colors.onSecondaryContainer} />
            <Text style={styles.quickActionText}>Current Location</Text>
          </Pressable>
          
          <Pressable style={styles.quickActionBtn} onPress={onMapSelect}>
            <MaterialIcons name="map" size={18} color={colors.onSecondaryContainer} />
            <Text style={styles.quickActionText}>Select on Map</Text>
          </Pressable>
        </View>

        {/* Suggestions / Recent Locations List */}
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>RECENT LOCATIONS</Text>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            {RECENT_LOCATIONS.map((loc) => (
              <Pressable
                key={loc.id}
                style={styles.locationItem}
                onPress={() => onLocationSelect?.(loc.name)}
              >
                <View style={styles.iconContainer}>
                  <Feather
                    name={loc.icon}
                    size={20}
                    color={loc.color || colors.onSurfaceVariant}
                  />
                </View>
                <View style={styles.locationTextContainer}>
                  <Text style={styles.locationName}>{loc.name}</Text>
                  <Text style={styles.locationAddress}>{loc.address}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
  mainContent: {
    flex: 1,
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.md,
  },
  searchContainer: {
    marginBottom: spacing.lg,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceVariant,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurface,
    fontFamily: typography.bodyLg.fontFamily,
    height: '100%',
  },
  clearButton: {
    marginLeft: spacing.sm,
    padding: 4,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  quickActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  quickActionText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: typography.labelSm.fontWeight,
    color: colors.onSecondaryContainer,
    fontFamily: typography.labelSm.fontFamily,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  listTitle: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelCaps.fontFamily,
    letterSpacing: typography.labelCaps.letterSpacing,
    marginBottom: spacing.md,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant + '4D', // 30% opacity
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationTextContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineSm.fontFamily,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },
});

export default AddressSearchScreen;
