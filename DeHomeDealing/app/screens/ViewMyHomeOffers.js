import {
  Dimensions,
  FlatList,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import MyListingCard from "../components/MyListingCard";
import { FONTS, COLORS } from "../constants/theme";

import LottieView from "lottie-react-native";
import { LargeText } from "../components/texts";
import { ListingsContext } from "../context/listingContext";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import AppButton from "../components/AppButton";
import WithHeading from "../components/WithHeading";
import colors from "../config/colors";
import { async } from "@firebase/util";
import { getUserAndSendNotification } from "../global/functions";
import { AllUsersContext } from "../context/allUsersContext";

const ViewMyHomeOffers = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  const { listings, setListings } = React.useContext(ListingsContext);
  const [loading, setLoading] = React.useState(false);
  const { users, setUsers } = React.useContext(AllUsersContext);

  const getLisings = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, "listings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //store data in AsyncStorage
      setListings(myData);
      filterData();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = (item) => {
    const bodyRequest = "Counter Offer Accepted";
    const route = "Listings";
    getUserAndSendNotification(item.uid, users, bodyRequest, route);
    navigation.goBack();
  };

  const handleReject = async (item) => {
    const bodyRequest = "Counter Offer Rejected";
    const route = "Listings";
    getUserAndSendNotification(item.uid, users, bodyRequest, route);
    navigation.goBack();
  };

  const handlePress = () => {
    navigation.navigate("myoffers", data);
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="My Listings Offers"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topBtn}>
          <AppButton
            title="View Booking Requests"
            color={COLORS.secondary}
            onPress={handlePress}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getLisings} />
            }
          >
            <View style={{ flex: 1, height: Dimensions.get("window").height }}>
              {data.offers.length > 0 ? (
                <FlatList
                  data={data.offers}
                  keyExtractor={(item) => item.offerId}
                  renderItem={({ item }) => (
                    <View style={styles.offerContainer}>
                      <WithHeading heading="Price Offered:" data={item.price} />
                      <WithHeading
                        heading="Message Attached:"
                        data={item.message}
                      />
                      <View style={styles.offerBtnContainer}>
                        <AppButton
                          title="Accept Offer"
                          onPress={() => handleAccept(item)}
                          color={colors.primary}
                        />
                        <AppButton
                          title="Reject Offer"
                          onPress={() => handleReject(item)}
                          color={colors.secondary}
                        />
                      </View>
                    </View>
                  )}
                />
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

                  <LargeText
                    style={{ color: COLORS.primary, textAlign: "center" }}
                  >
                    No Offers Found
                  </LargeText>

                  <LargeText
                    style={{ color: COLORS.primary, textAlign: "center" }}
                  >
                    Please try again later
                  </LargeText>

                  <TouchableOpacity
                    style={{
                      backgroundColor: COLORS.primary,
                      padding: 10,
                      borderRadius: 5,
                      marginTop: 10,
                    }}
                    onPress={() => getLisings()}
                  >
                    <LargeText style={{ color: COLORS.white }}>
                      Try Again
                    </LargeText>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animations/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default ViewMyHomeOffers;

const styles = StyleSheet.create({
  containers: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  main: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
  },
  topBtn: {
    marginHorizontal: 50,
  },
  offerContainer: {
    marginHorizontal: 20,
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 15,
  },
  offerBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
