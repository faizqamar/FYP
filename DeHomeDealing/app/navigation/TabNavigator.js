import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatScreen from "../screens/ChatScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ListingEditScreen from "../screens/ListingEditScreen";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import SearchHouse from "../screens/SearchHouse";
import { COLORS } from "../constants/theme";
import StackNavigator from "./StackNavigator";
import useNotifications from "../hooks/useNotifications";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  useNotifications((notification) => {
    console.log("notification", notification);
    Alert.alert("Notification", "You have a new notification");
  });
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: COLORS.primary,
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveBackgroundColor: COLORS.secondary,
        tabBarInactiveTintColor: COLORS.white,
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchHouse}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Post Ad"
        component={ListingEditScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="plus-circle" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({});
