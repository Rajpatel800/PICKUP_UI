/**
 * @file devRoleResolver.ts
 * 
 * ============================================================
 * ⚠️ DEVELOPMENT ONLY - DO NOT USE IN PRODUCTION ⚠️
 * ============================================================
 * 
 * This file is a temporary development mock used to route users
 * in Phase 3A before the actual backend profile/role system is built.
 * 
 * It takes the Firebase UID and the UI-selected intended role and 
 * fakes a resolution.
 * 
 * Future replacement point:
 * This must be replaced by a trusted backend profile lookup
 * inside the RootNavigator/AuthService layer. The UI intent must 
 * never be treated as production authorization.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const DEV_ROLE_KEY = '@dev_intended_role';

/**
 * Temporarily stores the intended role during the auth flow.
 * In a real app, this might be passed strictly via navigation params,
 * but storing it here for the dev resolver makes it easy to wipe out for production.
 */
export const setDevIntendedRole = async (role: 'customer' | 'driver') => {
  if (__DEV__) {
    await AsyncStorage.setItem(DEV_ROLE_KEY, role);
  }
};

/**
 * Resolves the role for the authenticated UID.
 * STRICTLY DEVELOPMENT ONLY.
 */
export const resolveDevRole = async (uid: string): Promise<'customer' | 'driver'> => {
  if (!__DEV__) {
    console.warn('⚠️ resolveDevRole called in production. This is a DEV ONLY utility.');
    return 'driver';
  }

  try {
    const role = await AsyncStorage.getItem(DEV_ROLE_KEY);
    return (role as 'customer' | 'driver') || 'driver';
  } catch (e) {
    console.warn('⚠️ Failed to read dev role from AsyncStorage', e);
    return 'driver';
  }
};
