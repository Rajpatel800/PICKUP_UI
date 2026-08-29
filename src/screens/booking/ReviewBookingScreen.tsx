import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, borderRadius, typography, shadows } from '../../theme';
import { strings, mockBookingReview } from '../../data/mockData';
import TopAppBar from '../../components/organisms/TopAppBar';
import Card from '../../components/molecules/Card';
import LocationInputRow from '../../components/molecules/LocationInputRow';
import ListRow from '../../components/molecules/ListRow';
import Divider from '../../components/atoms/Divider';
import Button from '../../components/atoms/Button';

export interface ReviewBookingScreenProps {
  readonly onBack?: () => void;
  readonly onConfirm?: () => void;
  readonly onEditPickup?: () => void;
  readonly onEditDrop?: () => void;
  readonly onChangeVehicle?: () => void;
  readonly onChangePayment?: () => void;
}

const ReviewBookingScreen: React.FC<ReviewBookingScreenProps> = ({
  onBack,
  onConfirm,
  onEditPickup,
  onEditDrop,
  onChangeVehicle,
  onChangePayment,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TopAppBar
        title={strings.booking.reviewBooking}
        leadingIcon={<Text style={styles.backIcon}>←</Text>}
        onLeadingPress={onBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Route Card */}
        <Card variant="outlined" padding="md">
          <LocationInputRow
            label="Pickup"
            address={mockBookingReview.pickup}
            dotColor={colors.statusGreen}
            onPress={onEditPickup}
            showConnector
          />
          {mockBookingReview.drops.map((drop, i) => (
            <LocationInputRow
              key={`drop-${i}`}
              label={`Drop ${i + 1}`}
              address={drop}
              dotColor={colors.primary}
              onPress={onEditDrop}
              showConnector={i < mockBookingReview.drops.length - 1}
            />
          ))}
        </Card>

        {/* Vehicle & Fare Card */}
        <Card variant="outlined" padding="none">
          <ListRow
            title="Vehicle"
            subtitle={mockBookingReview.vehicleType}
            leading={<Text style={styles.itemIcon}>🚛</Text>}
            trailing={
              <Text style={styles.changeText} onPress={onChangeVehicle}>
                Change
              </Text>
            }
          />
          <Divider />
          <ListRow
            title="Estimated Fare"
            subtitle={`${mockBookingReview.distance} • ${mockBookingReview.estimatedTime}`}
            leading={<Text style={styles.itemIcon}>💰</Text>}
            trailing={
              <Text style={styles.fareText}>{mockBookingReview.estimatedFare}</Text>
            }
          />
          <Divider />
          <ListRow
            title="Payment"
            subtitle={mockBookingReview.paymentMethod}
            leading={<Text style={styles.itemIcon}>💳</Text>}
            trailing={
              <Text style={styles.changeText} onPress={onChangePayment}>
                Change
              </Text>
            }
          />
        </Card>

        {/* Optional: Declared Value / Insurance */}
        <Card variant="outlined" padding="none">
          <ListRow
            title="Declared Value"
            subtitle={mockBookingReview.declaredValue}
            leading={<Text style={styles.itemIcon}>🏷️</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
          />
          <Divider />
          <ListRow
            title="Insurance"
            subtitle={mockBookingReview.insurance}
            leading={<Text style={styles.itemIcon}>🛡️</Text>}
            trailing={<Text style={styles.chevron}>›</Text>}
          />
        </Card>
      </ScrollView>

      {/* Confirm CTA */}
      <View style={styles.footer}>
        <Button
          label={strings.booking.confirmBooking}
          onPress={onConfirm ?? (() => {})}
          variant="primary"
          size="lg"
          fullWidth
        />
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.marginMobile,
    gap: spacing.stackGapMd,
    paddingBottom: spacing.xxxl + spacing.xxl,
  },
  itemIcon: { fontSize: 20 },
  changeText: {
    fontSize: typography.bodyMd.fontSize,
    fontWeight: '600',
    color: colors.primary,
    fontFamily: typography.bodyMd.fontFamily,
  },
  fareText: {
    fontSize: typography.headlineSm.fontSize,
    fontWeight: '700',
    color: colors.primary,
    fontFamily: typography.headlineSm.fontFamily,
  },
  chevron: {
    fontSize: 20,
    color: colors.onSurfaceVariant,
  },
  footer: {
    paddingHorizontal: spacing.marginMobile,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.outlineHairline,
    backgroundColor: colors.surface,
  },
});

export default ReviewBookingScreen;
