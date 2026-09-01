import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import CurrentDropDetailsScreen from '../../screens/logistics/CurrentDropDetailsScreen';
import DropCompletedStateScreen from '../../screens/logistics/DropCompletedStateScreen';
import DropOtpVerificationScreen from '../../screens/logistics/DropOtpVerificationScreen';
import FinalDeliverySummaryScreen from '../../screens/logistics/FinalDeliverySummaryScreen';
import GoodsDetailsScreen from '../../screens/logistics/GoodsDetailsScreen';
import GoodsInsuranceScreen from '../../screens/logistics/GoodsInsuranceScreen';
import MultiDropOverviewScreen from '../../screens/logistics/MultiDropOverviewScreen';
import MultiDropProgressScreen from '../../screens/logistics/MultiDropProgressScreen';
import NextDropScreen from '../../screens/logistics/NextDropScreen';
import PickupOtpVerificationScreen from '../../screens/logistics/PickupOtpVerificationScreen';
import PickupVerifiedSuccessScreen from '../../screens/logistics/PickupVerifiedSuccessScreen';
import ReceiverDetailsScreen from '../../screens/logistics/ReceiverDetailsScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerLogisticsStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CurrentDropDetailsScreen" component={CurrentDropDetailsScreen} />
      <Stack.Screen name="DropCompletedStateScreen" component={DropCompletedStateScreen} />
      <Stack.Screen name="DropOtpVerificationScreen" component={DropOtpVerificationScreen} />
      <Stack.Screen name="FinalDeliverySummaryScreen" component={FinalDeliverySummaryScreen} />
      <Stack.Screen name="GoodsDetailsScreen" component={GoodsDetailsScreen} />
      <Stack.Screen name="GoodsInsuranceScreen" component={GoodsInsuranceScreen} />
      <Stack.Screen name="MultiDropOverviewScreen" component={MultiDropOverviewScreen} />
      <Stack.Screen name="MultiDropProgressScreen" component={MultiDropProgressScreen} />
      <Stack.Screen name="NextDropScreen" component={NextDropScreen} />
      <Stack.Screen name="PickupOtpVerificationScreen" component={PickupOtpVerificationScreen} />
      <Stack.Screen name="PickupVerifiedSuccessScreen" component={PickupVerifiedSuccessScreen} />
      <Stack.Screen name="ReceiverDetailsScreen" component={ReceiverDetailsScreen} />
    </Stack.Navigator>
  );
};
