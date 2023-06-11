import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import WithHeading from "./WithHeading";
import AppButton from "./AppButton";
const completed = "Completed";
const pending = "Pending";

const ServiceOrderCard = ({ data, onPressButton }) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Service Provider" data={data.owner.username} />
      <WithHeading heading="Total Payment" data={data.total} />
      <WithHeading heading="Due Date" data={data.bookingData.date} />
      <WithHeading heading="At Time:" data={data.bookingData.time} />
      <WithHeading
        heading="Order Status:"
        data={data.orderCompleted === true ? completed : pending}
      />

      <View>
        <AppButton title="View Details" onPress={onPressButton} />
      </View>
    </View>
  );
};

export default ServiceOrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
});
