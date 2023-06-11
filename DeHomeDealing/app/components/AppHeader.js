import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const AppHeader = ({ titleScreen, onPress, icon = "chevron-left" }) => {
  return (
    <View style={[styles.mainContainer, { backgroundColor: COLORS.primary }]}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <MaterialCommunityIcons name={icon} color={colors.white} size={25} />
      </TouchableOpacity>
      <Text style={styles.title}>{titleScreen}</Text>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  iconContainer: {
    height: 30,
    width: 30,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginRight: 10,
  },
  mainContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: colors.white,
  },
});
