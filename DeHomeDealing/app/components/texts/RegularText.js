import { StyleSheet, Text } from "react-native";
import React from "react";
import { FONTS } from "../../constants/theme";

const RegularText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default RegularText;

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
});
