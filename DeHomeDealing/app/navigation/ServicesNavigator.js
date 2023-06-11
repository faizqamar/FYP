import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServicesHome from "../screens/services/ServicesHome";

const Stack = createNativeStackNavigator();

const ServicesNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="shome" component={ServicesHome} />
    </Stack.Navigator>
  );
};

export default ServicesNavigator;

const styles = StyleSheet.create({});
