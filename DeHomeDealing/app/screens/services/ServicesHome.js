import {
  StyleSheet,
  FlatList,
  View,
  ImageBackground,
  Text,
} from "react-native";
import React from "react";
import MediumText from "../../components/texts/MediumText";
import ExtraLargeText from "../../components/texts/ExtraLargeText";
import servicecolors from "../../config/servicecolors";

import { ServicesListingsContext } from "../../context/servicesContext";
import AppButton from "../../components/AppButton";
import { UserContext } from "../../context/userContext";
import { FONTS } from "../../constants/theme";

const ServicesHome = ({ navigation }) => {
  const {
    servicesListings,
    setServicesListings,
    loadServicesListings,
    setLoadServicesListings,
  } = React.useContext(ServicesListingsContext);
  const { user, setUser } = React.useContext(UserContext);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <MediumText style={styles.nameText}>Hello {user.username}👋</MediumText>
        <ExtraLargeText style={styles.bigText}>
          What you are looking for today
        </ExtraLargeText>

        <AppButton
          title="See All Listings"
          color={servicecolors.primary}
          onPress={() => navigation.navigate("serviceslistings")}
        />
      </View>

      <View style={styles.middleContainer}>
        <AppButton
          title="All Categories"
          onPress={() => navigation.navigate("allservices")}
        />
      </View>

      <View style={styles.bottomContainer}>
        <ImageBackground
          source={require("../../../assets/images/loginbg.jpg")}
          style={styles.image}
          blurRadius={7}
        >
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.service}>Services For You!</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ServicesHome;

const styles = StyleSheet.create({
  bigText: {
    fontSize: 32,
    marginVertical: 10,
    color: servicecolors.font,
  },
  bottomContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30,
    paddingBottom: 40,
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: servicecolors.font,
  },
  mainBtn: {
    marginHorizontal: 39,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: servicecolors.light,
  },
  nameText: {
    marginTop: 10,
  },
  service: {
    fontSize: 24,
    color: servicecolors.white,

    fontFamily: FONTS.bold,
  },

  topContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 30,
  },
  middleContainer: {
    backgroundColor: servicecolors.white,
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
  },
});
