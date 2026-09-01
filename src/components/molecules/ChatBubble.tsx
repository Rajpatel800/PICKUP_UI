import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, spacing, borderRadius } from '../../theme';

export type BubbleSender = 'driver' | 'other';

export interface ChatBubbleProps {
  readonly text: string;
  readonly timestamp: string;
  readonly sender: BubbleSender;
  readonly status?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  timestamp,
  sender,
  status,
  style,
  testID,
}) => {
  const isDriver = sender === 'driver';

  return (
    <View
      style={[
        styles.container,
        isDriver ? styles.driverAlign : styles.otherAlign,
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={`${sender}: ${text}`}
    >
      <View style={[styles.bubble, isDriver ? styles.driverBubble : styles.otherBubble]}>
        <Text style={[styles.text, isDriver ? styles.driverText : styles.otherText]}>
          {text}
        </Text>
        <View style={styles.meta}>
          <Text style={[styles.timestamp, isDriver ? styles.driverMeta : styles.otherMeta]}>
            {timestamp}
          </Text>
          {isDriver && status ? (
            <Text style={[styles.statusIcon, styles.driverMeta]}>
              {status === 'read' ? 'done_all' : status === 'delivered' ? 'done_all' : status === 'sent' ? 'done' : status === 'failed' ? 'error' : 'schedule'}
            </Text>
          ) : null}
        </View>
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
    maxWidth: '80%',
    padding: spacing.gutter,
    borderRadius: borderRadius.lg,
    gap: spacing.unit,
  },
  driverBubble: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: borderRadius.default,
  },
  otherBubble: {
    backgroundColor: colors.surfaceContainer,
    borderBottomLeftRadius: borderRadius.default,
  },
  text: {
    ...typography.bodyMd,
  },
  driverText: {
    color: colors.onPrimary,
  },
  otherText: {
    color: colors.onSurface,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.unit,
  },
  timestamp: {
    ...typography.labelSm,
    fontSize: 10,
  },
  driverMeta: {
    color: colors.onPrimaryContainer,
  },
  otherMeta: {
    color: colors.outline,
  },
  statusIcon: {
    fontSize: 12,
  },
});

export default ChatBubble;
