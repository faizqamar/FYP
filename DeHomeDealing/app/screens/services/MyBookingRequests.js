import {
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import MainScreen from "../../components/MainScreen";

import LottieView from "lottie-react-native";
import { COLORS, FONTS } from "../../constants/theme";
import AppHeader from "../../components/AppHeader";
import ServiceBookingCard from "../../components/ServiceBookingCard";

const MyBookingRequests = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const [booking, setBooking] = React.useState([]);

  const [updatedData, setUpdatedData] = React.useState(booking);

  const filterData = () => {
    const filteredData = booking.filter((item) => item.status === "pending");
    setUpdatedData(filteredData);
  };

  React.useEffect(() => {
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      setLoading(true);
      //    get all the docs where the userId is equal to auth.currentUser.uid
      // get all the docs from booking collection where listingId is equal to data.listingId
      const q = query(
        collection(db, "serviceBookings"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      console.log(myData);
      setBooking(myData);
      filterData();
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
          titleScreen="My Service Bookings"
          onPress={() => navigation.goBack()}
        />
        {updatedData.length > 0 ? (
          <View style={styles.mainContainer}>
            <Text style={styles.title}>My Booking Requests</Text>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getBookings} />
              }
            >
              {updatedData.map((item, index) => (
                <View key={index}>
                  <ServiceBookingCard
                    data={item}
                    onPress={() =>
                      navigation.navigate("servicebookingdetails", item)
                    }
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.noMainContainer}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getBookings} />
              }
            >
              <Text style={styles.noTitle}>No Booking Requests</Text>
            </ScrollView>
          </View>
        )}
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../../assets/animations/find.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default MyBookingRequests;

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
  noMainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTitle: {},
});
