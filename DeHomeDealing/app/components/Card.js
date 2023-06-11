import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import colors from "../config/colors";
import RatingPrice from "./RatingPrice";
import TitleDesc from "./TitleDesc";

const Card = ({
  imgUrl,
  rating,
  price,
  bathroom,
  bedroom,
  onPress,
  onPressHeart,
  btnTexto = "Check Details",
  title = "Very beautiful House Located in Islamabad",
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.thumbnail}>
        <Image
          source={{ uri: imgUrl }}
          style={styles.imageThumbnail}
          title={title}
          resizeMode="cover"
        />
      </View>

      <RatingPrice rating={rating} price={price} />

      <TitleDesc
        title={title}
        bathroom={bathroom}
        bedroom={bedroom}
        onPress={onPress}
        btnTexto={btnTexto}
      />

      <TouchableOpacity style={styles.heartContainer} onPress={onPressHeart}>
        <Image
          source={require("../../assets/icons/heart.png")}
          style={styles.heartLogo}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  imageThumbnail: {
    width: "100%",
    height: 259,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  mainContainer: {
    marginHorizontal: 8,
    backgroundColor: colors.white,
    paddingBottom: 30,
    marginVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.light,
  },
  heartContainer: {
    position: "absolute",
    right: 15,
    top: 25,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  heartLogo: {
    height: 25,
    width: 25,
  },
  thumbnail: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});
