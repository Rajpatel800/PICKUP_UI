import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import CashPaymentStatusScreen from '../../screens/payment/CashPaymentStatusScreen';
import DigitalReceiptScreen from '../../screens/payment/DigitalReceiptScreen';
import PaymentConfirmationScreen from '../../screens/payment/PaymentConfirmationScreen';
import PaymentFailedScreen from '../../screens/payment/PaymentFailedScreen';
import PaymentMethodScreen from '../../screens/payment/PaymentMethodScreen';
import PaymentMethodSelectedScreen from '../../screens/payment/PaymentMethodSelectedScreen';
import PaymentPendingScreen from '../../screens/payment/PaymentPendingScreen';
import PaymentProcessingScreen from '../../screens/payment/PaymentProcessingScreen';
import PaymentSelectionScreen from '../../screens/payment/PaymentSelectionScreen';
import PaymentSuccessfulScreen from '../../screens/payment/PaymentSuccessfulScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerPaymentStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CashPaymentStatusScreen" component={CashPaymentStatusScreen} />
      <Stack.Screen name="DigitalReceiptScreen" component={DigitalReceiptScreen} />
      <Stack.Screen name="PaymentConfirmationScreen" component={PaymentConfirmationScreen} />
      <Stack.Screen name="PaymentFailedScreen" component={PaymentFailedScreen} />
      <Stack.Screen name="PaymentMethodScreen" component={PaymentMethodScreen} />
      <Stack.Screen name="PaymentMethodSelectedScreen" component={PaymentMethodSelectedScreen} />
      <Stack.Screen name="PaymentPendingScreen" component={PaymentPendingScreen} />
      <Stack.Screen name="PaymentProcessingScreen" component={PaymentProcessingScreen} />
      <Stack.Screen name="PaymentSelectionScreen" component={PaymentSelectionScreen} />
      <Stack.Screen name="PaymentSuccessfulScreen" component={PaymentSuccessfulScreen} />
    </Stack.Navigator>
  );
};
