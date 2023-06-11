import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import WithHeading from "../../components/WithHeading";
import { FONTS, COLORS } from "../../constants/theme";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

const UserviceOrderDetail = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  const handlePayment = () => {
    navigation.navigate("payment", data);
  };
  return (
    <MainScreen>
      <AppHeader
        titleScreen="Order Details"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.text}>Order Details</Text>

        <WithHeading
          heading="Service Provider:"
          data={data.bookingData.owner.username}
        />
        <WithHeading heading="Total Price:" data={data.totalPrice} />
        <WithHeading
          heading="Service Provider:"
          data={data.bookingData.owner.username}
        />
        <WithHeading heading="Started At:" data={data.orderStartedAT} />
        <WithHeading heading="Due Date:" data={data.bookingData.date} />
        <WithHeading heading="Due Time:" data={data.bookingData.time} />

        <View style={styles.contactBtns}>
          <AppButton
            title="To Chat"
            color={colors.primary}
            onPress={() =>
              navigation.navigate("servicescommentscreen", data.bookingData)
            }
          />
          <AppButton
            title="To Call"
            color={colors.secondary}
            onPress={() =>
              Linking.openURL(`tel:${data.bookingData.owner.phoneNumber}`)
            }
          />
        </View>

        <View>
          <AppButton title="Pay" onPress={() => handlePayment()} />
        </View>
      </View>
    </MainScreen>
  );
};

export default UserviceOrderDetail;

const styles = StyleSheet.create({
  contactBtns: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    marginVertical: 20,
    textAlign: "center",
  },
});
