import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockSubscription, subscriptionLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { SubscriptionBanner } from '../../components/organisms/SubscriptionBanner';
import { BenefitCard } from '../../components/molecules/BenefitCard';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SecondaryButton } from '../../components/atoms/SecondaryButton';
import type { AccountScreenProps } from '../../types/navigation';

export interface SubscriptionScreenProps {
  readonly navigation: AccountScreenProps<'Subscription'>['navigation'];
  readonly testID?: string;
}

export const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({
  navigation,
  testID,
}) => {
  const subscription = mockSubscription;
  const isActive = subscription.status === 'active';
  const isExpired = subscription.status === 'expired' || subscription.status === 'inactive';

  const handleSubscribe = useCallback(() => {
    navigation.navigate('SubscriptionProcessing');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title={subscriptionLabels.subscriptionTitle}
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Subscription status banner */}
        <SubscriptionBanner
          planName={subscription.planName}
          status={isActive ? 'active' : 'expired'}
          statusLabel={isActive ? subscriptionLabels.activeLabel : subscriptionLabels.expiredLabel}
          validUntil={subscription.validUntil}
        />

        {/* Expired/required warning */}
        {isExpired ? (
          <View style={styles.warningCard}>
            <Icon name="block" style={styles.warningIcon} />
            <Text style={styles.warningTitle}>{subscriptionLabels.requiredTitle}</Text>
            <Text style={styles.warningSubtitle}>{subscriptionLabels.requiredSubtitle}</Text>
          </View>
        ) : null}

        {/* Plan details */}
        <View style={styles.planCard}>
          <Text style={styles.planLabel}>PLAN DETAILS</Text>
          <View style={styles.planRow}>
            <Text style={styles.planKey}>Amount</Text>
            <Text style={styles.planValue}>{subscription.currency}{subscription.amount}/{subscription.billingCycle}</Text>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planKey}>Valid From</Text>
            <Text style={styles.planValue}>{subscription.validFrom}</Text>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planKey}>Valid Until</Text>
            <Text style={styles.planValue}>{subscription.validUntil}</Text>
          </View>
          <View style={styles.planRow}>
            <Text style={styles.planKey}>Auto Renew</Text>
            <Text style={styles.planValue}>{subscription.autoRenew ? 'Yes' : 'No'}</Text>
          </View>
        </View>

        {/* Benefits */}
        <Text style={styles.sectionTitle}>Benefits</Text>
        {subscription.benefits.map((benefit) => (
          <BenefitCard
            key={benefit.id}
            title={benefit.title}
            description={benefit.description}
            iconName={benefit.iconName}
          />
        ))}
      </ScrollView>

      {/* Bottom action */}
      <View style={styles.actions}>
        {isExpired ? (
          <PrimaryButton label={subscriptionLabels.subscribeNowLabel} onPress={handleSubscribe} />
        ) : (
          <SecondaryButton label="MANAGE SUBSCRIPTION" onPress={() => {}} />
        )}
      </View>
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
  warningCard: {
    backgroundColor: colors.errorContainer,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    alignItems: 'center',
    gap: spacing.gutter,
  },
  warningIcon: {
    fontSize: 40,
    color: colors.error,
  },
  warningTitle: {
    ...typography.headlineSm,
    color: colors.error,
    textAlign: 'center',
  },
  warningSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  planLabel: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  planRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planKey: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  planValue: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  sectionTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  actions: {
    paddingHorizontal: spacing.containerPadding,
    paddingBottom: spacing.lg,
    paddingTop: spacing.gutter,
    borderTopWidth: 1,
    borderTopColor: colors.outlineVariant,
  },
});

export default SubscriptionScreen;
