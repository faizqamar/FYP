import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS } from "../../constants/theme";

const SmallText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default SmallText;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: "red",
  },
});
