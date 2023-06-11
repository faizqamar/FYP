import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyListings from "../screens/userscreens/MyListings";
import ReportProblemScreen from "../screens/ReportProblemScreen";
import UpdateProfile from "../screens/userscreens/UpdateProfile";

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Mylisting" component={MyListings} />
      <Stack.Screen name="report" component={ReportProblemScreen} />
      <Stack.Screen name="updateprofile" component={UpdateProfile} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

const styles = StyleSheet.create({});
