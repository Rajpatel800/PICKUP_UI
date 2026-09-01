import React, { useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockVehicle, profileLabels, subscriptionLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { ProfileHeader } from '../../components/organisms/ProfileHeader';
import { SubscriptionBanner } from '../../components/organisms/SubscriptionBanner';
import { SettingsRow } from '../../components/molecules/SettingsRow';
import type { AccountScreenProps } from '../../types/navigation';
import { useAuth } from '../../hooks/useAuth';
import { useSubscription } from '../../hooks/useSubscription';

export interface ProfileScreenProps {
  readonly navigation: AccountScreenProps<'Profile'>['navigation'];
  readonly testID?: string;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  navigation,
  testID,
}) => {
  const { driver } = useAuth();
  const { current: subscription } = useSubscription();
  const vehicle = mockVehicle; // Vehicle service pending

  const handleDocuments = useCallback(() => {
    navigation.navigate('KYCDocuments');
  }, [navigation]);

  const handleVehicle = useCallback(() => {
    navigation.navigate('VehicleDocuments');
  }, [navigation]);

  const handleSubscription = useCallback(() => {
    navigation.navigate('Subscription');
  }, [navigation]);

  const handleSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader title={profileLabels.profileTitle} showBackButton={false} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {driver && (
          <ProfileHeader
            name={driver.name}
            location={driver.location}
            avatarUrl={driver.avatarUrl}
            completionPercent={driver.profileCompletionPercent}
            completionLabel={profileLabels.completionLabel}
          />
        )}

        {/* Quick actions */}
        <View style={styles.section}>
          <SettingsRow
            label={profileLabels.documentsLabel}
            iconName="description"
            hasChevron
            onPress={handleDocuments}
          />
          <SettingsRow
            label="Vehicle Details"
            iconName="local_shipping"
            value={vehicle.name}
            hasChevron
            onPress={handleVehicle}
          />
          <SettingsRow
            label={profileLabels.subscriptionLabel}
            iconName="card_membership"
            hasChevron
            onPress={handleSubscription}
          />
          <SettingsRow
            label={profileLabels.accountSettingsLabel}
            iconName="settings"
            hasChevron
            onPress={handleSettings}
          />
        </View>

        {/* Subscription summary */}
        {subscription && (
          <SubscriptionBanner
            planName={subscription.planId} // Mapping needed from planId to name
            status={subscription.status === 'active' ? 'active' : 'expired'}
            statusLabel={subscription.status === 'active' ? subscriptionLabels.activeLabel : subscriptionLabels.expiredLabel}
            validUntil={subscription.expiresAt}
            onManagePress={handleSubscription}
            manageLabel="MANAGE"
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
    gap: spacing.containerPadding,
  },
  section: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    ...shadows.sm,
  },
});

export default ProfileScreen;
