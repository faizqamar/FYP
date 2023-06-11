import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../../constants/theme";

const MediumText = ({ style, children }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default MediumText;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },
});
