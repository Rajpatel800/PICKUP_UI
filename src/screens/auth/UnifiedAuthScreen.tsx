import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, borderRadius } from '../../theme';
import { authData } from '../../data/mockData';
import { setDevIntendedRole } from '../../utils/devRoleResolver';

import CustomerSignupForm from '../../components/auth/CustomerSignupForm';
import DriverSignupForm from '../../components/auth/DriverSignupForm';
import CustomerLoginForm from '../../components/auth/CustomerLoginForm';
import DriverLoginForm from '../../components/auth/DriverLoginForm';

export type AuthMode = 'signup' | 'login';
export type AppRole = 'customer' | 'driver';

export interface UnifiedAuthScreenProps {
  readonly navigation: any;
  readonly onSendOtp: (phone: string) => Promise<void>;
  readonly onLoginWithEmail: (email: string, password: string) => Promise<boolean>;
  readonly isLoading?: boolean;
  readonly testID?: string;
}

export const UnifiedAuthScreen: React.FC<UnifiedAuthScreenProps> = ({
  navigation,
  onSendOtp,
  onLoginWithEmail,
  isLoading = false,
  testID,
}) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [appRole, setAppRole] = useState<AppRole>('customer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    if (isSubmitting || isLoading) return;
    setIsSubmitting(true);
    
    await setDevIntendedRole(appRole);

    try {
      console.log(`[UnifiedAuthScreen] Form Submitted! Role: ${appRole}, Mode: ${authMode}`);
      
      if (formData.isPhone === false) {
        // Handle Email/Password login
        const email = formData.email || formData.emailOrPhone || formData.driverIdOrPhone;
        const password = formData.password;
        if (!email || !password) {
          throw new Error('Email and password are required');
        }
        await onLoginWithEmail(email, password);
        // Successful login will automatically navigate based on RootNavigator's onAuthStateChanged listener
      } else {
        // Handle Phone OTP
        let rawPhone = formData.phone || formData.emailOrPhone || formData.driverIdOrPhone;
        
        // Basic formatting for Indian numbers if they didn't add a country code
        let phoneToUse = rawPhone ? rawPhone.replace(/\D/g, '') : '5551234567';
        if (phoneToUse.length === 10) {
          phoneToUse = '+91' + phoneToUse;
        } else if (!rawPhone?.startsWith('+')) {
          phoneToUse = '+' + phoneToUse;
        } else {
          phoneToUse = rawPhone;
        }
        
        await onSendOtp(phoneToUse);
        navigation.navigate('OTPVerification', { phone: phoneToUse, intendedRole: appRole, authMode });
      }
    } catch (e: any) {
      console.log('[UnifiedAuthScreen] handleSubmit caught error:', e);
      // Let the user know why it failed instead of failing silently
      Alert.alert('Error', e.message || 'Failed to send OTP. Please check your number.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const SegmentedControl = ({ 
    options, 
    selectedValue, 
    onSelect 
  }: { 
    options: { label: string, value: string }[], 
    selectedValue: string, 
    onSelect: (val: any) => void 
  }) => (
    <View style={styles.segmentedControl}>
      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[styles.segmentButton, isSelected && styles.segmentButtonActive]}
            onPress={() => onSelect(opt.value)}
            disabled={isLoading || isSubmitting}
          >
            <Text style={[styles.segmentText, isSelected && styles.segmentTextActive]}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderForm = () => {
    if (appRole === 'customer') {
      if (authMode === 'signup') {
        return (
          <View style={styles.formContent}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join Pick Up to start your journey.</Text>
            <SegmentedControl 
              options={[
                { label: 'Customer', value: 'customer' },
                { label: 'Driver', value: 'driver' }
              ]} 
              selectedValue={appRole} 
              onSelect={setAppRole} 
            />
            <CustomerSignupForm 
              onSwitchToLogin={() => setAuthMode('login')} 
              onSubmit={handleSubmit} 
              isLoading={isLoading || isSubmitting} 
            />
          </View>
        );
      } else {
        return (
          <View style={styles.formContent}>

            <SegmentedControl 
              options={[
                { label: 'Customer', value: 'customer' },
                { label: 'Driver', value: 'driver' }
              ]} 
              selectedValue={appRole} 
              onSelect={setAppRole} 
            />
            <CustomerLoginForm 
              onSwitchToSignup={() => setAuthMode('signup')} 
              onSubmit={handleSubmit} 
              isLoading={isLoading || isSubmitting} 
            />
          </View>
        );
      }
    } else {
      if (authMode === 'signup') {
        return (
          <View style={styles.formContent}>
            <SegmentedControl 
              options={[
                { label: 'Customer', value: 'customer' },
                { label: 'Driver', value: 'driver' }
              ]} 
              selectedValue={appRole} 
              onSelect={setAppRole} 
            />
            <Text style={styles.title}>Apply to Drive</Text>
            <Text style={styles.subtitle}>Join our network of professional logistics partners.</Text>
            
            <View style={styles.card}>
              <DriverSignupForm 
                onSwitchToLogin={() => setAuthMode('login')} 
                onSubmit={handleSubmit} 
                isLoading={isLoading || isSubmitting} 
              />
            </View>
          </View>
        );
      } else {
        return (
          <View style={styles.formContent}>

            <Text style={styles.subtitle}>Welcome back. Please log in.</Text>
            
            <View style={styles.card}>
              <SegmentedControl 
                options={[
                  { label: 'Customer', value: 'customer' },
                  { label: 'Driver', value: 'driver' }
                ]} 
                selectedValue={appRole} 
                onSelect={setAppRole} 
              />
              <DriverLoginForm 
                onSubmit={handleSubmit} 
                isLoading={isLoading || isSubmitting} 
              />
            </View>
          </View>
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} testID={testID}>
      {/* Custom Top Header (Only show for signup forms with back button usually, but keeping simple for now) */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{authData.appName}</Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formArea}>
            {renderForm()}
          </View>

          {/* Footer Area */}
          {(authMode === 'signup' && appRole === 'driver') ? null : (
            <View style={styles.footerArea}>
              <Text style={styles.termsText}>
                By continuing, you agree to Pick Up's <Text style={styles.termsLink}>Terms of Service.</Text>
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
    backgroundColor: colors.surfaceContainerLowest,
  },
  headerTitle: {
    ...typography.headlineMd,
    color: colors.primary,
    fontWeight: '700',
  },
  keyboardContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.containerPadding,
  },
  formArea: {
    flex: 1,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  formContent: {
    gap: spacing.lg,
    alignItems: 'center',
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    width: '100%',
    gap: spacing.lg,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow, // Lighter gray like the design
    borderRadius: borderRadius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.surfaceVariant, // Very subtle border
    width: '100%',
  },
  segmentButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  segmentButtonActive: {
    backgroundColor: colors.surfaceContainerLowest, // White thumb
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    ...typography.labelSm,
    color: colors.onSurfaceVariant,
    fontWeight: '500',
  },
  segmentTextActive: {
    color: colors.onSurface,
    fontWeight: '600',
  },
  title: {
    ...typography.headlineLg,
    color: colors.onSurface,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  subtitle: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  footerArea: {
    paddingBottom: spacing.xxl,
    alignItems: 'center',
  },
  termsText: {
    ...typography.bodyMd,
    color: colors.onSurfaceVariant,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
  termsLink: {
    textDecorationLine: 'underline',
    color: colors.primary,
  },
});

export default UnifiedAuthScreen;
