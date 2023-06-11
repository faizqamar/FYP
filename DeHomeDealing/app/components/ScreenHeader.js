import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, FONTS } from "../constants/theme";

const ScreenHeader = ({
  icon = "arrow-left",
  headerText = "Chats",
  onPress,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="chevron-left"
          size={25}
          color={COLORS.secondary}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontFamily: FONTS.bold,
    color: COLORS.white,
    fontSize: 24,
    marginLeft: 30,
  },
  iconContainer: {
    width: 25,
    height: 25,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
