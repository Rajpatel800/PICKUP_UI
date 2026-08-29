import React from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { strings, mockUser } from '../../data/mockData';
import TopAppBar from '../../components/organisms/TopAppBar';
import Card from '../../components/molecules/Card';
import ListRow from '../../components/molecules/ListRow';
import Divider from '../../components/atoms/Divider';
import Button from '../../components/atoms/Button';

export interface ProfileScreenProps {
  readonly onBack?: () => void;
  readonly onEditProfile?: () => void;
  readonly onSavedAddresses?: () => void;
  readonly onBookingHistory?: () => void;
  readonly onNotifications?: () => void;
  readonly onSettings?: () => void;
  readonly onLogout?: () => void;
  readonly onNotificationPress?: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  onBack,
  onEditProfile,
  onSavedAddresses,
  onBookingHistory,
  onNotifications,
  onSettings,
  onLogout,
  onNotificationPress,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <TopAppBar
        title={strings.profile.title}
        leadingIcon={
          <View style={styles.avatarSmall}>
            <Text style={styles.avatarSmallText}>👤</Text>
          </View>
        }
        trailingIcon={<Text style={styles.bellIcon}>🔔</Text>}
        onTrailingPress={onNotificationPress}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>👤</Text>
          </View>
          <Text style={styles.userName}>{mockUser.fullName}</Text>
          <View style={styles.phoneRow}>
            <Text style={styles.phoneIcon}>📞</Text>
            <Text style={styles.phoneText}>{mockUser.phone}</Text>
          </View>
          <Pressable
            style={styles.editButton}
            onPress={onEditProfile}
            accessibilityRole="button"
            accessibilityLabel="Edit Profile"
          >
            <Text style={styles.editButtonText}>
              {strings.profile.editProfile}
            </Text>
          </Pressable>
        </View>

        {/* Menu Card */}
        <Card variant="outlined" padding="none">
          <ListRow
            title={strings.profile.savedAddresses}
            leading={<Text style={styles.menuIcon}>📍</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
            onPress={onSavedAddresses}
          />
          <Divider />
          <ListRow
            title="Booking History"
            leading={<Text style={styles.menuIcon}>🕐</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
            onPress={onBookingHistory}
          />
          <Divider />
          <ListRow
            title={strings.profile.notifications}
            leading={<Text style={styles.menuIcon}>🔔</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
            onPress={onNotifications}
          />
          <Divider />
          <ListRow
            title="Settings"
            leading={<Text style={styles.menuIcon}>⚙️</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
            onPress={onSettings}
          />
        </Card>

        {/* Logout Button */}
        <Pressable
          style={styles.logoutButton}
          onPress={onLogout}
          accessibilityRole="button"
          accessibilityLabel="Logout"
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>{strings.profile.logout}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  avatarSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSmallText: { fontSize: 16 },
  bellIcon: { fontSize: 22 },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.marginMobile,
    gap: spacing.xxl,
    paddingBottom: spacing.xxxl + spacing.xxl,
  },

  // Profile Header
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
    gap: spacing.sm,
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarLargeText: { fontSize: 40 },
  userName: {
    fontSize: typography.headlineMd.fontSize,
    lineHeight: typography.headlineMd.lineHeight,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineMd.fontFamily,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  phoneIcon: { fontSize: 14 },
  phoneText: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },
  editButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.outlineHairline,
    borderRadius: borderRadius.full,
  },
  editButtonText: {
    fontSize: typography.bodyMd.fontSize,
    fontWeight: '500',
    color: colors.onSurface,
    fontFamily: typography.bodyMd.fontFamily,
  },

  // Menu
  menuIcon: { fontSize: 20 },
  chevron: {
    fontSize: 20,
    color: colors.onSurfaceVariant,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    backgroundColor: colors.errorContainer,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    opacity: 0.8,
  },
  logoutIcon: { fontSize: 18 },
  logoutText: {
    fontSize: typography.bodyLg.fontSize,
    fontWeight: '600',
    color: colors.error,
    fontFamily: typography.bodyLg.fontFamily,
  },
});

export default ProfileScreen;
