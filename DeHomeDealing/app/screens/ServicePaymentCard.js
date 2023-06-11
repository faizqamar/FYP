import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import { useStripe } from "@stripe/stripe-react-native";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getUserAndSendNotification, randomString } from "../global/functions";

import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { AllUsersContext } from "../context/allUsersContext";

const ServicePaymentCard = ({ route }) => {
  const data = route.params;
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(parseInt(data.totalPrice));
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const { users, setUsers } = React.useContext(AllUsersContext);

  React.useEffect(() => {
    console.log("UUUUUUUUUUUUUhdfgjhkdgjhsk", data);
    console.log("UUUUUUUUUUUUUhdfgjhkdgjhsk", amount);
  }, []);

  const stripe = useStripe();

  const API_URL =
    "https://us-central1-housingfyp.cloudfunctions.net/createStripeCheckout";

  const handlePayPress = async () => {
    try {
      //sending request
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        body: JSON.stringify({ name, amount: amount }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();
      if (!response.ok) return Alert.alert("Error", responseData.message);
      const clientSecret = responseData.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "Dawar",
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error)
        return Alert.alert("error", presentSheet.error.message);
      Alert.alert("Success", "Payment succeeded");
      const docId = randomString(35);
      await updateDoc(doc(db, "serviceOrders", data.docId), {
        paymentStatus: "paid",
        paymentMethod: "card",
        paidAt: moment(Date.now()).format("DD/MM/YYYY"),
        orderCompleted: true,
        orderId: data.docId,
        payment: {
          paymentId: docId,
          paymentStatus: "paid",
          paymentMethod: "card",
        },
      });

      const bodyRequest = "Buyer marked the order as paid.";
      const route = "viewownerorderdetails";

      getUserAndSendNotification(data.owner.uid, users, bodyRequest, route);

      setLoading(false);
      navigation.navigate("myorders");
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to Process Payment", error.message);
    }
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Card Payment"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text style={styles.title}>Card Payment</Text>
          <AppTextInput
            value={name}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.gray}
            onChangeText={(text) => setName(text)}
          />

          <AppButton
            title="Pay Now"
            color={COLORS.primary}
            onPress={handlePayPress}
          />
        </View>
      </MainScreen>
    </>
  );
};

export default ServicePaymentCard;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: COLORS.gray,
    marginVertical: 15,
  },
});
