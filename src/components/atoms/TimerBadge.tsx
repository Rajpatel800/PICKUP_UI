import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface TimerBadgeProps {
  readonly expiresAt: number;
  readonly onExpired?: () => void;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const TimerBadge: React.FC<TimerBadgeProps> = ({
  expiresAt,
  onExpired,
  style,
  testID,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const diff = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
    return diff;
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const remaining = Math.max(0, Math.floor((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        onExpired?.();
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [expiresAt, onExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isUrgent = secondsLeft <= 10;

  return (
    <View
      style={[
        styles.container,
        isUrgent && styles.urgent,
        style,
      ]}
      testID={testID}
      accessibilityRole="timer"
      accessibilityLabel={`${secondsLeft} seconds remaining`}
    >
      <Text style={[styles.label, isUrgent && styles.labelUrgent]}>
        {formatted}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.unit,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.primary,
    alignSelf: 'center',
  },
  urgent: {
    backgroundColor: colors.error,
  },
  label: {
    ...typography.dataMono,
    color: colors.onPrimary,
    textAlign: 'center',
  },
  labelUrgent: {
    color: colors.onError,
  },
});

export default TimerBadge;
