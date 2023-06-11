import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import colors from "../config/colors";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";

const CompleteOrderScreen = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  return (
    <>
      <MainScreen>
        <AppHeader titleScreen="OrderCompleted" icon="timer-sand-complete" />
        <View style={styles.mainContainer}>
          <Text style={styles.textTitle}>Order Completed</Text>
          <WithHeading heading="Completed At:" data={data.completedAt} />
          <WithHeading heading="User" data={data.user.username} />
          <WithHeading heading="Owner" data={data.owner.username} />
          <WithHeading heading="Order Status" data={data.orderStatus} />
          <WithHeading heading="Payment Status" data={data.paymentStatus} />

          <View style={styles.btnContainer}>
            <AppButton
              title="Go To Home"
              onPress={() => navigation.navigate("mHome")}
              color={COLORS.primary}
            />

            <AppButton
              title="Give Feedback"
              onPress={() => navigation.navigate("givefeedback", data)}
              color={COLORS.secondary}
            />
          </View>
        </View>
      </MainScreen>
    </>
  );
};

export default CompleteOrderScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  textTitle: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: colors.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  btnContainer: {
    marginVertical: 20,
  },
});
