import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../constants/theme";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import ServiceBookingCard from "../../components/ServiceBookingCard";

const OffersReceived = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [updatedData, setUpdatedData] = React.useState(false);
  const navigation = useNavigation();

  const getOffers = async () => {
    setLoading(true);
    //get all the docs from the collection serviceBookings where owner.uid===auth.currentUser.uid
    //set the data to bookings
    const colRef = collection(db, "serviceBookings");
    const querySnapshot = await getDocs(colRef);
    var myData = [];
    querySnapshot.forEach((doc) => {
      myData.push({ ...doc.data() });
    });
    setBookings(myData);
    filterData();
    setLoading(false);
  };

  const filterData = () => {
    //get all bookings where owner.uid===auth.currentUser.uid and orderStarted===false
    //set the data to updatedData
    var myData = [];

    bookings.forEach((item) => {
      if (
        item.owner.uid === auth.currentUser.uid &&
        item.orderStarted === false
      ) {
        myData.push(item);
      }
    });
    setUpdatedData(myData);
  };

  React.useEffect(() => {
    getOffers();
  }, []);

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Offers for Service"
          onPress={() => navigation.goBack()}
        />
        {updatedData.length > 0 ? (
          <View style={styles.main}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getOffers} />
              }
            >
              <Text style={styles.title}>Offers Received</Text>
              {updatedData.map((item, index) => (
                <View key={index}>
                  <ServiceBookingCard
                    data={item}
                    onPress={() => navigation.navigate("ownersbdetails", item)}
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        ) : (
          <View style={styles.noMain}>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={loading} onRefresh={getOffers} />
              }
            >
              <Text style={styles.noTitle}>No Offers Received</Text>
            </ScrollView>
          </View>
        )}
      </MainScreen>
    </>
  );
};

export default OffersReceived;

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  noMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noTitle: {
    fontSize: 18,
    color: COLORS.secondary,
  },
});
