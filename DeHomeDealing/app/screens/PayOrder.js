import { Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import MainScreen from "../components/MainScreen";
import { FONTS } from "../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../components/form";
import FormImagePicker from "../components/form/FormImagePicker";

import * as yup from "yup";
import LottieView from "lottie-react-native";
import AppHeader from "../components/AppHeader";
import { auth, db } from "../../firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { OrdersContext } from "../context/ordersContext";
import { getUserAndSendNotification, randomString } from "../global/functions";
import { AllUsersContext } from "../context/allUsersContext";
import AppButton from "../components/AppButton";

const validationSchema = yup.object().shape({
  images: yup.array().min(1, "Please select at least one image"),
  description: yup.string().label("Description"),
});

const initialValues = {
  images: [],
  description: "",
};

const PayOrder = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const { users } = React.useContext(AllUsersContext);

  const {
    orders,
    setOrders,
    ordersLoading,
    setOrdersLoading,
  } = React.useContext(OrdersContext);

  React.useEffect(() => {
    console.log("data", data);
  }, []);

  const handlePayment = async (values) => {
    setLoading(true);
    const { images, description } = values;

    const docId = randomString(35);
    const updatedData = {
      uid: auth.currentUser.uid,
      docId,
    };

    await updateDoc(doc(db, "orders", data.orderId), {
      paymentStatus: "paid",
      payment: updatedData,
      paymentMethod: "bank",
    });

    const bodyRequest = "Buyer marked the order as paid.";
    const route = "viewownerorderdetails";

    getUserAndSendNotification(data.owner.uid, users, bodyRequest, route);

    setLoading(false);
    getOrders();
    navigation.navigate("myorders");
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
        <AppHeader titleScreen="Payment" onPress={() => navigation.goBack()} />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Bank Payment</Text>
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handlePayment(values)}
          >
            <FormImagePicker name="images" />
            <AppFormField name="description" placeholder="Details" />

            <View>
              <SubmitButton title="Pay" />
            </View>
          </AppForm>
          <AppButton
            title="Owner Bank Details"
            onPress={() => navigation.navigate("ownerbankdetails", data)}
          />
          <AppButton
            title="Credit Card"
            onPress={() => navigation.navigate("cardpayment", data)}
          />
        </View>
      </MainScreen>

      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <LottieView
            source={require("../../assets/animations/payment.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default PayOrder;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginHorizontal: 15,
    marginVertical: 15,
  },
});
