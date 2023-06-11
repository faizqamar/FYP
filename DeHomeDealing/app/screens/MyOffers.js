import { Alert, FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants/theme";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

import LottieView from "lottie-react-native";
import BookingCard from "../components/BookingCard";

const MyOffers = ({ route }) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [bookings, setBookings] = React.useState([]);
  const [updatedBookings, setUpdatedBookings] = React.useState(bookings);
  const data = route.params;
  useEffect(() => {
    console.log("Uuuuuuuuuuuuuuuuuuuuuuuuuuuu", data);
    getBookings();
    filterData();
  }, []);

  const filterData = () => {
    const filteredData = bookings.filter((item) => item.isAccepted === false);
    setUpdatedBookings(filteredData);
  };

  const getBookings = async () => {
    setLoading(true);
    try {
      // get all the docs from booking collection where listingId is equal to data.listingId
      const q = query(
        collection(db, "bookings"),
        where("listingId", "==", data.listingId)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setBookings(myData);
      filterData();
      console.log("dddddddddddddddddddddddddd", myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", error.message);
      setLoading(false);
    }
  };

  const handlePress = (item) => {
    navigation.navigate("ownerOfferDetail", item);
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          onPress={() => navigation.goBack()}
          titleScreen="Listings Offers"
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Booking Requests</Text>
          <View style={styles.listContainer}>
            <FlatList
              data={bookings}
              keyExtractor={(item) => item.title}
              renderItem={({ item }) => (
                <BookingCard
                  data={item}
                  onPressDetail={() => handlePress(item)}
                />
              )}
            />
          </View>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop
            source={require("../../assets/animations/house.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default MyOffers;

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    textAlign: "center",
    marginVertical: 20,
  },
});
