import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";

const TitleDesc = ({
  bedroom = 4,
  bathroom = 5,
  onPress,
  title,
  btnTexto = "Check Details",
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.botttomContainer}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="bed" size={15} />
            <Text style={styles.bedroomText}>{bedroom}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome5 name="bath" size={15} />
            <Text style={styles.bedroomText}>{bathroom}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={onPress} style={styles.detailsBtn}>
          <Text style={styles.detailsBtnText}>{btnTexto}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TitleDesc;

const styles = StyleSheet.create({
  botttomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  detailsBtn: {
    minWidth: 120,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  detailsBtnText: {
    fontSize: 16,
    color: COLORS.white,
    fontFamily: FONTS.bold,
  },
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.primary,

    paddingVertical: 10,
  },
  bedroomText: {
    marginHorizontal: 5,
    fontFamily: FONTS.medium,
    fontSize: 12,
  },
});
