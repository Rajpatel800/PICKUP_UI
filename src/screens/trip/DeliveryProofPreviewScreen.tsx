import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../../components/atoms/Icon';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius, shadows } from '../../theme';
import { deliveryProofLabels } from '../../data/mockData';
import { AppHeader } from '../../components/molecules/AppHeader';
import { PrimaryButton } from '../../components/atoms/PrimaryButton';
import { SecondaryButton } from '../../components/atoms/SecondaryButton';
import type { HomeScreenProps } from '../../types/navigation';

/**
 * DeliveryProofPreviewScreen
 * Preview captured delivery photo before confirming upload.
 */
export interface DeliveryProofPreviewScreenProps {
  readonly navigation: HomeScreenProps<'DeliveryProofPreview'>['navigation'];
  readonly route: HomeScreenProps<'DeliveryProofPreview'>['route'];
  readonly testID?: string;
}

export const DeliveryProofPreviewScreen: React.FC<DeliveryProofPreviewScreenProps> = ({
  navigation,
  route,
  testID,
}) => {
  const { tripId, stopId, photoUri } = route.params;
  const [isUploading, setIsUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleConfirm = useCallback(async () => {
    setIsUploading(true);
    // Mock upload delay
    await new Promise<void>((r) => setTimeout(() => r(), 1500));
    setUploaded(true);
    setIsUploading(false);
    // Navigate to next stop or trip completed
    setTimeout(() => {
      navigation.navigate('TripCompleted', { tripId });
    }, 1200);
  }, [navigation, tripId]);

  const handleRetake = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  if (uploaded) {
    return (
      <SafeAreaView style={styles.safeArea} testID={testID}>
        <View style={styles.feedbackContainer}>
          <View style={styles.successIcon}>
            <Icon name="cloud_done" style={styles.successIconText} />
          </View>
          <Text style={styles.feedbackTitle}>{deliveryProofLabels.uploadSuccessTitle}</Text>
          <Text style={styles.feedbackSubtitle}>{deliveryProofLabels.uploadSuccessSubtitle}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      <AppHeader
        title={deliveryProofLabels.cameraTitle}
        onBackPress={() => navigation.goBack()}
        showBackButton
      />
      <View style={styles.container}>
        {/* Photo preview placeholder */}
        <View style={styles.previewContainer}>
          <View style={styles.previewPlaceholder}>
            <Icon name="image" style={styles.previewIcon} />
            <Text style={styles.previewText}>Photo Preview</Text>
            <Text style={styles.previewUri}>{photoUri}</Text>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <PrimaryButton
            label={deliveryProofLabels.confirmLabel}
            onPress={handleConfirm}
            loading={isUploading}
          />
          <SecondaryButton
            label={deliveryProofLabels.retakeLabel}
            onPress={handleRetake}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.containerPadding,
    justifyContent: 'space-between',
  },
  previewContainer: {
    flex: 1,
    paddingVertical: spacing.containerPadding,
  },
  previewPlaceholder: {
    flex: 1,
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  previewIcon: {
    fontSize: 64,
    color: colors.outline,
  },
  previewText: {
    ...typography.headlineSm,
    color: colors.onSurfaceVariant,
  },
  previewUri: {
    ...typography.labelSm,
    color: colors.outline,
    fontSize: 10,
  },
  actions: {
    gap: spacing.gutter,
    paddingBottom: spacing.lg,
  },
  feedbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.containerPadding,
    paddingHorizontal: spacing.lg,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#e8f5e9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIconText: {
    fontSize: 40,
    color: '#2e7d32',
  },
  feedbackTitle: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
  },
  feedbackSubtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default DeliveryProofPreviewScreen;
