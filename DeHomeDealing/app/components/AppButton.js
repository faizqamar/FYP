import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const AppButton = ({
  title,
  onPress,
  color = COLORS.primary,
  style,
  textColor = COLORS.white,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: color }, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    elevation: 3,
  },
  text: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
