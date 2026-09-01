import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../theme';
import Icon from './Icon';

export interface AuthInputProps extends TextInputProps {
  label: string;
  iconName?: string;
  isPassword?: boolean;
  prefix?: string;
}

export const AuthInput: React.FC<AuthInputProps> = ({ 
  label, 
  iconName, 
  isPassword, 
  prefix,
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const secureTextEntry = isPassword && !showPassword;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[
        styles.inputContainer,
        isFocused && styles.inputContainerFocused
      ]}>
        {iconName && (
          <Icon 
            name={iconName} 
            size={20} 
            color={isFocused ? colors.primary : colors.onSurfaceVariant} 
            style={styles.leftIcon}
          />
        )}
        {prefix && (
          <Text style={styles.prefix}>{prefix}</Text>
        )}
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.outline}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIcon}
          >
            <Icon 
              name={showPassword ? 'visibility-off' : 'visibility'} 
              size={20} 
              color={colors.onSurfaceVariant} 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  label: {
    ...typography.labelSm,
    color: colors.onSurface,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainerLowest,
    paddingHorizontal: spacing.gutter,
    height: 48,
  },
  inputContainerFocused: {
    borderColor: colors.primary,
  },
  input: {
    flex: 1,
    ...typography.bodyMd,
    color: colors.onSurface,
    height: '100%',
  },
  prefix: {
    ...typography.bodyMd,
    color: colors.onSurface,
    marginRight: spacing.xs,
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});

export default AuthInput;
