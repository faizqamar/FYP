import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";

import LottieView from "lottie-react-native";
import { SordersContext } from "../context/sOrdersContext";
import { auth, db } from "../../firebase";
import { COLORS, FONTS } from "../constants/theme";
import ServiceOrderCard from "../components/ServiceOrderCard";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserviceOrders = () => {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();
  const { sOrders, setSOrders } = React.useContext(SordersContext);

  const myOrders = sOrders.filter(
    (item) => item.user.uid === auth.currentUser.uid
  );

  const getOrders = async () => {
    //get all the docs from serviceOrders collection where user.uid is equal to auth.currentUser.uid
    try {
      setLoading(true);
      const q = query(
        collection(db, "serviceOrders"),
        where("user.uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setSOrders(myData);
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
          titleScreen="User Service Orders"
          onPress={() => navigation.goBack()}
        />
        {myOrders.length > 0 ? (
          <View style={styles.mainContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getOrders} />
              }
            >
              <Text style={styles.text}>User Service Orders</Text>
              {myOrders.map((item, index) => (
                <View key={index}>
                  <ServiceOrderCard
                    data={item}
                    onPressButton={() => {
                      item.orderCompleted === true
                        ? navigation.navigate("givefeedback", item)
                        : navigation.navigate("userviceorderdetails", item);
                    }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.noMainContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getOrders} />
              }
            >
              <Text style={styles.noText}>No Orders</Text>
            </ScrollView>
          </View>
        )}
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/find.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default UserviceOrders;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: COLORS.secondary,
    fontFamily: FONTS.semiBold,
    marginVertical: 10,
    textAlign: "center",
  },
  noMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noText: {
    fontSize: 20,
    color: COLORS.secondary,
    fontFamily: FONTS.bold,
  },
});
