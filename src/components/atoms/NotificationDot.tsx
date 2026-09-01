import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors } from '../../theme';

export interface NotificationDotProps {
  readonly visible?: boolean;
  readonly size?: number;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const NotificationDot: React.FC<NotificationDotProps> = ({
  visible = true,
  size = 8,
  style,
  testID,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <View
      style={[
        styles.dot,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel="Unread notification"
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    backgroundColor: colors.error,
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

export default NotificationDot;
