import React from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import type { MaterialIconsIconName } from '@react-native-vector-icons/material-icons';
import type { TextStyle, StyleProp } from 'react-native';
import { colors } from '../../theme';

export interface IconProps {
  readonly name: string;
  readonly size?: number;
  readonly color?: string;
  readonly style?: StyleProp<TextStyle>;
  readonly testID?: string;
}

/**
 * Converts Material Symbols underscore names (e.g. "chevron_right")
 * to the hyphenated names used by @react-native-vector-icons/material-icons
 * (e.g. "chevron-right").
 */
const ALIAS_MAP: Record<string, string> = {
  chat_error: 'sms-failed',
};

function resolveIconName(name: string): string {
  if (ALIAS_MAP[name]) return ALIAS_MAP[name];
  return name.replace(/_/g, '-');
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = colors.onSurface,
  style,
  testID,
}) => {
  const resolvedName = resolveIconName(name);

  return (
    <MaterialIcons
      name={resolvedName as MaterialIconsIconName}
      size={size}
      color={color}
      style={style}
      testID={testID}
    />
  );
};

export default Icon;