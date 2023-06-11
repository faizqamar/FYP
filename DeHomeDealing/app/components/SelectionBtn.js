import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import MediumText from "./texts/MediumText";
import colors from "../config/colors";
import { COLORS } from "../constants/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const SelectionBtn = ({
  onPress,
  title = "Change Title",
  icon = "bank",
  iconColor = COLORS.white,
  textColor = COLORS.white,
  bgColor = COLORS.primary,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={icon}
        size={30}
        color={iconColor}
        style={{ marginHorizontal: 7 }}
      />
      <MediumText style={{ color: textColor }}>{title}</MediumText>
    </TouchableOpacity>
  );
};

export default SelectionBtn;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
