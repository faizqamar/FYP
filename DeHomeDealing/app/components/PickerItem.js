import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import RegularText from "../components/texts/RegularText";
import colors from "../config/colors";

function PickerItem({ onPress, item }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <RegularText style={styles.text}>{item.label}</RegularText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.light,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  text: {
    padding: 10,
  },
});

export default PickerItem;
