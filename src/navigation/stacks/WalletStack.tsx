import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { WalletStackParamList } from '../../types/navigation';

import { DriverWalletScreen } from '../../screens/wallet/DriverWalletScreen';
import { RechargeScreen } from '../../screens/wallet/RechargeScreen';
import { RechargeProcessingScreen } from '../../screens/wallet/RechargeProcessingScreen';
import { RechargeResultScreen } from '../../screens/wallet/RechargeResultScreen';
import { TransactionHistoryScreen } from '../../screens/wallet/TransactionHistoryScreen';

const Stack = createNativeStackNavigator<WalletStackParamList>();

export const WalletStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="DriverWallet" component={DriverWalletScreen} />
      <Stack.Screen name="Recharge" component={RechargeScreen} />
      <Stack.Screen
        name="RechargeProcessing"
        component={RechargeProcessingScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen
        name="RechargeResult"
        component={RechargeResultScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
    </Stack.Navigator>
  );
};

export default WalletStack;
