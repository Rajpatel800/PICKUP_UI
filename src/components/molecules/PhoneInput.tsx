import React from 'react';
import { View, Text, StyleSheet, TextInput, ViewStyle } from 'react-native';
import Icon from '../atoms/Icon';
import { colors, typography, borderRadius, spacing } from '../../theme';

export interface PhoneInputProps {
  readonly countryCode: string;
  readonly value: string;
  readonly onChangeText: (text: string) => void;
  readonly placeholder?: string;
  readonly hasError?: boolean;
  readonly style?: ViewStyle;
  readonly testID?: string;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  countryCode,
  value,
  onChangeText,
  placeholder = 'Enter phone number',
  hasError = false,
  style,
  testID,
}) => {
  return (
    <View
      style={[styles.container, hasError && styles.containerError, style]}
      testID={testID}
      accessibilityRole="none"
    >
      <View style={styles.codeContainer}>
        <Text style={styles.code}>{countryCode}</Text>
      </View>
      <View style={styles.divider} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.outline}
        keyboardType="phone-pad"
        maxLength={10}
        accessibilityLabel="Phone number input"
        accessibilityRole="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: borderRadius.default,
    backgroundColor: colors.surfaceContainerLowest,
    height: 48,
  },
  containerError: {
    borderColor: colors.error,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.containerPadding,
    backgroundColor: colors.surfaceContainerLow,
    height: '100%',
  },
  code: {
    ...typography.bodyMd,
    fontWeight: '400',
    color: colors.onSurfaceVariant,
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: colors.outlineVariant,
  },
  input: {
    flex: 1,
    ...typography.bodyLg,
    color: colors.onSurface,
    paddingHorizontal: spacing.gutter,
  },
});

export default PhoneInput;

