import { useState, useCallback, useRef } from 'react';
import type { DriverProfile } from '../types/user';
import { AuthService } from '../services/auth/AuthService';

export type AuthState = 'unauthenticated' | 'otp_sent' | 'authenticated' | 'onboarding';

export interface UseAuthResult {
  readonly authState: AuthState;
  readonly phone: string;
  readonly driver: DriverProfile | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly setPhone: (phone: string) => void;
  readonly sendOtp: (phone: string) => Promise<void>;
  readonly verifyOtp: (otp: string) => Promise<boolean>;
  readonly loginWithEmail: (email: string, password: string) => Promise<boolean>;
  readonly resendOtp: () => Promise<void>;
  readonly completeOnboarding: (vehicleId: string, language: string) => Promise<void>;
  readonly logout: () => Promise<void>;
}

/**
 * Auth hook managing the login flow.
 */
export function useAuth(): UseAuthResult {
  const isRequestingOtp = useRef<boolean>(false);
  const [authState, setAuthState] = useState<AuthState>('unauthenticated');
  const [phone, setPhone] = useState('');
  const [driver, setDriver] = useState<DriverProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendOtp = useCallback(async (phoneNumber: string) => {
    if (isRequestingOtp.current) {
      console.log(`💥 [useAuth] sendOtp ignored because request is already in progress`);
      throw new Error('Request already in progress');
    }
    isRequestingOtp.current = true;
    setIsLoading(true);
    setError(null);
    setPhone(phoneNumber);
    try {
      console.log(`💥 [useAuth] sendOtp entered`);
      console.log(`💥 [useAuth] sendOtp called with phone: ${phoneNumber.replace(/.(?=.{4})/g, '*')}`);
      
      console.log(`💥 [useAuth] calling AuthService.getInstance()`);
      const authService = AuthService.getInstance();
      
      console.log(`💥 [useAuth] authService instance obtained:`, authService.constructor?.name);
      console.log(`💥 [useAuth] calling authService.requestOtp`);
      
      await authService.requestOtp(phoneNumber);
      
      console.log(`💥 [useAuth] requestOtp promise resolved successfully`);
      setAuthState('otp_sent');
    } catch (e: any) {
      console.log(`💥 [useAuth] sendOtp caught exception:`, e);
      setError('Failed to send OTP. Please try again.');
      throw e;
    } finally {
      isRequestingOtp.current = false;
      setIsLoading(false);
    }
  }, []);

  const verifyOtp = useCallback(async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.getInstance().verifyOtp(phone, otp);
      setAuthState('onboarding');
      return true;
    } catch (e) {
      setError('Verification failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [phone]);

  const loginWithEmail = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.getInstance().loginWithEmail(email, password);
      // Firebase's onAuthStateChanged will handle the authState transition 
      // via RootNavigator when authentication succeeds.
      return true;
    } catch (e: any) {
      setError(e.message || 'Login failed. Please check your credentials.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);


  const resendOtp = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.getInstance().requestOtp(phone);
    } catch (e) {
      setError('Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  }, [phone]);

  const completeOnboarding = useCallback(async (vehicleId: string, language: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { driver } = await AuthService.getInstance().completeOnboarding(vehicleId, language);
      setDriver(driver);
      setAuthState('authenticated');
    } catch (e) {
      setError('Failed to complete onboarding.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await AuthService.getInstance().logout();
      setAuthState('unauthenticated');
      setPhone('');
      setDriver(null);
    } catch (e) {
      setError('Logout failed.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    authState,
    phone,
    driver,
    isLoading,
    error,
    setPhone,
    sendOtp,
    verifyOtp,
    loginWithEmail,
    resendOtp,
    completeOnboarding,
    logout,
  };
}
