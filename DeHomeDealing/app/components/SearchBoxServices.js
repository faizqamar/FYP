import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import servicecolors from "../config/servicecolors";

const SearchBoxServices = ({ icon = "search-sharp", value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search what you need..."
        value={value}
        style={{ flex: 1 }}
      />
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color={servicecolors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBoxServices;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: servicecolors.light,
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 12,
    width: "100%",
    borderWidth: 1,
    borderColor: servicecolors.primary,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: servicecolors.primary,
    padding: 7,
    borderRadius: 5,
  },
});
