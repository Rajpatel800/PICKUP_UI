import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, typography, spacing } from '../../theme';
import AuthInput from '../atoms/AuthInput';
import { PrimaryButton } from '../atoms/PrimaryButton';

interface DriverLoginFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const DriverLoginForm: React.FC<DriverLoginFormProps> = ({
  onSubmit,
  isLoading,
}) => {
  const [driverIdOrPhone, setDriverIdOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const isLikelyPhone = driverIdOrPhone.length > 0 && /^\+?[\d\s\-\(\)]+$/.test(driverIdOrPhone);
  const showPassword = !isLikelyPhone;
  const submitLabel = isLikelyPhone ? "Get OTP ➔" : "Login ➔";
  const canSubmit = isLikelyPhone 
    ? driverIdOrPhone.replace(/\D/g, '').length >= 10 
    : driverIdOrPhone.length > 0 && password.length > 0;

  return (
    <View style={styles.container}>
      <AuthInput
        label="Driver ID or Phone Number"
        placeholder={isLikelyPhone ? "Enter 10-digit number" : "Enter ID or Phone"}
        value={driverIdOrPhone}
        onChangeText={setDriverIdOrPhone}
        autoCapitalize="none"
        iconName={isLikelyPhone ? "phone" : "badge"}
        prefix={isLikelyPhone ? "+91" : undefined}
        keyboardType={isLikelyPhone ? "phone-pad" : "default"}
      />

      {showPassword && (
        <AuthInput
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          isPassword
          iconName="lock-outline"
        />
      )}

      {showPassword && (
        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </TouchableOpacity>
      )}

      <PrimaryButton
        label={submitLabel}
        onPress={() => onSubmit({ driverIdOrPhone, password, isPhone: isLikelyPhone })}
        disabled={isLoading || !canSubmit}
        loading={isLoading}
        style={styles.submitBtn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    width: '100%',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: -spacing.xs,
    marginBottom: spacing.xs,
  },
  forgotText: {
    ...typography.labelSm,
    color: colors.onSurface,
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: spacing.md,
  },
});

export default DriverLoginForm;
