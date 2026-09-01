import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import AuthInput from '../atoms/AuthInput';
import SocialButton from '../atoms/SocialButton';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface CustomerSignupFormProps {
  onSwitchToLogin: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const CustomerSignupForm: React.FC<CustomerSignupFormProps> = ({
  onSwitchToLogin,
  onSubmit,
  isLoading,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <AuthInput
        label="FULL NAME"
        placeholder="Jane Doe"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      
      <AuthInput
        label="EMAIL ADDRESS"
        placeholder="jane@example.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <AuthInput
        label="Phone Number"
        placeholder="Enter 10-digit number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        iconName="phone"
        prefix="+91"
      />

      <AuthInput
        label="PASSWORD"
        placeholder="••••••••"
        value={password}
        onChangeText={setPassword}
        isPassword
      />

      <PrimaryButton
        label="Create Account ➔"
        onPress={() => onSubmit({ name, email, phone, password })}
        disabled={isLoading || !name || !email || !phone || !password}
        loading={isLoading}
        style={styles.submitBtn}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>

      <View style={styles.socialContainer}>
        <SocialButton provider="google" onPress={() => {}} />
        <SocialButton provider="apple" onPress={() => {}} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text style={styles.footerLink}>Log In</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity style={styles.forgotBtn}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    width: '100%',
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: colors.surfaceVariant,
  },
  dividerText: {
    ...typography.labelCaps,
    color: colors.onSurfaceVariant,
    paddingHorizontal: spacing.md,
  },
  socialContainer: {
    gap: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.primary,
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  forgotText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  }
});

export default CustomerSignupForm;
