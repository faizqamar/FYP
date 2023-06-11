import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import WithHeading from "./WithHeading";

const BankCard = ({ bankName, accountNumber, accountName }) => {
  return (
    <View style={styles.mainContainer}>
      <WithHeading heading="Bank Name:" data={bankName} />
      <WithHeading heading="Account Number:" data={accountNumber} />
      <WithHeading heading="Account Title:" data={accountName} />
    </View>
  );
};

export default BankCard;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
});
