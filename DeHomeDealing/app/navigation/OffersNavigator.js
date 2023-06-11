import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ViewMyHomeOffers from "../screens/ViewMyHomeOffers";
import BookingOffers from "../screens/BookingOffers";

const Tab = createMaterialBottomTabNavigator();

const OffersNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ViewCounterOffers" component={ViewMyHomeOffers} />
      <Tab.Screen name="bookingOffers" component={BookingOffers} />
    </Tab.Navigator>
  );
};

export default OffersNavigator;

const styles = StyleSheet.create({});
