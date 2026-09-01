import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import ActiveTripTrackingScreen from '../../screens/tracking/ActiveTripTrackingScreen';
import CustomerLiveTrackingScreen from '../../screens/tracking/CustomerLiveTrackingScreen';
import DriverAssignedExpandedScreen from '../../screens/tracking/DriverAssignedExpandedScreen';
import DriverAssignedScreen from '../../screens/tracking/DriverAssignedScreen';
import DriverFoundScreen from '../../screens/tracking/DriverFoundScreen';
import FindingDriverScreen from '../../screens/tracking/FindingDriverScreen';
import LiveTrackingExceptionsScreen from '../../screens/tracking/LiveTrackingExceptionsScreen';
import LiveTrackingScreen from '../../screens/tracking/LiveTrackingScreen';
import MapLoadingScreen from '../../screens/tracking/MapLoadingScreen';
import ReconnectingScreen from '../../screens/tracking/ReconnectingScreen';
import SearchingDriverScreen from '../../screens/tracking/SearchingDriverScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerTrackingStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActiveTripTrackingScreen" component={ActiveTripTrackingScreen} />
      <Stack.Screen name="CustomerLiveTrackingScreen" component={CustomerLiveTrackingScreen} />
      <Stack.Screen name="DriverAssignedExpandedScreen" component={DriverAssignedExpandedScreen} />
      <Stack.Screen name="DriverAssignedScreen" component={DriverAssignedScreen} />
      <Stack.Screen name="DriverFoundScreen" component={DriverFoundScreen} />
      <Stack.Screen name="FindingDriverScreen" component={FindingDriverScreen} />
      <Stack.Screen name="LiveTrackingExceptionsScreen" component={LiveTrackingExceptionsScreen} />
      <Stack.Screen name="LiveTrackingScreen" component={LiveTrackingScreen} />
      <Stack.Screen name="MapLoadingScreen" component={MapLoadingScreen} />
      <Stack.Screen name="ReconnectingScreen" component={ReconnectingScreen} />
      <Stack.Screen name="SearchingDriverScreen" component={SearchingDriverScreen} />
    </Stack.Navigator>
  );
};
