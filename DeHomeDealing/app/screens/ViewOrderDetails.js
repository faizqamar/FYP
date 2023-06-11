import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

const ViewOrderDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const [myData, setMyData] = React.useState(data);

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Order Details"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Orders Details</Text>

          <View style={styles.innerContainer}>
            <WithHeading heading="Order Status:" data={myData.orderStatus} />
            <WithHeading
              heading="Payment Status:"
              data={myData.paymentStatus}
            />
            <WithHeading heading="Total Payment:" data={myData.price} />
            <WithHeading heading="Owner:" data={myData.owner.username} />

            <View style={styles.btnContainer}>
              <AppButton
                title="Text Owner"
                color={colors.primary}
                onPress={() =>
                  navigation.navigate("ordercommentscreen", myData)
                }
              />
              <AppButton
                title="Call Owner"
                color={colors.secondary}
                onPress={() => {
                  Linking.openURL(`tel:${myData.owner.phoneNumber}`);
                }}
              />
            </View>

            {myData.paymentStatus === "pending" && (
              <View style={styles.payBtn}>
                <AppButton
                  title="Pay Now"
                  onPress={() => {
                    navigation.navigate("payorder", myData);
                  }}
                />
              </View>
            )}
            {myData.paymentStatus === "paid" && (
              <View style={styles.texoContainer}>
                <Text style={styles.texo}>
                  You marked the payment as transffered waiting for the
                  confirmation from the owner
                </Text>
              </View>
            )}
          </View>
        </View>
      </MainScreen>
    </>
  );
};

export default ViewOrderDetails;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  texo: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginVertical: 50,
  },
  texoContainer: {
    backgroundColor: COLORS.white,
    padding: 30,
  },
});
