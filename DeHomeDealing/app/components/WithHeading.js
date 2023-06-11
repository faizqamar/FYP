import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

const WithHeading = ({ heading, data, numOfLines }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{heading}</Text>
      <Text numberOfLines={numOfLines} style={styles.data}>
        {data}
      </Text>
    </View>
  );
};

export default WithHeading;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    borderRadius: 4,
  },
  data: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  heading: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    marginRight: 10,
  },
});
