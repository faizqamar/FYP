import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants/theme";

const LargeText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default LargeText;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    fontFamily: FONTS.semiBold,
  },
});
