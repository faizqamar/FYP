import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS, FONTS } from "../constants/theme";

const ReportsComponent = ({ icon = "email", text = "Email", onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons name={icon} size={60} color={COLORS.primary} />
      <Text style={styles.texto}>{text}</Text>
    </TouchableOpacity>
  );
};

export default ReportsComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: 35,
    margin: 10,
    borderRadius: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  texto: {
    fontFamily: FONTS.bold,
    fontSize: 24,
    color: COLORS.secondary,
  },
});
