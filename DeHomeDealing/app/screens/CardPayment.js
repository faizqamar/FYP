import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import {
  CardField,
  useStripe,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getUserAndSendNotification, randomString } from "../global/functions";
import { OrdersContext } from "../context/ordersContext";
import { AllUsersContext } from "../context/allUsersContext";
import { useNavigation } from "@react-navigation/native";

const CardPayment = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(parseInt(data.price));
  const [loading, setLoading] = React.useState(false);
  const {
    orders,
    setOrders,
    ordersLoading,
    setOrdersLoading,
  } = React.useContext(OrdersContext);

  const { users, setUsers } = React.useContext(AllUsersContext);

  React.useEffect(() => {
    console.log("UUUUUUUUUUUUUhdfgjhkdgjhsk", data);
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

      await updateDoc(doc(db, "orders", data.orderId), {
        paymentStatus: "paid",
        paymentMethod: "card",
        paymentId: docId,
        payment: {
          paymentId: docId,
          paymentMethod: "card",
          paymentStatus: "paid",
        },
      });

      const bodyRequest = "Buyer marked the order as paid.";
      const route = "viewownerorderdetails";

      getUserAndSendNotification(data.owner.uid, users, bodyRequest, route);

      setLoading(false);
      getOrders();
      navigation.navigate("myorders");
    } catch (error) {
      console.log(error);
      Alert.alert("Unable to Process Payment", error.message);
    }
  };

  const getOrders = async () => {
    setOrdersLoading(true);
    try {
      const colRef = collection(db, "orders");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setOrders(myData);
      setOrdersLoading(false);
    } catch (error) {
      console.log(error);
      setOrdersLoading(false);
    }
  };
  return (
    <>
      <MainScreen>
        <AppHeader titleScreen="Card Payment" />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text style={styles.title}>Card Payment</Text>
          <AppTextInput
            value={name}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.gray}
            onChangeText={(text) => setName(text)}
          />

          <AppButton
            title="Subscribe"
            color={COLORS.primary}
            onPress={handlePayPress}
          />
        </View>
      </MainScreen>
    </>
  );
};

export default CardPayment;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    color: COLORS.gray,
    marginVertical: 15,
  },
});
