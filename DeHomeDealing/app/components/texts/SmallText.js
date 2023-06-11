import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants/theme";

const SmallText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default SmallText;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontFamily: FONTS.regular,
  },
});
