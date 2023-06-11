import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import { ExtraLargeText } from "../../components/texts";
import AppTextInput from "../../components/AppTextInput";

const AddBankAccountNumber = () => {
  return (
    <MainScreen>
      <ExtraLargeText>Add Bank Account</ExtraLargeText>
      <AppTextInput placeholder="Bank account to display" />
    </MainScreen>
  );
};

export default AddBankAccountNumber;

const styles = StyleSheet.create({});
