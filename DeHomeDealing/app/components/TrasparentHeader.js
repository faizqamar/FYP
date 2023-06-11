import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/theme";
import LargeText from "./texts/LargeText";

const TrasparentHeader = ({ title, onPress }) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={25}
          color={COLORS.white}
        />
      </TouchableOpacity>
      <LargeText style={{ color: COLORS.primary }}>{title}</LargeText>
    </View>
  );
};

export default TrasparentHeader;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.white,
    width: "100%",
  },
});
