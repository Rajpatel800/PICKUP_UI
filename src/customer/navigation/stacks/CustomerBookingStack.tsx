import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import AddressSearchScreen from '../../screens/booking/AddressSearchScreen';
import BookingConfirmedScreen from '../../screens/booking/BookingConfirmedScreen';
import BookingReviewScreen from '../../screens/booking/BookingReviewScreen';
import DeclaredValueSelectionScreen from '../../screens/booking/DeclaredValueSelectionScreen';
import FareEstimateScreen from '../../screens/booking/FareEstimateScreen';
import ReviewBookingScreen from '../../screens/booking/ReviewBookingScreen';
import SelectDropLocationScreen from '../../screens/booking/SelectDropLocationScreen';
import SelectLocationScreen from '../../screens/booking/SelectLocationScreen';
import SelectVehicleScreen from '../../screens/booking/SelectVehicleScreen';
import ValidateBookingScreen from '../../screens/booking/ValidateBookingScreen';
import VehicleSelectionScreen from '../../screens/booking/VehicleSelectionScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerBookingStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddressSearchScreen" component={AddressSearchScreen} />
      <Stack.Screen name="BookingConfirmedScreen" component={BookingConfirmedScreen} />
      <Stack.Screen name="BookingReviewScreen" component={BookingReviewScreen} />
      <Stack.Screen name="DeclaredValueSelectionScreen" component={DeclaredValueSelectionScreen} />
      <Stack.Screen name="FareEstimateScreen" component={FareEstimateScreen} />
      <Stack.Screen name="ReviewBookingScreen" component={ReviewBookingScreen} />
      <Stack.Screen name="SelectDropLocationScreen" component={SelectDropLocationScreen} />
      <Stack.Screen name="SelectLocationScreen" component={SelectLocationScreen} />
      <Stack.Screen name="SelectVehicleScreen" component={SelectVehicleScreen} />
      <Stack.Screen name="ValidateBookingScreen" component={ValidateBookingScreen} />
      <Stack.Screen name="VehicleSelectionScreen" component={VehicleSelectionScreen} />
    </Stack.Navigator>
  );
};
