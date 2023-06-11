import { StyleSheet } from "react-native";
import React from "react";

import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import PayementsScreen from "../screens/PayementsScreen";

import RecommendedScreen from "../screens/RecommendedScreen";
import DrawerNavigator from "./DrawerNavigator";
import UserVerificationScreen from "../screens/UserVerificationScreen";
import AgreementScreen from "../screens/AgreementScreen";
import ListingsScreen from "../screens/ListingsScreen";
import SellServiceScreen from "../screens/services/SellServiceScreen";
import MyListings from "../screens/userscreens/MyListings";
import ServicesHome from "../screens/services/ServicesHome";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllServices from "../screens/services/AllServices";
import Slistings from "../screens/services/Slistings";
import ServicesDetailsScreen from "../screens/services/ServicesDetailsScreen";
import ReportProblemScreen from "../screens/ReportProblemScreen";
import AgreementDetailScreen from "../screens/AgreementDetailScreen";
import AddBankAccountNumber from "../screens/paymentScreens/AddBankAccountNumber";
import ServiceListingDetails from "../screens/services/ServiceListingDetails";
import QrCodeScanner from "../screens/QrCodeScanner";
import QrCodeListingDetails from "../screens/QrCodeListingDetails";
import UpdateProfile from "../screens/userscreens/UpdateProfile";
import SendOfferScreen from "../screens/SendOfferScreen";
import ViewMyHomeOffers from "../screens/ViewMyHomeOffers";
import ServiceBookingForm from "../screens/services/ServiceBookingForm";
import BookingHouse from "../screens/BookingHouse";
import MyOffers from "../screens/MyOffers";
import OwnerOfferDetailScreen from "../screens/OwnerOfferDetailScreen";
import MySentOffers from "../screens/MySentOffers";
import SeeMyOffersDetail from "../screens/SeeMyOffersDetail";
import { CommentsScreen } from "../screens/CommentsScreen";
import ViewTheAgreement from "../screens/ViewTheAgreement";
import SendAgreements from "../screens/SendAgreements";
import AddBank from "../screens/AddBank";
import MyOrders from "../screens/MyOrders";
import OwnerOrders from "../screens/OwnerOrders";
import ViewOrderDetails from "../screens/ViewOrderDetails";
import { OrderCommentScreen } from "../screens/OrderCommentScreen";
import PayOrder from "../screens/PayOrder";
import ViewOwnerOrderDetails from "../screens/ViewOwnerOrderDetails";
import DisplayImage from "../screens/DisplayImage";
import CompleteOrderScreen from "../screens/CompleteOrderScreen";
import GiveFeedback from "../screens/GiveFeedback";
import ViewFeedbacks from "../screens/ViewFeedbacks";
import ShowPayments from "../screens/ShowPayments";
import DisplayFavoriteListings from "../screens/DisplayFavoriteListings";
import ServicesListings from "../screens/ServicesListings";
import MyServiceListings from "../screens/services/MyServiceListings";
import MyBookingRequests from "../screens/services/MyBookingRequests";
import ServiceBookingDetails from "../screens/services/ServiceBookingDetails";
import { ServicesCommentScreen } from "../screens/services/ServicesCommentScreen";
import OffersReceived from "../screens/services/OffersReceived";
import OwnerSBDetails from "../screens/services/OwnerSBDetails";
import UserviceOrders from "../screens/UserviceOrders";
import OwnerServiceOrders from "../screens/services/OwnerServiceOrders";
import UserviceOrderDetail from "../screens/services/UserviceOrderDetail";
import OwnerServiceOrderDetails from "../screens/services/OwnerServiceOrderDetails";
import SearchResults from "../screens/SearchResults";
import Recommender from "../screens/Recommender";
import MapScreen from "../screens/MapScreen";
import OwnerBankAccount from "../screens/OwnerBankAccount";
import CardPayment from "../screens/CardPayment";
import DetailedImage from "../screens/DetailedImage";
import SeeLocation from "../screens/SeeLocation";
import SearchedListings from "../screens/SearchedListings";
import ServicePaymentCard from "../screens/ServicePaymentCard";
import PreviousBookings from "../screens/PreviousBookings";
import AgreementTemplates from "../screens/AgreementTemplates";
import MyAgreements from "../screens/MyAgreements";
import ListingMapScreen from "../screens/ListingMapScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="mHome" component={DrawerNavigator} />
      <Stack.Screen name="Details" component={ListingDetailsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="payment" component={PayementsScreen} />
      <Stack.Screen name="foryou" component={RecommendedScreen} />
      <Stack.Screen name="Verify" component={UserVerificationScreen} />
      <Stack.Screen name="Agreement" component={AgreementScreen} />
      <Stack.Screen name="preview" component={AgreementDetailScreen} />
      <Stack.Screen name="Listings" component={ListingsScreen} />
      <Stack.Screen name="Mylisting" component={MyListings} />
      <Stack.Screen name="qrcodescanner" component={QrCodeScanner} />
      <Stack.Screen name="qrDetails" component={QrCodeListingDetails} />
      <Stack.Screen name="BookingHouse" component={BookingHouse} />

      <Stack.Screen name="report" component={ReportProblemScreen} />

      <Stack.Screen name="services" component={ServicesHome} />
      <Stack.Screen name="allservices" component={AllServices} />
      <Stack.Screen name="Selling" component={SellServiceScreen} />
      <Stack.Screen name="slistings" component={Slistings} />
      <Stack.Screen name="sdetails" component={ServicesDetailsScreen} />
      <Stack.Screen name="updateprofile" component={UpdateProfile} />
      <Stack.Screen name="sBooking" component={ServiceBookingForm} />
      <Stack.Screen
        name="servicelistingdetails"
        component={ServiceListingDetails}
      />

      <Stack.Screen name="bankaccountnumber" component={AddBankAccountNumber} />
      <Stack.Screen name="sendofferhome" component={SendOfferScreen} />

      <Stack.Screen name="viewmyhomeoffers" component={ViewMyHomeOffers} />
      <Stack.Screen name="myoffers" component={MyOffers} />
      <Stack.Screen
        name="ownerOfferDetail"
        component={OwnerOfferDetailScreen}
      />
      <Stack.Screen name="mysentoffers" component={MySentOffers} />
      <Stack.Screen name="seemyofferdetail" component={SeeMyOffersDetail} />
      <Stack.Screen name="commentscreen" component={CommentsScreen} />
      <Stack.Screen name="viewtheagreement" component={ViewTheAgreement} />
      <Stack.Screen name="sendagreement" component={SendAgreements} />
      <Stack.Screen name="addbank" component={AddBank} />
      <Stack.Screen name="myorders" component={MyOrders} />
      <Stack.Screen name="ownerorders" component={OwnerOrders} />
      <Stack.Screen name="vieworderdetails" component={ViewOrderDetails} />
      <Stack.Screen
        name="viewownerorderdetails"
        component={ViewOwnerOrderDetails}
      />
      <Stack.Screen name="ordercommentscreen" component={OrderCommentScreen} />
      <Stack.Screen name="payorder" component={PayOrder} />
      <Stack.Screen name="displayscreenshot" component={DisplayImage} />
      <Stack.Screen name="completedscreen" component={CompleteOrderScreen} />
      <Stack.Screen name="givefeedback" component={GiveFeedback} />
      <Stack.Screen name="viewfeedbacks" component={ViewFeedbacks} />
      <Stack.Screen name="showpayments" component={ShowPayments} />
      <Stack.Screen name="showfav" component={DisplayFavoriteListings} />
      <Stack.Screen name="serviceslistings" component={ServicesListings} />
      <Stack.Screen name="myservicelisting" component={MyServiceListings} />
      <Stack.Screen name="mybookingrequests" component={MyBookingRequests} />
      <Stack.Screen
        name="servicebookingdetails"
        component={ServiceBookingDetails}
      />
      <Stack.Screen
        name="servicescommentscreen"
        component={ServicesCommentScreen}
      />
      <Stack.Screen name="serviceoffersreceived" component={OffersReceived} />
      <Stack.Screen name="ownersbdetails" component={OwnerSBDetails} />
      <Stack.Screen name="userviceorders" component={UserviceOrders} />
      <Stack.Screen name="oserviceorders" component={OwnerServiceOrders} />
      <Stack.Screen
        name="userviceorderdetails"
        component={UserviceOrderDetail}
      />
      <Stack.Screen
        name="ownerserviceorderdetails"
        component={OwnerServiceOrderDetails}
      />
      <Stack.Screen name="searchresults" component={SearchResults} />
      <Stack.Screen name="recommended" component={Recommender} />
      <Stack.Screen name="mapscreen" component={MapScreen} />
      <Stack.Screen name="ownerbankdetails" component={OwnerBankAccount} />
      <Stack.Screen name="cardpayment" component={CardPayment} />
      <Stack.Screen name="detailedImage" component={DetailedImage} />
      <Stack.Screen name="seelocation" component={SeeLocation} />
      <Stack.Screen name="searchedlistings" component={SearchedListings} />
      <Stack.Screen name="servicepay" component={ServicePaymentCard} />
      <Stack.Screen name="previousbookings" component={PreviousBookings} />
      <Stack.Screen name="agreementTemplates" component={AgreementTemplates} />
      <Stack.Screen name="myagreementss" component={MyAgreements} />
      <Stack.Screen name="listingmap" component={ListingMapScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
