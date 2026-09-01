import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, borderRadius } from '../../theme';

export type ImageBubbleStatus = 'uploading' | 'sent' | 'failed';

export interface ChatImageBubbleProps {
  readonly imageUrl: string;
  readonly timestamp: string;
  readonly status: ImageBubbleStatus;
  readonly isDriver: boolean;
  readonly onRetry?: () => void;
  readonly retryLabel?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const ChatImageBubble: React.FC<ChatImageBubbleProps> = ({
  imageUrl,
  timestamp,
  status,
  isDriver,
  onRetry,
  retryLabel = 'Retry',
  style,
  testID,
}) => {
  return (
    <View
      style={[
        styles.container,
        isDriver ? styles.driverAlign : styles.otherAlign,
        style,
      ]}
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel="Shared image"
    >
      <View style={[styles.bubble, isDriver ? styles.driverBubble : styles.otherBubble]}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
          {status === 'uploading' ? (
            <View style={styles.overlay}>
              <ActivityIndicator color={colors.onPrimary} size="small" />
              <Text style={styles.overlayText}>Uploading...</Text>
            </View>
          ) : null}
          {status === 'failed' ? (
            <View style={styles.overlay}>
              <Icon name="error" style={styles.failedIcon} />
              {onRetry ? (
                <Pressable onPress={onRetry} accessibilityRole="button" accessibilityLabel={retryLabel}>
                  <Text style={styles.retryText}>{retryLabel}</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
        </View>
        <Text style={[styles.timestamp, isDriver ? styles.driverMeta : styles.otherMeta]}>
          {timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.containerPadding,
    paddingVertical: spacing.unit,
  },
  driverAlign: {
    alignItems: 'flex-end',
  },
  otherAlign: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '70%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  driverBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: borderRadius.default,
  },
  otherBubble: {
    backgroundColor: colors.surfaceContainer,
    borderBottomLeftRadius: borderRadius.default,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 4 / 3,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill as object,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  overlayText: {
    ...typography.labelSm,
    color: colors.onPrimary,
  },
  failedIcon: {
    fontSize: 28,
    color: colors.error,
  },
  retryText: {
    ...typography.labelSm,
    color: colors.onPrimary,
    textDecorationLine: 'underline',
  },
  timestamp: {
    ...typography.labelSm,
    fontSize: 10,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.unit,
    textAlign: 'right',
  },
  driverMeta: {
    color: colors.onPrimaryContainer,
  },
  otherMeta: {
    color: colors.outline,
  },
});

export default ChatImageBubble;
