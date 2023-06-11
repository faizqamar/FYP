import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import { MediumText, RegularText } from "./texts";

const IconicText = ({ icon, title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MaterialCommunityIcons name={icon} size={20} color={COLORS.primary} />
      <RegularText style={{ marginHorizontal: 5, color: COLORS.primary }}>
        {title}
      </RegularText>
    </View>
  );
};

export default IconicText;

const styles = StyleSheet.create({});
