import React, { useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { mockKycDocuments, kycLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { DocumentCard } from '../../components/molecules/DocumentCard';
import { StatusPill } from '../../components/atoms/StatusPill';
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

export interface KYCDocumentsScreenProps {
  readonly navigation: AccountScreenProps<'KYCDocuments'>['navigation'];
  readonly testID?: string;
}

export const KYCDocumentsScreen: React.FC<KYCDocumentsScreenProps> = ({
  navigation,
  testID,
}) => {
  const documents = mockKycDocuments;
  const hasActionRequired = documents.some((d) => d.status === 'rejected' || d.status === 'pending');

  const handleResubmit = useCallback((_docId: string) => {
    // Mock: in production, opens camera/file picker via service layer
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title={kycLabels.documentsTitle}
        onBackPress={() => navigation.goBack()}
        showBackButton
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Action required banner */}
        {hasActionRequired ? (
          <View style={styles.warningBanner}>
            <Icon name="warning" style={styles.warningIcon} />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>{kycLabels.actionRequiredTitle}</Text>
              <Text style={styles.warningSubtitle}>{kycLabels.actionRequiredSubtitle}</Text>
            </View>
          </View>
        ) : null}

        {/* Documents list */}
        <Text style={styles.sectionLabel}>{kycLabels.requiredDocumentsLabel}</Text>

        {documents.map((doc) => (
          <DocumentCard
            key={doc.id}
            label={doc.label}
            status={mapDocStatus(doc.status)}
            statusLabel={statusLabel(doc.status)}
            rejectionReason={doc.rejectionReason}
            onActionPress={
              doc.status === 'rejected' || doc.status === 'pending'
                ? () => handleResubmit(doc.id)
                : undefined
            }
            actionLabel={
              doc.status === 'rejected'
                ? kycLabels.resubmitLabel
                : doc.status === 'pending'
                ? 'UPLOAD'
                : undefined
            }
          />
        ))}

        {/* Verification note */}
        <View style={styles.noteRow}>
          <Icon name="info" style={styles.noteIcon} />
          <Text style={styles.noteText}>{kycLabels.verificationNote}</Text>
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
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.gutter,
    backgroundColor: '#fff3e0',
    borderRadius: borderRadius.md,
    padding: spacing.containerPadding,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  warningIcon: {
    fontSize: 24,
    color: '#e65100',
    marginTop: 2,
  },
  warningContent: {
    flex: 1,
    gap: 4,
  },
  warningTitle: {
    ...typography.bodyMd,
    fontWeight: '600',
    color: '#e65100',
  },
  warningSubtitle: {
    ...typography.labelSm,
    color: '#bf360c',
    lineHeight: 18,
  },
  sectionLabel: {
    ...typography.labelSm,
    color: colors.primary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  noteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.gutter,
  },
  noteIcon: {
    fontSize: 16,
    color: colors.outline,
  },
  noteText: {
    ...typography.labelSm,
    color: colors.outline,
    flex: 1,
  },
});

export default KYCDocumentsScreen;
