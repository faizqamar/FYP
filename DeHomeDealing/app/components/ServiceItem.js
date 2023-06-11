import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import servicecolors from "../config/servicecolors";

import RegularText from "./texts/RegularText";

const ServiceItem = ({
  icon = "email",
  onPress,
  bgColor,
  title = "title",
  margr,
  margl,
}) => {
  return (
    <View
      style={[styles.mainContainer, { marginRight: margr, marginLeft: margl }]}
    >
      <TouchableOpacity
        onPress={onPress}
        style={[styles.container, { backgroundColor: bgColor }]}
      >
        <MaterialCommunityIcons
          name={icon}
          size={26}
          color={servicecolors.dark}
        />
      </TouchableOpacity>
      <RegularText style={{ marginTop: 5 }}>{title}</RegularText>
    </View>
  );
};

export default ServiceItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: 58,
    height: 58,
    borderRadius: 24,
  },
  mainContainer: {
    alignItems: "center",
  },
});
