import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../constants/theme";

import LargeText from "../components/texts/LargeText";
import ExtraLargeText from "../components/texts/ExtraLargeText";
import SelectionBtn from "../components/SelectionBtn";
import MainScreen from "../components/MainScreen";
import { useNavigation } from "@react-navigation/native";

const PayementsScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  return (
    <MainScreen>
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.header}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <LargeText>Payments</LargeText>
        </View>

        <View style={styles.bottomContainer}>
          <LargeText style={{ fontSize: 26 }}>With Card</LargeText>
          <ExtraLargeText style={{ color: COLORS.primary, fontSize: 32 }}>
            Payment Method
          </ExtraLargeText>
          <View style={styles.imageContainer}>
            <Image
              resizeMode="contain"
              source={require("../../assets/svgs/card.png")}
              style={styles.cardImage}
            />
          </View>
          <View style={styles.btnContainer}>
            <SelectionBtn
              icon="credit-card-outline"
              title="Pay Now"
              bgColor={COLORS.secondary}
              onPress={() => navigation.navigate("servicepay", data)}
            />
          </View>
        </View>
      </View>
    </MainScreen>
  );
};

export default PayementsScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cardImage: {
    width: 350,
    height: 300,
  },
  header: {
    backgroundColor: COLORS.secondary,
    borderRadius: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    marginRight: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
  },
});
