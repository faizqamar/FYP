import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WithHeading from "./WithHeading";
import AppButton from "./AppButton";
import { COLORS } from "../constants/theme";

const ServiceBookingCard = ({ data, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Needed on:" data={data.date} />
      <WithHeading heading="Location:" data={data.location} />
      <WithHeading heading="At Date:" data={data.date} />
      <WithHeading heading="At Time:" data={data.time} />
      <WithHeading heading="Request Status:" data={data.status} />

      <View>
        <AppButton title="View Details" onPress={onPress} />
      </View>
    </View>
  );
};

export default ServiceBookingCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
