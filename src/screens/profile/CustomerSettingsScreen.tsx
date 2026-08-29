import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import BottomNavBar from '../../components/BottomNavBar';

export interface CustomerSettingsScreenProps {
  readonly onBack?: () => void;
  readonly onProfile?: () => void;
  readonly onSavedAddresses?: () => void;
  readonly onNotifications?: () => void;
  readonly onBookingHistory?: () => void;
  readonly onLanguage?: () => void;
  readonly onAccount?: () => void;
  readonly onLogout?: () => void;
  // bottom nav props
  readonly currentTab?: string;
  readonly onTabPress?: (tabId: string) => void;
}

const SETTINGS_ITEMS = [
  { id: 'profile', title: 'Profile', icon: 'user', actionKey: 'onProfile' },
  { id: 'addresses', title: 'Saved Addresses', icon: 'map-pin', actionKey: 'onSavedAddresses' },
  { id: 'notifications', title: 'Notifications', icon: 'bell', actionKey: 'onNotifications' },
  { id: 'history', title: 'Booking History', icon: 'clock', actionKey: 'onBookingHistory' },
  { id: 'language', title: 'Language', icon: 'globe', actionKey: 'onLanguage', value: 'English' },
  { id: 'account', title: 'Account', icon: 'settings', actionKey: 'onAccount' },
];

const CustomerSettingsScreen: React.FC<CustomerSettingsScreenProps> = (props) => {
  const {
    onBack,
    onLogout,
    currentTab = 'settings',
    onTabPress = () => {},
  } = props;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable style={styles.iconButton} onPress={onBack}>
          <Feather name="arrow-left" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.iconButton} /> {/* Spacer */}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Settings List */}
        <View style={styles.settingsList}>
          {SETTINGS_ITEMS.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === SETTINGS_ITEMS.length - 1;
            
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.settingRow,
                  isFirst && styles.settingRowFirst,
                  isLast && styles.settingRowLast,
                ]}
                onPress={props[item.actionKey as keyof typeof props] as () => void}
              >
                <View style={styles.rowLeft}>
                  <Feather name={item.icon as any} size={24} color={colors.onSurfaceVariant} />
                  <Text style={styles.rowTitle}>{item.title}</Text>
                </View>
                
                <View style={styles.rowRight}>
                  {item.value && (
                    <Text style={styles.rowValue}>{item.value}</Text>
                  )}
                  <Feather name="chevron-right" size={24} color={colors.outlineVariant} />
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Destructive Action Section */}
        <View style={styles.logoutContainer}>
          <Pressable style={styles.logoutButton} onPress={onLogout}>
            <MaterialIcons name="logout" size={24} color={colors.error} />
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Since BottomNavBar is not yet implemented, commented out or use dummy */}
      {/* <BottomNavBar currentTab={currentTab} onTabPress={onTabPress} /> */}
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
    backgroundColor: colors.surface,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.lg,
  },
  
  // Settings List
  settingsList: {
    flexDirection: 'column',
    gap: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: borderRadius.md,
  },
  settingRowFirst: {
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
  },
  settingRowLast: {
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowTitle: {
    fontSize: typography.bodyLg.fontSize,
    color: colors.onSurface,
    fontFamily: typography.bodyLg.fontFamily,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  rowValue: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },

  // Logout
  logoutContainer: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl * 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.errorContainer + '33', // 20% opacity
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
  },
  logoutText: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.error,
    fontFamily: typography.headlineSm.fontFamily,
  },
});

export default CustomerSettingsScreen;
