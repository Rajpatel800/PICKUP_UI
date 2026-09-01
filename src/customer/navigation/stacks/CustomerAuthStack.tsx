import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import LogoutConfirmationScreen from '../../screens/auth/LogoutConfirmationScreen';
import OtpVerificationScreen from '../../screens/auth/OtpVerificationScreen';
import PermissionScreen from '../../screens/auth/PermissionScreen';
import RecordingConsentScreen from '../../screens/auth/RecordingConsentScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerAuthStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogoutConfirmationScreen" component={LogoutConfirmationScreen} />
      <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
      <Stack.Screen name="PermissionScreen">
        {(props) => <PermissionScreen {...props} variant="location" />}
      </Stack.Screen>
      <Stack.Screen name="RecordingConsentScreen" component={RecordingConsentScreen} />
    </Stack.Navigator>
  );
};
