import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReportsScreen from "../screens/ReportsScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Reports" component={ReportsScreen} />
    </Stack.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({});
