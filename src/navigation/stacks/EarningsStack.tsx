import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { EarningsStackParamList } from '../../types/navigation';

import { EarningsHistoryScreen } from '../../screens/earnings/EarningsHistoryScreen';
import { TripEarningsDetailScreen } from '../../screens/earnings/TripEarningsDetailScreen';

const Stack = createNativeStackNavigator<EarningsStackParamList>();

export const EarningsStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="EarningsHistory" component={EarningsHistoryScreen} />
      <Stack.Screen name="TripEarningsDetail" component={TripEarningsDetailScreen} />
    </Stack.Navigator>
  );
};

export default EarningsStack;
