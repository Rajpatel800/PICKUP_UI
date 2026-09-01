import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import HomeScreen from '../../screens/home/HomeScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerHomeStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
