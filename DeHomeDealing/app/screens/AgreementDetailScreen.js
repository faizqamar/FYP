import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { ExtraLargeText } from "../components/texts";
import { COLORS } from "../constants/theme";
import servicecolors from "../config/servicecolors";

const AgreementDetailScreen = ({ navigation }) => {
  return (
    <View>
      <View style={styles.headingContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <ExtraLargeText>All Categories</ExtraLargeText>
      </View>
      <Text>Agreement Preview</Text>
    </View>
  );
};

export default AgreementDetailScreen;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    marginHorizontal: 15,
    borderLeftColor: servicecolors.nine,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 2,
    backgroundColor: servicecolors.six,
    borderRadius: 8,
    marginRight: 15,
  },
});
