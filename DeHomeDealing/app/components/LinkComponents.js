import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";

const LinkComponents = ({
  onPress,
  title = "Houses",
  icon = "email",
  iconStyle = colors.primary,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={[styles.iconContainer, { backgroundColor: iconStyle }]}>
          <MaterialCommunityIcons name={icon} size={20} color={colors.white} />
        </View>
        <Text style={styles.titleStyle}>{title}</Text>
      </View>
      <View style={styles.arrowContainer}>
        <MaterialCommunityIcons name="arrow-right" />
      </View>
    </TouchableOpacity>
  );
};

export default LinkComponents;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 1,
  },
  arrowContainer: {
    width: 20,
    height: 20,
    backgroundColor: colors.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  titleStyle: {
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
    fontSize: 18,
    marginLeft: 15,
  },
  iconContainer: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    borderRadius: 10,
  },
});
