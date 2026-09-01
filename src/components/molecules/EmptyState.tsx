import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../atoms/Icon';
import type { ViewStyle } from 'react-native';
import { colors, typography, spacing } from '../../theme';

export type EmptyVariant =
  | 'trips'
  | 'transactions'
  | 'earnings'
  | 'notifications'
  | 'chat'
  | 'documents'
  | 'generic';

export interface EmptyStateProps {
  readonly variant: EmptyVariant;
  readonly title?: string;
  readonly subtitle?: string;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

const variantDefaults: Record<EmptyVariant, { icon: string; title: string; subtitle: string }> = {
  trips: {
    icon: 'local_shipping',
    title: 'No Trips Yet',
    subtitle: 'Your trip history will appear here once you complete your first delivery.',
  },
  transactions: {
    icon: 'receipt_long',
    title: 'No Transactions',
    subtitle: 'Your wallet transactions will appear here.',
  },
  earnings: {
    icon: 'payments',
    title: 'No Earnings Yet',
    subtitle: 'Complete trips to start earning. Your earnings breakdown will appear here.',
  },
  notifications: {
    icon: 'notifications_none',
    title: 'No Notifications',
    subtitle: 'You\'re all caught up! New notifications will appear here.',
  },
  chat: {
    icon: 'chat_bubble_outline',
    title: 'No Messages',
    subtitle: 'Start a conversation with the customer or support.',
  },
  documents: {
    icon: 'folder_open',
    title: 'No Documents',
    subtitle: 'Upload your required documents to get started.',
  },
  generic: {
    icon: 'inbox',
    title: 'Nothing Here',
    subtitle: 'There\'s nothing to show right now.',
  },
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  variant,
  title,
  subtitle,
  style,
  testID,
}) => {
  const defaults = variantDefaults[variant];

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Icon name={defaults.icon} />
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
    paddingVertical: spacing.lg * 2,
    gap: spacing.xs,
  },
  icon: {
    fontSize: 56,
    color: colors.outline,
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.headlineSm,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 22,
  },
});

export default EmptyState;
