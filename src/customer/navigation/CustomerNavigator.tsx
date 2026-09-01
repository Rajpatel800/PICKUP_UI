import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomerRootStackParamList } from './types';
import { BookingProvider } from '../state/BookingContext';

import LogoutConfirmationScreen from '../screens/auth/LogoutConfirmationScreen';
import OtpVerificationScreen from '../screens/auth/OtpVerificationScreen';
import PermissionScreen from '../screens/auth/PermissionScreen';
import RecordingConsentScreen from '../screens/auth/RecordingConsentScreen';
import AddressSearchScreen from '../screens/booking/AddressSearchScreen';
import BookingConfirmedScreen from '../screens/booking/BookingConfirmedScreen';
import BookingReviewScreen from '../screens/booking/BookingReviewScreen';
import DeclaredValueSelectionScreen from '../screens/booking/DeclaredValueSelectionScreen';
import FareEstimateScreen from '../screens/booking/FareEstimateScreen';
import ReviewBookingScreen from '../screens/booking/ReviewBookingScreen';
import SelectDropLocationScreen from '../screens/booking/SelectDropLocationScreen';
import SelectLocationScreen from '../screens/booking/SelectLocationScreen';
import SelectVehicleScreen from '../screens/booking/SelectVehicleScreen';
import ValidateBookingScreen from '../screens/booking/ValidateBookingScreen';
import VehicleSelectionScreen from '../screens/booking/VehicleSelectionScreen';
import HomeScreen from '../screens/home/HomeScreen';
import CurrentDropDetailsScreen from '../screens/logistics/CurrentDropDetailsScreen';
import DropCompletedStateScreen from '../screens/logistics/DropCompletedStateScreen';
import DropOtpVerificationScreen from '../screens/logistics/DropOtpVerificationScreen';
import FinalDeliverySummaryScreen from '../screens/logistics/FinalDeliverySummaryScreen';
import GoodsDetailsScreen from '../screens/logistics/GoodsDetailsScreen';
import GoodsInsuranceScreen from '../screens/logistics/GoodsInsuranceScreen';
import MultiDropOverviewScreen from '../screens/logistics/MultiDropOverviewScreen';
import MultiDropProgressScreen from '../screens/logistics/MultiDropProgressScreen';
import NextDropScreen from '../screens/logistics/NextDropScreen';
import PickupOtpVerificationScreen from '../screens/logistics/PickupOtpVerificationScreen';
import PickupVerifiedSuccessScreen from '../screens/logistics/PickupVerifiedSuccessScreen';
import ReceiverDetailsScreen from '../screens/logistics/ReceiverDetailsScreen';
import CashPaymentStatusScreen from '../screens/payment/CashPaymentStatusScreen';
import DigitalReceiptScreen from '../screens/payment/DigitalReceiptScreen';
import PaymentConfirmationScreen from '../screens/payment/PaymentConfirmationScreen';
import PaymentFailedScreen from '../screens/payment/PaymentFailedScreen';
import PaymentMethodScreen from '../screens/payment/PaymentMethodScreen';
import PaymentMethodSelectedScreen from '../screens/payment/PaymentMethodSelectedScreen';
import PaymentPendingScreen from '../screens/payment/PaymentPendingScreen';
import PaymentProcessingScreen from '../screens/payment/PaymentProcessingScreen';
import PaymentSelectionScreen from '../screens/payment/PaymentSelectionScreen';
import PaymentSuccessfulScreen from '../screens/payment/PaymentSuccessfulScreen';
import ChangeProfilePhotoScreen from '../screens/profile/ChangeProfilePhotoScreen';
import CreateProfileScreen from '../screens/profile/CreateProfileScreen';
import CustomerSettingsScreen from '../screens/profile/CustomerSettingsScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import HistoricalTripDetailScreen from '../screens/profile/HistoricalTripDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SavedAddressesScreen from '../screens/profile/SavedAddressesScreen';
import TripHistoryScreen from '../screens/profile/TripHistoryScreen';
import ActiveTripChatScreen from '../screens/support/ActiveTripChatScreen';
import AssignmentFailedScreen from '../screens/support/AssignmentFailedScreen';
import CallDriverScreen from '../screens/support/CallDriverScreen';
import CancellationChargeConfirmationScreen from '../screens/support/CancellationChargeConfirmationScreen';
import CancellationConfirmationScreen from '../screens/support/CancellationConfirmationScreen';
import CancellationReasonScreen from '../screens/support/CancellationReasonScreen';
import CancellationResultScreen from '../screens/support/CancellationResultScreen';
import DriverRatingScreen from '../screens/support/DriverRatingScreen';
import EmptyStateScreen from '../screens/support/EmptyStateScreen';
import ErrorScreen from '../screens/support/ErrorScreen';
import LoadingSkeletonScreen from '../screens/support/LoadingSkeletonScreen';
import NetworkErrorScreen from '../screens/support/NetworkErrorScreen';
import NoDriversAvailableScreen from '../screens/support/NoDriversAvailableScreen';
import NotificationCenterScreen from '../screens/support/NotificationCenterScreen';
import RouteUnavailableScreen from '../screens/support/RouteUnavailableScreen';
import SearchUnavailableScreen from '../screens/support/SearchUnavailableScreen';
import ShareTrackingSheetScreen from '../screens/support/ShareTrackingSheetScreen';
import TripCancelledStatusScreen from '../screens/support/TripCancelledStatusScreen';
import TripCompletedScreen from '../screens/support/TripCompletedScreen';
import TripCompletedSummaryScreen from '../screens/support/TripCompletedSummaryScreen';
import WrittenReviewScreen from '../screens/support/WrittenReviewScreen';
import ActiveTripTrackingScreen from '../screens/tracking/ActiveTripTrackingScreen';
import CustomerLiveTrackingScreen from '../screens/tracking/CustomerLiveTrackingScreen';
import DriverAssignedExpandedScreen from '../screens/tracking/DriverAssignedExpandedScreen';
import DriverAssignedScreen from '../screens/tracking/DriverAssignedScreen';
import DriverFoundScreen from '../screens/tracking/DriverFoundScreen';
import FindingDriverScreen from '../screens/tracking/FindingDriverScreen';
import LiveTrackingExceptionsScreen from '../screens/tracking/LiveTrackingExceptionsScreen';
import LiveTrackingScreen from '../screens/tracking/LiveTrackingScreen';
import MapLoadingScreen from '../screens/tracking/MapLoadingScreen';
import ReconnectingScreen from '../screens/tracking/ReconnectingScreen';
import SearchingDriverScreen from '../screens/tracking/SearchingDriverScreen';

const Stack = createNativeStackNavigator<CustomerRootStackParamList>();

export const CustomerNavigator: React.FC = () => {
  return (
    <BookingProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="HomeScreen">
        <Stack.Screen name="LogoutConfirmationScreen" component={LogoutConfirmationScreen} />
        <Stack.Screen name="OtpVerificationScreen" component={OtpVerificationScreen} />
        <Stack.Screen name="PermissionScreen">
          {props => <PermissionScreen {...props} variant="location" />}
        </Stack.Screen>
        <Stack.Screen name="RecordingConsentScreen" component={RecordingConsentScreen} />
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
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
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
        <Stack.Screen name="ChangeProfilePhotoScreen" component={ChangeProfilePhotoScreen} />
        <Stack.Screen name="CreateProfileScreen" component={CreateProfileScreen} />
        <Stack.Screen name="CustomerSettingsScreen" component={CustomerSettingsScreen} />
        <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
        <Stack.Screen name="HistoricalTripDetailScreen" component={HistoricalTripDetailScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SavedAddressesScreen" component={SavedAddressesScreen} />
        <Stack.Screen name="TripHistoryScreen" component={TripHistoryScreen} />
        <Stack.Screen name="ActiveTripChatScreen" component={ActiveTripChatScreen} />
        <Stack.Screen name="AssignmentFailedScreen" component={AssignmentFailedScreen} />
        <Stack.Screen name="CallDriverScreen" component={CallDriverScreen} />
        <Stack.Screen name="CancellationChargeConfirmationScreen" component={CancellationChargeConfirmationScreen} />
        <Stack.Screen name="CancellationConfirmationScreen" component={CancellationConfirmationScreen} />
        <Stack.Screen name="CancellationReasonScreen" component={CancellationReasonScreen} />
        <Stack.Screen name="CancellationResultScreen" component={CancellationResultScreen} />
        <Stack.Screen name="DriverRatingScreen" component={DriverRatingScreen} />
        <Stack.Screen name="EmptyStateScreen">
          {props => <EmptyStateScreen {...props} title="Not Found" description="We couldn't find anything here." />}
        </Stack.Screen>
        <Stack.Screen name="ErrorScreen">
          {props => <ErrorScreen {...props} variant="serverUnavailable" />}
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
    </BookingProvider>
  );
};
