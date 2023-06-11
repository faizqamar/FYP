import {
  Alert,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getUserAndSendNotification } from "../global/functions";
import { AllUsersContext } from "../context/allUsersContext";

import LottieView from "lottie-react-native";
import moment from "moment";
import { OrdersContext } from "../context/ordersContext";

const ViewOwnerOrderDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const [myData, setMyData] = React.useState(data);
  const [loading, setLoading] = React.useState(false);
  const { users, setUsers } = React.useContext(AllUsersContext);
  const {
    orders,
    setOrders,
    ordersLoading,
    setOrdersLoading,
  } = React.useContext(OrdersContext);

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

  const handleOrderComplete = async () => {
    setLoading(true);
    const orderStatus = "completed";
    const paymentStatus = "received";
    const completedAt = moment(Date.now()).format("DD MMM YYYY");

    try {
      await updateDoc(doc(db, "orders", data.orderId), {
        orderStatus,
        paymentStatus,
        completedAt,
      });
      Alert.alert("You have marked the order as complete");
      const bodyRequest = "Owner has marked your order as complete";
      const route = "myorders";
      setLoading(false);
      getUserAndSendNotification(data.user.uid, users, bodyRequest, route);
      getOrders();
      navigation.navigate("ownerorders");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Order Details"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <ScrollView>
            <Text style={styles.title}>Orders Details</Text>

            <View style={styles.innerContainer}>
              <WithHeading heading="Order Status:" data={myData.orderStatus} />
              <WithHeading
                heading="Payment Status:"
                data={myData.paymentStatus}
              />
              <WithHeading heading="Buyer:" data={myData.owner.username} />

              <View style={styles.btnContainer}>
                <AppButton
                  title="Text Buyer"
                  color={colors.primary}
                  onPress={() =>
                    navigation.navigate("ordercommentscreen", myData)
                  }
                />
                <AppButton
                  title="Call Buyer"
                  color={colors.secondary}
                  onPress={() => {
                    Linking.openURL(`tel:${myData.user.phoneNumber}`);
                  }}
                />
              </View>

              {myData.paymentStatus === "paid" &&
                myData.paymentMethod !== "card" && (
                  <View>
                    <Text style={styles.texo}>Payment Details</Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(
                          "displayscreenshot",
                          myData.payment.images[0]
                        )
                      }
                      style={styles.imageContainer}
                    >
                      <Image
                        source={{ uri: myData.payment.images[0] }}
                        style={styles.image}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>

                    <View style={styles.completeBtn}>
                      <AppButton
                        onPress={handleOrderComplete}
                        title="Complete the order"
                      />
                    </View>
                  </View>
                )}
              {myData.paymentStatus === "paid" &&
                myData.paymentMethod === "card" && (
                  <View>
                    <Text style={styles.texo}>User Paid with card</Text>

                    <View style={styles.completeBtn}>
                      <AppButton
                        onPress={handleOrderComplete}
                        title="Complete the order"
                      />
                    </View>
                  </View>
                )}
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
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

export default ViewOwnerOrderDetails;

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
  image: {
    width: 150,
    height: 150,
  },
  imageContainer: {
    backgroundColor: colors.black,
    width: 150,
    borderRadius: 20,
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
  completeBtn: {
    marginVertical: 20,
  },
});
