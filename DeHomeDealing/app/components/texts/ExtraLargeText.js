import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS } from "../../constants/theme";

const ExtraLargeText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default ExtraLargeText;

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontFamily: FONTS.bold,
  },
});
