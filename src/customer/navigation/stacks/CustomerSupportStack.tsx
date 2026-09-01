import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from '../types';

import ActiveTripChatScreen from '../../screens/support/ActiveTripChatScreen';
import AssignmentFailedScreen from '../../screens/support/AssignmentFailedScreen';
import CallDriverScreen from '../../screens/support/CallDriverScreen';
import CancellationChargeConfirmationScreen from '../../screens/support/CancellationChargeConfirmationScreen';
import CancellationConfirmationScreen from '../../screens/support/CancellationConfirmationScreen';
import CancellationReasonScreen from '../../screens/support/CancellationReasonScreen';
import CancellationResultScreen from '../../screens/support/CancellationResultScreen';
import DriverRatingScreen from '../../screens/support/DriverRatingScreen';
import EmptyStateScreen from '../../screens/support/EmptyStateScreen';
import ErrorScreen from '../../screens/support/ErrorScreen';
import LoadingSkeletonScreen from '../../screens/support/LoadingSkeletonScreen';
import NetworkErrorScreen from '../../screens/support/NetworkErrorScreen';
import NoDriversAvailableScreen from '../../screens/support/NoDriversAvailableScreen';
import NotificationCenterScreen from '../../screens/support/NotificationCenterScreen';
import RouteUnavailableScreen from '../../screens/support/RouteUnavailableScreen';
import SearchUnavailableScreen from '../../screens/support/SearchUnavailableScreen';
import ShareTrackingSheetScreen from '../../screens/support/ShareTrackingSheetScreen';
import TripCancelledStatusScreen from '../../screens/support/TripCancelledStatusScreen';
import TripCompletedScreen from '../../screens/support/TripCompletedScreen';
import TripCompletedSummaryScreen from '../../screens/support/TripCompletedSummaryScreen';
import WrittenReviewScreen from '../../screens/support/WrittenReviewScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerSupportStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ActiveTripChatScreen" component={ActiveTripChatScreen} />
      <Stack.Screen name="AssignmentFailedScreen" component={AssignmentFailedScreen} />
      <Stack.Screen name="CallDriverScreen" component={CallDriverScreen} />
      <Stack.Screen name="CancellationChargeConfirmationScreen" component={CancellationChargeConfirmationScreen} />
      <Stack.Screen name="CancellationConfirmationScreen" component={CancellationConfirmationScreen} />
      <Stack.Screen name="CancellationReasonScreen" component={CancellationReasonScreen} />
      <Stack.Screen name="CancellationResultScreen" component={CancellationResultScreen} />
      <Stack.Screen name="DriverRatingScreen" component={DriverRatingScreen} />
      <Stack.Screen name="EmptyStateScreen">
        {(props) => <EmptyStateScreen {...props} title="Empty" description="Nothing here." />}
      </Stack.Screen>
      <Stack.Screen name="ErrorScreen">
        {(props) => <ErrorScreen {...props} variant="serverUnavailable" />}
      </Stack.Screen>
      <Stack.Screen name="LoadingSkeletonScreen" component={LoadingSkeletonScreen} />
      <Stack.Screen name="NetworkErrorScreen" component={NetworkErrorScreen} />
      <Stack.Screen name="NoDriversAvailableScreen" component={NoDriversAvailableScreen} />
      <Stack.Screen name="NotificationCenterScreen" component={NotificationCenterScreen} />
      <Stack.Screen name="RouteUnavailableScreen" component={RouteUnavailableScreen} />
      <Stack.Screen name="SearchUnavailableScreen" component={SearchUnavailableScreen} />
      <Stack.Screen name="ShareTrackingSheetScreen" component={ShareTrackingSheetScreen} />
      <Stack.Screen name="TripCancelledStatusScreen" component={TripCancelledStatusScreen} />
      <Stack.Screen name="TripCompletedScreen" component={TripCompletedScreen} />
      <Stack.Screen name="TripCompletedSummaryScreen" component={TripCompletedSummaryScreen} />
      <Stack.Screen name="WrittenReviewScreen" component={WrittenReviewScreen} />
    </Stack.Navigator>
  );
};
