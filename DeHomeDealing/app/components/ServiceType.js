import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import colors from "../config/colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ServiceType = ({ label, icon, onPress, color }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <MaterialCommunityIcons name={icon} size={33} color={colors.dark} />
        </View>
        <Text>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ServiceType;

const styles = StyleSheet.create({
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "33%",
    marginVertical: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
