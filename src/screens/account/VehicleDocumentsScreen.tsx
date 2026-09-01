import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockVehicle, mockKycDocuments, kycLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { VehicleCard } from '../../components/molecules/VehicleCard';
import { DocumentCard } from '../../components/molecules/DocumentCard';
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

const statusLabel = (status: DocumentStatus): string => {
  const map: Record<DocumentStatus, string> = {
    pending: 'Not Uploaded',
    under_review: 'Under Review',
    approved: 'Verified',
    rejected: 'Rejected',
    expired: 'Expired',
  };
  return map[status];
};

export interface VehicleDocumentsScreenProps {
  readonly navigation: AccountScreenProps<'VehicleDocuments'>['navigation'];
  readonly testID?: string;
}

export const VehicleDocumentsScreen: React.FC<VehicleDocumentsScreenProps> = ({
  navigation,
  testID,
}) => {
  const vehicle = mockVehicle;
  // Filter vehicle-related docs
  const vehicleDocs = mockKycDocuments.filter(
    (d) => d.type === 'vehicle_rc' || d.type === 'insurance_policy' || d.type === 'vehicle_photos',
  );

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title="Vehicle Details"
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Vehicle info */}
        <View style={styles.vehicleSection}>
          <VehicleCard
            name={vehicle.name}
            registration={vehicle.registration}
            iconName={vehicle.iconName}
            status={mapDocStatus(vehicle.status)}
            statusLabel={vehicle.status === 'approved' ? 'Approved' : vehicle.status}
          />
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>{kycLabels.vehicleStatusTitle}</Text>
            <StatusBadge label={vehicle.status} variant={mapDocStatus(vehicle.status)} />
          </View>
        </View>

        {/* Vehicle documents */}
        <Text style={styles.sectionLabel}>VEHICLE DOCUMENTS</Text>

        {vehicleDocs.map((doc) => (
          <DocumentCard
            key={doc.id}
            label={doc.label}
            status={mapDocStatus(doc.status)}
            statusLabel={statusLabel(doc.status)}
            rejectionReason={doc.rejectionReason}
            onActionPress={
              doc.status === 'rejected' ? () => {} : undefined
            }
            actionLabel={doc.status === 'rejected' ? 'RESUBMIT' : undefined}
          />
        ))}
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
  vehicleSection: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    gap: spacing.containerPadding,
    ...shadows.sm,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  sectionLabel: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export default VehicleDocumentsScreen;
