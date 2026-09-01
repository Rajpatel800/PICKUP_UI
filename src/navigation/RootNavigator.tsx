import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { AuthStack } from './stacks/AuthStack';
import { MainTabNavigator } from './MainTabNavigator';
import { AuthService } from '../services/auth/AuthService';
import { CustomerNavigator } from '../customer/navigation/CustomerNavigator';
import { resolveDevRole } from '../utils/devRoleResolver';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRole, setActiveRole] = useState<'customer' | 'driver'>('driver');
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  useEffect(() => {
    const authService = AuthService.getInstance();
    
    // observeAuthState handles Firebase auth state changes
    if (authService.observeAuthState) {
      const unsubscribe = authService.observeAuthState(async (user) => {
        console.log(`[OTP DEBUG] auth state changed: user exists? ${!!user}`);
        if (user) {
          console.log(`[OTP DEBUG] Firebase UID: ${user.uid.substring(0,4)}***`);
          setIsAuthenticated(true);
          
          // --- DEVELOPMENT ONLY ROLE RESOLUTION ---
          console.log(`[OTP DEBUG] resolving dev role...`);
          const role = await resolveDevRole(user.uid);
          console.log(`[OTP DEBUG] role resolver result: ${role}`);
          setActiveRole(role);
          
          if (role === 'driver') {
            // Load driver/profile state
            try {
              const profile = await authService.getProfile();
              setOnboardingComplete(profile.profileCompletionPercent === 100);
              console.log(`[OTP DEBUG] RootNavigator auth state: Driver, onboardingComplete: ${profile.profileCompletionPercent === 100}`);
            } catch (e) {
              // Profile not found or error, default to incomplete
              setOnboardingComplete(false);
              console.log(`[OTP DEBUG] RootNavigator auth state: Driver, onboardingComplete: false (profile error)`);
            }
          } else {
            // For customer, onboarding logic doesn't apply the same way right now
            setOnboardingComplete(true);
            console.log(`[OTP DEBUG] RootNavigator auth state: Customer, onboardingComplete: true`);
          }
        } else {
          setIsAuthenticated(false);
          setActiveRole('driver');
          setOnboardingComplete(false);
        }
        
        if (initializing) {
          setInitializing(false);
        }
      });
      return unsubscribe;
    } else {
      // Mock mode without observeAuthState
      setInitializing(false);
      return () => {};
    }
  }, [initializing]);

  if (initializing) {
    return null; // Don't render until Firebase auth state is determined
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <Stack.Screen name="Auth">
          {() => {
            console.log(`[OTP DEBUG] rendering Auth stack (unauthenticated)`);
            return (
              <AuthStack 
                initialRouteName="UnifiedAuth"
                onAuthComplete={() => setOnboardingComplete(true)} 
              />
            );
          }}
        </Stack.Screen>
      ) : activeRole === 'customer' ? (
        <Stack.Screen name="CustomerMain" component={CustomerNavigator} />
      ) : onboardingComplete ? (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      ) : (
        <Stack.Screen name="Onboarding">
          {() => {
            console.log(`[OTP DEBUG] rendering Onboarding stack (initialRouteName=LanguageSelection)`);
            return (
              <AuthStack 
                initialRouteName="LanguageSelection"
                onAuthComplete={() => setOnboardingComplete(true)} 
              />
            );
          }}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
