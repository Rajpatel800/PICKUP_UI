import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../theme';

export type LoadingVariant =
  | 'searching_trips'
  | 'cancellation'
  | 'recharge'
  | 'subscription'
  | 'uploading'
  | 'verifying'
  | 'generic';

export interface LoadingStateProps {
  readonly variant: LoadingVariant;
  readonly title?: string;
  readonly subtitle?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

const variantDefaults: Record<LoadingVariant, { title: string; subtitle: string }> = {
  searching_trips: {
    title: 'Finding Your Next Trip',
    subtitle: 'Stay in high-demand areas for faster matches.',
  },
  cancellation: {
    title: 'Processing Cancellation...',
    subtitle: 'Please wait while we process your request.',
  },
  recharge: {
    title: 'Processing Recharge...',
    subtitle: 'Please wait while we process your payment.',
  },
  subscription: {
    title: 'Processing Subscription...',
    subtitle: 'Please wait while we activate your plan.',
  },
  uploading: {
    title: 'Uploading...',
    subtitle: 'Please wait while your file is being uploaded.',
  },
  verifying: {
    title: 'Verifying...',
    subtitle: 'Please wait while we verify your information.',
  },
  generic: {
    title: 'Loading...',
    subtitle: 'Please wait.',
  },
};

export const LoadingState: React.FC<LoadingStateProps> = ({
  variant,
  title,
  subtitle,
  style,
  testID,
}) => {
  const defaults = variantDefaults[variant];

  return (
    <View style={[styles.container, style]} testID={testID}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.title}>{title ?? defaults.title}</Text>
      <Text style={styles.subtitle}>{subtitle ?? defaults.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.containerPadding,
  },
  title: {
    ...typography.headlineMd,
    color: colors.onSurface,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});

export default LoadingState;
