import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import { FONTS, COLORS } from "../constants/theme";

import LottieView from "lottie-react-native";
import { LargeText } from "../components/texts";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import BookingCard from "../components/BookingCard";

const MySentOffers = () => {
  const navigation = useNavigation();
  const [myOffers, setMyOffers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [updatedData, setUpdatedData] = React.useState(myOffers);

  React.useEffect(() => {
    getMyOffers();
  }, []);

  const filterData = () => {
    const filteredData = myOffers.filter((item) => item.status === "pending");
    setUpdatedData(filteredData);
  };

  const getMyOffers = async () => {
    try {
      setLoading(true);
      //    get all the docs where the userId is equal to auth.currentUser.uid
      // get all the docs from booking collection where listingId is equal to data.listingId
      const q = query(
        collection(db, "bookings"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setMyOffers(myData);
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
          titleScreen="My Sent Offers"
          onPress={() => navigation.goBack()}
        />
        {updatedData.length > 0 ? (
          <View style={styles.mainContainer}>
            <Text style={styles.title}>My Sent Offers</Text>
            <View>
              <FlatList
                data={updatedData}
                keyExtractor={(item) => item.sentAt.toString()}
                renderItem={({ item }) => (
                  <BookingCard
                    data={item}
                    onPressDetail={() =>
                      navigation.navigate("seemyofferdetail", item)
                    }
                  />
                )}
              />
            </View>
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              loop
              autoPlay
              source={require("../../assets/animations/empty.json")}
            />

            <LargeText style={{ color: COLORS.primary, textAlign: "center" }}>
              No Offers Found
            </LargeText>

            <LargeText style={{ color: COLORS.primary, textAlign: "center" }}>
              Please try again later
            </LargeText>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: 10,
                borderRadius: 5,
                marginTop: 10,
              }}
              onPress={() => getMyOffers()}
            >
              <LargeText style={{ color: COLORS.white }}>Try Again</LargeText>
            </TouchableOpacity>
          </View>
        )}
      </MainScreen>

      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/request.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default MySentOffers;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    paddingBottom: 120,
  },
  title: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primary,
    textAlign: "center",
    marginVertical: 15,
  },
});
