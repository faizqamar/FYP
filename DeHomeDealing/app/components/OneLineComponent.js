import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../config/colors";
import { FONTS } from "../constants/theme";

const OneLineComponent = ({
  imgSource,
  user = "Dawar",
  lastMsg = "Hello, Im on my way",
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imgSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.userName}>{user}</Text>
        <Text>{lastMsg}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default OneLineComponent;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 0.5,
    paddingHorizontal: 7,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingVertical: 7,
  },
  imageContainer: {
    width: "20%",
  },
  image: {
    width: 59,
    height: 59,
  },
  textContainer: {},
  userName: {
    fontFamily: FONTS.bold,
  },
});
