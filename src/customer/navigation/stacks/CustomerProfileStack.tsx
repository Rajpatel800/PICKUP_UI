import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import ChangeProfilePhotoScreen from '../../screens/profile/ChangeProfilePhotoScreen';
import CreateProfileScreen from '../../screens/profile/CreateProfileScreen';
import CustomerSettingsScreen from '../../screens/profile/CustomerSettingsScreen';
import EditProfileScreen from '../../screens/profile/EditProfileScreen';
import HistoricalTripDetailScreen from '../../screens/profile/HistoricalTripDetailScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import SavedAddressesScreen from '../../screens/profile/SavedAddressesScreen';
import TripHistoryScreen from '../../screens/profile/TripHistoryScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerProfileStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChangeProfilePhotoScreen" component={ChangeProfilePhotoScreen} />
      <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
      <Stack.Screen name="CustomerSettingsScreen" component={CustomerSettingsScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="HistoricalTripDetailScreen" component={HistoricalTripDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="SavedAddressesScreen" component={SavedAddressesScreen} />
      <Stack.Screen name="TripHistoryScreen" component={TripHistoryScreen} />
    </Stack.Navigator>
  );
};
