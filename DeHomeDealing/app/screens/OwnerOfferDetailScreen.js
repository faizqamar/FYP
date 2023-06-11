import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import WithHeading from "../components/WithHeading";
import moment from "moment";
import AppButton from "../components/AppButton";
import servicecolors from "../config/servicecolors";

const OwnerOfferDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;

  const myDateFrom = moment(data.dateFrom).format("DD MMM YYYY");
  if (data.dateTo) {
    var myDateTo = moment(data.dateTo).format("DD MMM YYYY");
  }

  const moveToChat = () => {
    navigation.navigate("commentscreen", data);
  };
  return (
    <MainScreen>
      <AppHeader
        titleScreen="Offer Detail"
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.title}>Offer Details</Text>
      <View style={styles.mainContainer}>
        <WithHeading heading="Request for:" data={data.type} />
        <WithHeading heading="Requested by:" data={data.user} />
        <WithHeading heading="Request Title:" data={data.title} />
        {data.price && <WithHeading heading="Price:" data={data.price} />}
        <WithHeading data={myDateFrom} heading="Needed From:" />
        {myDateTo && <WithHeading data={myDateTo} heading="Date To:" />}

        <View style={styles.innerContainer}>
          <AppButton title="Chat" onPress={moveToChat} color={COLORS.primary} />
          <AppButton
            title="Send Agreement"
            onPress={() => navigation.navigate("sendagreement", data)}
            color={COLORS.secondary}
          />
        </View>
      </View>
    </MainScreen>
  );
};

export default OwnerOfferDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
