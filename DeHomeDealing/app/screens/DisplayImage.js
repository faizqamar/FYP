import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

const DisplayImage = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  return (
    <MainScreen>
      <AppHeader titleScreen="Image" onPress={() => navigation.goBack()} />
      <View style={styles.bg}>
        <Image
          source={{ uri: data }}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
    </MainScreen>
  );
};

export default DisplayImage;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: colors.black,
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 1.5,
  },
});
