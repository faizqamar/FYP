import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import WithHeading from "./WithHeading";
import AppButton from "./AppButton";

const OrderCard = ({ data, onPressButton }) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Owner" data={data.owner.username} />
      <WithHeading heading="Payment" data={data.paymentStatus} />
      <WithHeading heading="Order Status" data={data.orderStatus} />

      <View>
        <AppButton title="View Details" onPress={onPressButton} />
      </View>
    </View>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
  },
});
