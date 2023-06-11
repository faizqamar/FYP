import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const HomeHeader = ({ onPressPic, onPressNav }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressNav}>
        <Image
          source={require("../../assets/images/many/logo.png")}
          style={{ width: 120, height: 30, resizeMode: "contain" }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressPic}>
        <Image
          source={require("../../assets/images/many/person01.png")}
          style={{ width: 40, height: 40, resizeMode: "contain" }}
        />
        <Image
          source={require("../../assets/icons/badge.png")}
          style={{
            width: 15,
            height: 15,
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});
