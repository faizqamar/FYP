import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";

const LinkButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit
        style={{ color: COLORS.white }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  container: {
    minWidth: 100,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
