import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { strings, mockVehicleTypes } from '../../data/mockData';
import TopAppBar from '../../components/organisms/TopAppBar';
import VehicleOptionCard from '../../components/molecules/VehicleOptionCard';
import Button from '../../components/atoms/Button';

export interface SelectVehicleScreenProps {
  readonly onBack?: () => void;
  readonly onContinue?: (vehicleId: string) => void;
  readonly onHelp?: () => void;
}

const SelectVehicleScreen: React.FC<SelectVehicleScreenProps> = ({
  onBack,
  onContinue,
  onHelp,
}) => {
  const [selectedId, setSelectedId] = useState<string>('mini-truck');

  const selectedVehicle = mockVehicleTypes.find((v) => v.id === selectedId);

  const handleContinue = useCallback(() => {
    onContinue?.(selectedId);
  }, [selectedId, onContinue]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopAppBar
        title={strings.booking.selectVehicle}
        leadingIcon={<Text style={styles.backIcon}>←</Text>}
        onLeadingPress={onBack}
        trailingIcon={<Text style={styles.helpText}>Help</Text>}
        onTrailingPress={onHelp}
      />

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>
          Choose the right vehicle for your load.
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {mockVehicleTypes.map((vehicle) => (
          <VehicleOptionCard
            key={vehicle.id}
            name={vehicle.name}
            description={vehicle.description}
            capacity={vehicle.capacity}
            estimatedPrice={vehicle.estimatedPrice}
            eta={vehicle.eta}
            icon={<Text style={styles.vehicleIcon}>🚛</Text>}
            selected={selectedId === vehicle.id}
            onPress={() => setSelectedId(vehicle.id)}
          />
        ))}
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.ctaLabel}>CONTINUE</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceText}>
              {selectedVehicle?.estimatedPrice ?? ''}
            </Text>
            <Text style={styles.arrowIcon}>→</Text>
          </View>
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
  backIcon: {
    fontSize: 22,
    color: colors.onSurface,
  },
  helpText: {
    fontSize: typography.bodyMd.fontSize,
    fontWeight: '500',
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyMd.fontFamily,
  },
  subtitleContainer: {
    paddingHorizontal: spacing.marginMobile,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  subtitle: {
    fontSize: typography.bodyLg.fontSize,
    lineHeight: typography.bodyLg.lineHeight,
    color: colors.onSurfaceVariant,
    fontFamily: typography.bodyLg.fontFamily,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.marginMobile,
    gap: spacing.md,
    paddingBottom: spacing.xxxl + spacing.xxl,
  },
  vehicleIcon: {
    fontSize: 24,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.outlineHairline,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.md,
  },
  footerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  ctaLabel: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: typography.headlineSm.fontWeight,
    color: colors.onPrimary,
    fontFamily: typography.headlineSm.fontFamily,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  priceText: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: '700',
    color: colors.onPrimary,
    fontFamily: typography.headlineSm.fontFamily,
  },
  arrowIcon: {
    fontSize: 18,
    color: colors.onPrimary,
  },
});

export default SelectVehicleScreen;
