import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { DriverProfile } from '../../types/user';
import { getAuth, signInWithPhoneNumber, signOut, onAuthStateChanged } from '@react-native-firebase/auth';
import type { ConfirmationResult, User } from '@react-native-firebase/auth';

export interface IAuthService {
  requestOtp(phone: string): Promise<void>;
  verifyOtp(phone: string, otp: string): Promise<{ token: string; isNewUser: boolean }>;
  loginWithEmail(email: string, password: string): Promise<{ token: string; isNewUser: boolean }>;
  completeOnboarding(vehicleId: string, language: string): Promise<{ driver: DriverProfile }>;
  getProfile(): Promise<DriverProfile>;
  logout(): Promise<void>;
  observeAuthState?(callback: (user: User | null) => void): () => void;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockAuthService implements IAuthService {
  async requestOtp(_phone: string): Promise<void> {
    await delay(1000);
  }

  async verifyOtp(_phone: string, otp: string): Promise<{ token: string; isNewUser: boolean }> {
    await delay(1000);
    if (otp === '123456') {
      return { token: 'mock-jwt-token', isNewUser: true };
    }
    throw new Error('Invalid OTP');
  }

  async loginWithEmail(email: string, _password: string): Promise<{ token: string; isNewUser: boolean }> {
    await delay(1000);
    if (email === 'test@example.com') {
      return { token: 'mock-jwt-token', isNewUser: false };
    }
    return { token: 'mock-jwt-token', isNewUser: true };
  }

  async completeOnboarding(_vehicleId: string, language: string): Promise<{ driver: DriverProfile }> {
    await delay(500);
    return {
      driver: {
        id: 'DRV-001',
        name: 'Rajesh Kumar',
        phone: '+91 9876543210',
        location: 'Mumbai, Maharashtra',
        profileCompletionPercent: 85,
        status: 'offline',
        language,
      }
    };
  }

  async getProfile(): Promise<DriverProfile> {
    await delay(500);
    return {
      id: 'DRV-001',
      name: 'Rajesh Kumar',
      phone: '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      profileCompletionPercent: 85,
      status: 'offline',
      language: 'en',
    };
  }

  async logout(): Promise<void> {
    await delay(300);
  }
}

export class ApiAuthService implements IAuthService {
  private client = ApiClient.getInstance();

  async requestOtp(phone: string): Promise<void> {
    await this.client.post('/auth/request-otp', { phone });
  }

  async verifyOtp(phone: string, otp: string): Promise<{ token: string; isNewUser: boolean }> {
    const response = await this.client.post<{ token: string; isNewUser: boolean }>('/auth/verify-otp', { phone, otp });
    this.client.setToken(response.token);
    return response;
  }

  async loginWithEmail(email: string, password: string): Promise<{ token: string; isNewUser: boolean }> {
    const response = await this.client.post<{ token: string; isNewUser: boolean }>('/auth/login', { email, password });
    this.client.setToken(response.token);
    return response;
  }

  async completeOnboarding(vehicleId: string, language: string): Promise<{ driver: DriverProfile }> {
    return this.client.post<{ driver: DriverProfile }>('/auth/onboard', { vehicleId, language });
  }

  async getProfile(): Promise<DriverProfile> {
    return this.client.get<DriverProfile>('/auth/me');
  }

  async logout(): Promise<void> {
    await this.client.post('/auth/logout');
    this.client.setToken(null);
  }
}

export class FirebaseAuthService implements IAuthService {
  private confirmation: ConfirmationResult | null = null;
  private isRequesting: boolean = false;

  async requestOtp(phone: string): Promise<void> {
    if (this.isRequesting) {
      console.log(`💥 [FirebaseAuthService] requestOtp already in progress, ignoring.`);
      throw new Error('Request already in progress');
    }
    this.isRequesting = true;
    console.log(`💥 [FirebaseAuthService] requestOtp entered`);
    const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`;
    console.log(`💥 [FirebaseAuthService] formatted phone: ${formattedPhone.replace(/.(?=.{4})/g, '*')}`);
    
    console.log(`💥 [FirebaseAuthService] calling getAuth()`);
    const auth = getAuth();
    
    console.log(`💥 [FirebaseAuthService] calling signInWithPhoneNumber`);
    try {
      this.confirmation = await signInWithPhoneNumber(auth, formattedPhone);
      console.log(`💥 [FirebaseAuthService] ConfirmationResult received successfully`);
    } catch (e: any) {
      console.log(`💥 [FirebaseAuthService] Exception caught in signInWithPhoneNumber:`, e);
      throw e;
    } finally {
      this.isRequesting = false;
    }
  }

  async verifyOtp(_phone: string, otp: string): Promise<{ token: string; isNewUser: boolean }> {
    if (!this.confirmation) {
      throw new Error('No OTP request found');
    }
    
    console.log(`[OTP DEBUG] Firebase confirmation started`);
    console.log(`💥 [FirebaseAuthService] verifyOtp entered`);
    console.log(`💥 [FirebaseAuthService] ConfirmationResult exists for this session`);
    console.log(`💥 [FirebaseAuthService] calling confirmation.confirm() started`);
    
    try {
      const userCredential = await this.confirmation.confirm(otp);
      
      console.log(`[OTP DEBUG] Firebase confirmation succeeded`);
      console.log(`💥 [FirebaseAuthService] confirmation.confirm() succeeded`);
      const uid = userCredential.user?.uid;
      console.log(`💥 [FirebaseAuthService] Authenticated Firebase User UID: ${uid ? uid.substring(0, 4) + '***' : 'unknown'}`);
      
      // In the future, we would send getAuth().currentUser?.getIdToken() to our backend here.
      return { token: 'firebase-jwt-token', isNewUser: true };
    } catch (e: any) {
      console.log(`💥 [FirebaseAuthService] Exception caught in confirm():`, e);
      throw e;
    }
  }

  async loginWithEmail(email: string, password: string): Promise<{ token: string; isNewUser: boolean }> {
    console.log(`💥 [FirebaseAuthService] loginWithEmail entered`);
    const auth = getAuth();
    
    try {
      // We need to import signInWithEmailAndPassword at the top of the file, let's just use it off the auth object if possible
      // Actually, since React Native Firebase uses the auth instance for methods, it's:
      const { signInWithEmailAndPassword } = require('@react-native-firebase/auth');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      console.log(`💥 [FirebaseAuthService] Email login succeeded`);
      const uid = userCredential.user?.uid;
      console.log(`💥 [FirebaseAuthService] Authenticated Firebase User UID: ${uid ? uid.substring(0, 4) + '***' : 'unknown'}`);
      
      return { token: 'firebase-jwt-token', isNewUser: false };
    } catch (e: any) {
      console.log(`💥 [FirebaseAuthService] Exception caught in loginWithEmail:`, e);
      throw e;
    }
  }

  async completeOnboarding(vehicleId: string, language: string): Promise<{ driver: DriverProfile }> {
    await delay(500);
    const auth = getAuth();
    return {
      driver: {
        id: auth.currentUser?.uid || 'DRV-001',
        name: 'Rajesh Kumar', 
        phone: auth.currentUser?.phoneNumber || '+91 9876543210',
        location: 'Mumbai, Maharashtra',
        profileCompletionPercent: 100, 
        status: 'offline',
        language,
      }
    };
  }

  async getProfile(): Promise<DriverProfile> {
    await delay(500);
    const auth = getAuth();
    return {
      id: auth.currentUser?.uid || 'DRV-001',
      name: 'Rajesh Kumar',
      phone: auth.currentUser?.phoneNumber || '+91 9876543210',
      location: 'Mumbai, Maharashtra',
      profileCompletionPercent: 0, 
      status: 'offline',
      language: 'en',
    };
  }

  async logout(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
  }

  observeAuthState(callback: (user: User | null) => void): () => void {
    const auth = getAuth();
    return onAuthStateChanged(auth, callback);
  }
}

export class AuthService {
  private static instance: IAuthService;

  static getInstance(): IAuthService {
    console.log(`💥 [AuthService] getInstance() entered. env.IS_MOCK_MODE = ${env.IS_MOCK_MODE}`);
    if (!AuthService.instance) {
      console.log(`💥 [AuthService] Creating new FirebaseAuthService instance (FORCED)`);
      AuthService.instance = new FirebaseAuthService();
    }
    console.log(`💥 [AuthService] Returning instance of ${AuthService.instance.constructor.name}`);
    return AuthService.instance;
  }
}


