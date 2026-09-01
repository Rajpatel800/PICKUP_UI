import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockVehicle } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { StatusBadge } from '../../components/atoms/StatusBadge';
import type { DocumentStatus } from '../../types/user';
import type { BadgeVariant } from '../../components/atoms/StatusBadge';
import type { AccountScreenProps } from '../../types/navigation';

const mapDocStatus = (status: DocumentStatus): BadgeVariant => {
  const map: Record<DocumentStatus, BadgeVariant> = {
    pending: 'pending',
    under_review: 'under_review',
    approved: 'approved',
    rejected: 'rejected',
    expired: 'expired',
  };
  return map[status];
};

export interface VehicleStatusScreenProps {
  readonly navigation: AccountScreenProps<'VehicleStatus'>['navigation'];
  readonly testID?: string;
}

export const VehicleStatusScreen: React.FC<VehicleStatusScreenProps> = ({
  navigation,
  testID,
}) => {
  const vehicle = mockVehicle;

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title="Vehicle Status"
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Vehicle identity */}
        <View style={styles.card}>
          <View style={styles.vehicleIcon}>
            <Text style={styles.vehicleIconText}>{vehicle.iconName}</Text>
          </View>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleReg}>{vehicle.registration}</Text>
          <StatusBadge label={vehicle.status} variant={mapDocStatus(vehicle.status)} />
        </View>

        {/* Status details */}
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Status Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Vehicle Type</Text>
            <Text style={styles.detailValue}>{vehicle.type}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Registration</Text>
            <Text style={styles.detailValue}>{vehicle.registration}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Approval Status</Text>
            <Text style={[
              styles.detailValue,
              vehicle.status === 'approved' && styles.statusApproved,
              vehicle.status === 'rejected' && styles.statusRejected,
              vehicle.status === 'under_review' && styles.statusReview,
            ]}>
              {vehicle.status === 'approved' ? 'Approved' :
               vehicle.status === 'rejected' ? 'Rejected' :
               vehicle.status === 'under_review' ? 'Under Review' :
               vehicle.status === 'pending' ? 'Pending' : 'Expired'}
            </Text>
          </View>
        </View>
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
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.gutter,
    ...shadows.sm,
  },
  vehicleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleIconText: {
    fontSize: 32,
    color: colors.primary,
  },
  vehicleName: {
    ...typography.headlineMd,
    color: colors.onSurface,
  },
  vehicleReg: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  detailCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.gutter,
    ...shadows.sm,
  },
  detailTitle: {
    ...typography.headlineSm,
    color: colors.onSurface,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  detailValue: {
    ...typography.bodyMd,
    fontWeight: '500',
    color: colors.onSurface,
  },
  statusApproved: {
    color: '#2e7d32',
  },
  statusRejected: {
    color: colors.error,
  },
  statusReview: {
    color: '#e65100',
  },
});

export default VehicleStatusScreen;
