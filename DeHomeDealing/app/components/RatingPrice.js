import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";

const RatingPrice = ({ rating = 5.0, price = 100000 }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingContainer}>
        <FontAwesome name="star" size={25} color="green" />
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 12,
            marginHorizontal: 5,
          }}
        >
          Rating is {rating}
        </Text>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>Price</Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: FONTS.bold,
            color: colors.white,
          }}
        >
          {price}
        </Text>
      </View>
    </View>
  );
};

export default RatingPrice;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: -10,
    backgroundColor: colors.white,
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  ratingContainer: {
    minWidth: 110,
    backgroundColor: colors.light,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  priceContainer: {
    minWidth: 140,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 4,
  },
  priceText: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: colors.white,
  },
});
