import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";
import { LargeText, MediumText, RegularText } from "./texts";
import { COLORS } from "../constants/theme";
import AppButton from "./AppButton";

const PersonDetailsContainer = ({
  ownerName = "Dawar",
  ownerListings,
  imgUrl = "https://cdn-icons-png.flaticon.com/512/2919/2919906.png",
  onPress,
  onPressBtn,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{
            uri: imgUrl,
          }}
          style={styles.image}
        />
        <View>
          <LargeText style={{ color: COLORS.primary }}>{ownerName}</LargeText>
          <AppButton title="See User's Ratings" onPress={onPressBtn} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonDetailsContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.white,
    width: "100%",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: COLORS.white,
    marginRight: 20,
  },
});
