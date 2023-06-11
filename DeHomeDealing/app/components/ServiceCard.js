import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LargeText, MediumText } from "./texts";
import { COLORS } from "../constants/theme";
import colors from "../config/colors";

const ServiceCard = ({
  imageUrl = "https://images.unsplash.com/photo-1604754742629-3e5728249d73?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  title = "AC Check-up",
  price = 128,
  averageRating = 5,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.mainContainer}>
        {/* Image Container Starts */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        {/* Image Container Ends */}
        <View style={styles.detailsContainer}>
          {/* Rating Container */}
          <View style={styles.ratingContainer}>
            <MaterialCommunityIcons name="star" size={15} color="green" />
            <LargeText style={{ fontSize: 15, marginHorizontal: 5 }}>
              {averageRating}
            </LargeText>
          </View>
          {/* Rating Container Ends */}
          <LargeText style={styles.title}>{title}</LargeText>
          <MediumText style={styles.desc}>Starts From</MediumText>
          {/* Price Container Starts */}
          <View style={styles.priceContainer}>
            <LargeText style={{ fontSize: 17, color: COLORS.white }}>
              ${price}
            </LargeText>
          </View>
          {/* Price Container Ends */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ServiceCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: 150,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    elevation: 7,
    borderWidth: 1,
    borderColor: colors.light,
    paddingHorizontal: 5,
  },
  goIconContainer: {
    position: "absolute",
    right: 15,
    padding: 2,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    marginLeft: 15,
  },
  imageContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 30,
  },
  detailsContainer: {
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  priceContainer: {
    padding: 2,
    backgroundColor: COLORS.secondary,
    width: 59,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 3,
    backgroundColor: colors.light,
    width: 60,
    borderRadius: 15,
  },
  title: {
    color: COLORS.primary,
  },
  desc: {},
});
