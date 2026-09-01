import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import AuthInput from '../atoms/AuthInput';
import SocialButton from '../atoms/SocialButton';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface CustomerLoginFormProps {
  onSwitchToSignup: () => void;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const CustomerLoginForm: React.FC<CustomerLoginFormProps> = ({
  onSwitchToSignup,
  onSubmit,
  isLoading,
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const isLikelyPhone = emailOrPhone.length > 0 && /^\+?[\d\s\-\(\)]+$/.test(emailOrPhone);
  const showPassword = !isLikelyPhone;
  const submitLabel = isLikelyPhone ? "Get OTP ➔" : "Login ➔";
  const canSubmit = isLikelyPhone 
    ? emailOrPhone.replace(/\D/g, '').length >= 10 
    : emailOrPhone.length > 0 && password.length > 0;

  return (
    <View style={styles.container}>
      <AuthInput
        label="Email or Phone Number"
        placeholder={isLikelyPhone ? "Enter 10-digit number" : "you@example.com"}
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        keyboardType={isLikelyPhone ? "phone-pad" : "email-address"}
        autoCapitalize="none"
        iconName={isLikelyPhone ? "phone" : "mail-outline"}
        prefix={isLikelyPhone ? "+91" : undefined}
      />

      {showPassword && (
        <AuthInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          isPassword
          iconName="lock-outline"
        />
      )}

      <PrimaryButton
        label={submitLabel}
        onPress={() => onSubmit({ emailOrPhone, password, isPhone: isLikelyPhone })}
        disabled={isLoading || !canSubmit}
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
      
      {showPassword && (
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={onSwitchToSignup}>
          <Text style={styles.footerLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  forgotBtn: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  forgotText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  footerText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
  },
  footerLink: {
    ...typography.bodyMd,
    fontWeight: '700',
    color: colors.primary,
  }
});

export default CustomerLoginForm;
