import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

import { db, auth } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import MainScreen from "../components/MainScreen";

import LottieView from "lottie-react-native";
import AppHeader from "../components/AppHeader";
import { COLORS, FONTS } from "../constants/theme";
import colors from "../config/colors";
import WithHeading from "../components/WithHeading";
import { useNavigation } from "@react-navigation/native";

const ShowPayments = () => {
  const [loading, setLoading] = React.useState(false);

  const [payments, setPayments] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    getPayments();
  }, []);

  const getPayments = async () => {
    setLoading(true);
    try {
      //get all the docs from feedback collection where reviewFor is equal to auth.currentUser.uid
      const q = query(
        collection(db, "orders"),
        where("paymentStatus", "==", "received")
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });

      setPayments(myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Payments Record"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>User's Past Payments</Text>

          {payments.length > 0 ? (
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getPayments} />
              }
            >
              <View style={{ flex: 1 }}>
                {payments.map((item, index) => (
                  <View style={styles.mainCard} key={index}>
                    <WithHeading heading="Total Amount" data={item.price} />
                    <WithHeading
                      heading="Transaction Date:"
                      data={item.orderPlacedAt}
                    />
                    <WithHeading heading="Sent By:" data={item.user.username} />
                    <WithHeading
                      heading="Received By:"
                      data={item.owner.username}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={loading}
                    onRefresh={getPayments}
                  />
                }
              >
                <Text style={styles.noData}>No Record Found</Text>
              </ScrollView>
            </View>
          )}
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

export default ShowPayments;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    marginBottom: 10,
    textAlign: "center",
  },
  noData: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.primary,
    textAlign: "center",
  },
  mainCard: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginVertical: 10,
    padding: 12,
  },
});
