import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { strings } from '../../data/mockData';
import { Feather } from '@expo/vector-icons';

export interface FareEstimateScreenProps {
  readonly onBack?: () => void;
  readonly onContinue?: () => void;
  readonly onHelp?: () => void;
}

interface BreakdownItem {
  readonly label: string;
  readonly sublabel?: string;
  readonly amount: string;
  readonly icon?: string;
  readonly isWarning?: boolean;
}

const breakdownItems: readonly BreakdownItem[] = [
  { label: 'Base Fare', amount: '₹ 150.00' },
  { label: 'Distance', sublabel: '12.5 km', amount: '₹ 180.00' },
  { label: 'Additional Drops', sublabel: '2 locations', amount: '₹ 80.00' },
  { label: 'Traffic Surcharge', amount: '₹ 25.00', icon: 'alert-triangle', isWarning: true },
  { label: 'Insurance', amount: '₹ 15.00', icon: 'shield' },
];

const FareEstimateScreen: React.FC<FareEstimateScreenProps> = ({
  onBack,
  onContinue,
  onHelp,
}) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Top App Bar */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Feather name="arrow-left" size={22} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Delivery</Text>
        <Pressable
          style={styles.helpButton}
          onPress={onHelp}
          accessibilityRole="button"
          accessibilityLabel="Help"
        >
          <Text style={styles.helpText}>Help</Text>
        </Pressable>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>{strings.booking.fareEstimate}</Text>
          <Text style={styles.pageSubtitle}>Review the estimated cost for your delivery.</Text>
        </View>

        {/* Total Card */}
        <View style={styles.totalCard}>
          <Text style={styles.totalLabel}>ESTIMATED TOTAL</Text>
          <View style={styles.totalAmountRow}>
            <Text style={styles.currencySymbol}>₹</Text>
            <Text style={styles.totalAmount}>450</Text>
            <Text style={styles.totalDecimals}>.00</Text>
          </View>
        </View>

        {/* Breakdown Card */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Breakdown</Text>
          {breakdownItems.map((item, index) => (
            <View
              key={item.label}
              style={[
                styles.breakdownRow,
                index < breakdownItems.length - 1 && styles.breakdownRowBorder,
              ]}
            >
              <View style={styles.breakdownLeft}>
                <View style={styles.breakdownLabelRow}>
                  {item.icon && (
                    <Feather
                      name={item.icon as any}
                      size={14}
                      color={item.isWarning ? colors.error : colors.onSurfaceVariant}
                    />
                  )}
                  <Text
                    style={[
                      styles.breakdownLabel,
                      item.isWarning && styles.breakdownLabelWarning,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
                {item.sublabel && (
                  <Text style={styles.breakdownSublabel}>{item.sublabel}</Text>
                )}
              </View>
              <Text style={styles.breakdownAmount}>{item.amount}</Text>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerRow}>
          <Feather name="info" size={16} color={colors.outline} />
          <Text style={styles.disclaimerText}>
            Final fare may vary based on actual distance, waiting time, and unforeseen route changes during transit.
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.continueButton}
          onPress={onContinue}
          accessibilityRole="button"
          accessibilityLabel="Continue"
        >
          <Text style={styles.continueText}>CONTINUE</Text>
          <Feather name="arrow-right" size={18} color={colors.onPrimary} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.marginMobile,
    height: spacing.rowHeightStandard,
    backgroundColor: colors.surface,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.primary,
    fontFamily: typography.headlineMd.fontFamily,
    position: 'absolute',
    left: '50%',
    // Note: transform translateX not available directly, using textAlign instead
  },
  helpButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  helpText: {
    fontSize: typography.labelSm.fontSize,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    fontFamily: typography.labelSm.fontFamily,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.gutterSm,
    paddingBottom: 140,
    gap: spacing.xl,
  },

  // Title
  titleSection: {
    gap: 4,
  },
  pageTitle: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onBackground,
    fontFamily: typography.headlineMd.fontFamily,
  },
  pageSubtitle: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },

  // Total Card
  totalCard: {
    backgroundColor: colors.primaryContainer,
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.ghostShadow,
  },
  totalLabel: {
    fontSize: typography.labelCaps.fontSize,
    fontWeight: typography.labelCaps.fontWeight,
    color: colors.onPrimaryContainer,
    fontFamily: typography.labelCaps.fontFamily,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
    opacity: 0.8,
  },
  totalAmountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  currencySymbol: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onPrimaryFixed,
    marginTop: 10,
  },
  totalAmount: {
    fontSize: 48,
    fontWeight: '600',
    color: colors.onPrimaryFixed,
    lineHeight: 56,
    letterSpacing: -1,
  },
  totalDecimals: {
    fontSize: typography.headlineMd.fontSize,
    fontWeight: typography.headlineMd.fontWeight,
    color: colors.onPrimaryFixed,
    marginTop: 10,
  },

  // Breakdown Card
  breakdownCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24,
    padding: spacing.xl,
    ...shadows.ghostShadow,
  },
  breakdownTitle: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.headlineSm.fontFamily,
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  breakdownRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceVariant + '80', // 50%
  },
  breakdownLeft: {
    flex: 1,
  },
  breakdownLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  breakdownLabel: {
    fontSize: typography.bodyMd.fontSize,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },
  breakdownLabelWarning: {
    color: colors.error,
  },
  breakdownSublabel: {
    fontSize: typography.labelSm.fontSize,
    color: colors.outline,
    fontFamily: typography.labelSm.fontFamily,
    marginTop: 2,
  },
  breakdownAmount: {
    fontSize: typography.dataMono.fontSize,
    fontWeight: typography.dataMono.fontWeight,
    color: colors.onSurface,
    fontFamily: typography.dataMono.fontFamily,
  },

  // Disclaimer
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  disclaimerText: {
    flex: 1,
    fontSize: typography.labelSm.fontSize,
    color: colors.outline,
    fontFamily: typography.labelSm.fontFamily,
    lineHeight: 18,
  },

  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: colors.surfaceVariant + '33', // 20%
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.marginMobile,
    paddingBottom: spacing.xxl,
  },
  continueButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.marginMobile,
    paddingHorizontal: spacing.xl,
    gap: spacing.sm,
    ...shadows.elevated,
  },
  continueText: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.onPrimary,
    fontFamily: typography.headlineSm.fontFamily,
  },
});

export default FareEstimateScreen;
