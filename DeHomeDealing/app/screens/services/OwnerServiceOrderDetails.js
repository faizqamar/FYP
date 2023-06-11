import { Alert, Linking, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import WithHeading from "../../components/WithHeading";
import { FONTS, COLORS } from "../../constants/theme";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";
import moment from "moment";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { AllUsersContext } from "../../context/allUsersContext";
import { getUserAndSendNotification } from "../../global/functions";

import LottieView from "lottie-react-native";

const OwnerServiceOrderDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [loading, setLoading] = React.useState(false);

  const markOrderAsCompleted = async () => {
    setLoading(true);
    const UpdatedData = {
      status: "completed",
      orderCompleted: true,
      orderCompletedAt: moment(Date.now()).format("DD-MM-YYYY HH:mm:ss a"),
    };

    await updateDoc(doc(db, "serviceOrders", data.docId), UpdatedData)
      .then(() => {
        console.log("Order Completed");
        const bodyRequest = "Order Completed by Service Provider";
        const route = "userviceorders";
        getUserAndSendNotification(
          data.bookingData.user.uid,
          users,
          bodyRequest,
          route
        );
        navigation.navigate("givefeedback", data);
        setLoading(false);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="My Orders"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.text}>Order Details</Text>

          <WithHeading
            heading="Customer:"
            data={data.bookingData.user.username}
          />
          <WithHeading heading="Total Price:" data={data.totalPrice} />
          <WithHeading
            heading="Service Provider:"
            data={data.bookingData.owner.username}
          />
          <WithHeading heading="Started At:" data={data.orderStartedAT} />
          <WithHeading heading="Due Date:" data={data.bookingData.date} />
          <WithHeading heading="Due Time:" data={data.bookingData.time} />
          <WithHeading heading="Payment Method:" data="Cash" />

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
          <View style={{ flex: 1 }}>
            <Text style={styles.toCompleteText}>
              Task Done? Received Cash from customer?
            </Text>
            <AppButton
              title="Complete Order"
              color={COLORS.primary}
              onPress={markOrderAsCompleted}
            />
          </View>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../../assets/animations/done.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default OwnerServiceOrderDetails;

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
  toCompleteText: {
    fontSize: 12,
    fontFamily: FONTS.bold,
    textAlign: "center",
  },
});
