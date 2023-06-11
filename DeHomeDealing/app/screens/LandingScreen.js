import { StyleSheet, Text, View, ImageBackground, Image } from "react-native";
import React from "react";
import AppButton from "../components/AppButton";
import { COLORS, FONTS } from "../constants/theme";

const LandingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/basic/landing.jpg")}
        resizeMode="cover"
        style={styles.bg}
        blurRadius={8}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/basic/landingLogo.png")}
            style={{ width: 250, height: 250 }}
          />
          <Text style={styles.title}>Finding You the Dream House</Text>
        </View>
        <View style={styles.btnContainer}>
          <AppButton
            title="Register"
            onPress={() => navigation.navigate("RegisterPage")}
          />
          <AppButton
            title="Login"
            color={COLORS.secondary}
            onPress={() => navigation.navigate("LoginPage")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  btnContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
  },
});
