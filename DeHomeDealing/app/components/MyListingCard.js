import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../config/colors";
import { FONTS, COLORS } from "../constants/theme";
import CallToAction from "./CallToAction";
import servicecolors from "../config/servicecolors";

const MyListingCard = ({ price, message }) => {
  const myNumber = "1234567890";
  return (
    <View style={styles.mainContainer}>
      <View style={styles.horizontalContainer}>
        <Text style={styles.boldText}>Price Offered:</Text>
        <Text style={styles.lightText}>{price}</Text>
      </View>
      <View style={styles.horizontalContainer}>
        <Text style={styles.boldText}>Message:</Text>
        <Text numberOfLines={5} style={styles.lightText}>
          {message}
        </Text>
      </View>
      <View style={styles.callToAction}>
        <CallToAction
          title="Call Now"
          style={{ backgroundColor: servicecolors.nine }}
          onPress={() => Linking.openURL(`tel:${myNumber}`)}
        />
      </View>
    </View>
  );
};

export default MyListingCard;

const styles = StyleSheet.create({
  boldText: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
  callToAction: {
    marginVertical: 10,
    marginHorizontal: 20,
  },

  lightText: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.primary,
    marginLeft: 5,
  },
  mainContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
});
