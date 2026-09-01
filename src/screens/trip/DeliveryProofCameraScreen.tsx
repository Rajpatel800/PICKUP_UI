import React, { useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { deliveryProofLabels } from '../../data/mockData';
import { CameraOverlay } from '../../components/organisms/CameraOverlay';
import type { HomeScreenProps } from '../../types/navigation';

/**
 * DeliveryProofCameraScreen
 * Camera UI for capturing delivery proof photo.
 * Uses CameraOverlay organism. Actual camera integration is platform-specific
 * and will be added later. This screen provides the UI shell.
 */
export interface DeliveryProofCameraScreenProps {
  readonly navigation: HomeScreenProps<'DeliveryProofCamera'>['navigation'];
  readonly route: HomeScreenProps<'DeliveryProofCamera'>['route'];
  readonly testID?: string;
}

export const DeliveryProofCameraScreen: React.FC<DeliveryProofCameraScreenProps> = ({
  navigation,
  route,
  testID,
}) => {
  const { tripId, stopId } = route.params;

  const handleCapture = useCallback(() => {
    // In production: capture image from camera, get URI
    // For now: navigate to preview with a mock URI
    navigation.navigate('DeliveryProofPreview', {
      tripId,
      stopId,
      photoUri: 'mock://delivery-proof-photo.jpg',
    });
  }, [navigation, tripId, stopId]);

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container} testID={testID}>
      <CameraOverlay
        title={deliveryProofLabels.cameraTitle}
        instructions={deliveryProofLabels.cameraInstructions}
        onCapture={handleCapture}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default DeliveryProofCameraScreen;
