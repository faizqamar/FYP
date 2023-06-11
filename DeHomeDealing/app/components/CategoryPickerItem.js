import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import MyIcon from "./MyIcon";
import MediumText from "./texts/MediumText";
import servicecolors from "../config/servicecolors";
import { RegularText } from "./texts";
import colors from "../config/colors";

const CategoryPicker = ({ item = colors.primary, label, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <MyIcon
          backgroundColor={item.backgroundColor}
          name={item.icon}
          size={50}
        />
      </TouchableOpacity>
      <RegularText
        style={{
          color: servicecolors.font,
          marginVertical: 5,
          textAlign: "center",
        }}
      >
        {item.label}
      </RegularText>
    </View>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 21,
    alignItems: "center",
    width: "33%",
  },
});
