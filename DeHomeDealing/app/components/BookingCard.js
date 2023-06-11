import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WithHeading from "./WithHeading";
import { COLORS, SHADOWS } from "../constants/theme";
import AppButton from "./AppButton";

const BookingCard = ({ data, onPressDetail }) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Request Type" data={data.type} />
      <WithHeading heading="Sent By" data={data.user} />
      <WithHeading heading="Request Title" data={data.title} />
      <View>
        <AppButton title="Details" onPress={onPressDetail} />
      </View>
    </View>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    marginVertical: 10,
    padding: 15,
    borderRadius: 20,
    ...SHADOWS.dark,
  },
});
