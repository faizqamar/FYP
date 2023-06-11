import { Alert, Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../constants/theme";
import WithHeading from "../../components/WithHeading";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import moment from "moment";
import {
  getUserAndSendNotification,
  randomString,
} from "../../global/functions";
import { AllUsersContext } from "../../context/allUsersContext";

const OwnerSBDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const { users, setUsers } = React.useContext(AllUsersContext);

  const handlePress = () => {
    console.log("View Details Pressed");
    navigation.navigate("servicescommentscreen", data);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${data.user.phoneNumber}`);
  };

  const updateTheDoc = async () => {
    const updatedData = {
      orderStarted: true,
      status: "accepted",
    };
    await updateDoc(doc(db, "serviceBookings", data.bookingId), updatedData);
  };

  const handleOrderStart = async () => {
    updateTheDoc();
    const newDocId = randomString(35);
    const orderDocData = {
      bookingData: data,
      bookingId: data.bookingId,
      orderStarted: true,
      orderStartedAT: moment(Date.now()).format("DD-MM-YYYY hh:mm:ss"),
      orderCompleted: false,
      paymentStatus: "pending",
      totalPrice: data.total,
      owner: data.owner,
      user: data.user,
      docId: newDocId,
    };

    await setDoc(doc(db, "serviceOrders", newDocId), orderDocData)
      .then(() => {
        console.log("Order Doc Created");
        const bodyRequest = "Order Started by Service Provider";
        const route = "";
        getUserAndSendNotification(data.user.uid, users, bodyRequest, route);
        navigation.navigate("oserviceorders");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Service Booking Detail"
          onPress={() => navigation.goBack()}
        />
        {data.orderStarted === false ? (
          <View style={styles.mainContainer}>
            <Text style={styles.title}>Booking Details</Text>
            <View>
              <WithHeading heading="Needed on:" data={data.date} />
              <WithHeading heading="Location:" data={data.location} />
              <WithHeading heading="At Date:" data={data.date} />
              <WithHeading heading="At Time:" data={data.time} />
              <WithHeading heading="Request Status:" data={data.status} />

              <View>
                <AppButton
                  title="Chat"
                  onPress={handlePress}
                  color={colors.primary}
                />
                <AppButton
                  title="Call Service Provider"
                  onPress={handleCall}
                  color={colors.secondary}
                />
              </View>

              <View>
                <AppButton title="Accept Offer" onPress={handleOrderStart} />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.completeMainContainer}>
            <Text style={styles.title}>Booking Details</Text>
            <View>
              <AppButton
                title="Go To Orders Page"
                onPress={() => navigation.navigate("ownersorders")}
              />
            </View>
          </View>
        )}
      </MainScreen>
    </>
  );
};

export default OwnerSBDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  completeMainContainer: {
    flex: 1,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
