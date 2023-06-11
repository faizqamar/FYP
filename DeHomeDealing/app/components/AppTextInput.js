import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import { COLORS } from "../constants/theme";

const AppTextInput = ({
  icon,
  placeholder = "email",
  iconColor = COLORS.primary,
  color = colors.white,
  ...otherProps
}) => {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {icon && (
        <MaterialCommunityIcons name={icon} color={iconColor} size={25} />
      )}
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        {...otherProps}
      />
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.light,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
});
