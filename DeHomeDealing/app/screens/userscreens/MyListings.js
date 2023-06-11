import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import MyListingCard from "../../components/MyListingCard";
import Card from "../../components/Card";

import LottieView from "lottie-react-native";
import AppHeader from "../../components/AppHeader";
import MainScreen from "../../components/MainScreen";
import { useNavigation } from "@react-navigation/native";
import { ListingsContext } from "../../context/listingContext";
import { FONTS } from "../../constants/theme";
import AppButton from "../../components/AppButton";

const MyListings = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { listings, setListings, loadListings } = React.useContext(
    ListingsContext
  );

  React.useEffect(() => {
    console.log("Listings Screen", listings);
  }, []);

  const myListings = listings.filter(
    (item) => item.userId === auth.currentUser.uid
  );

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="My Listings"
          onPress={() => navigation.goBack()}
        />

        {myListings.length > 0 ? (
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>My Listings</Text>
            <FlatList
              data={myListings}
              keyExtractor={(item) => item.listingId}
              renderItem={({ item }) => (
                <Card
                  rating="5"
                  title={item.title}
                  bedroom={item.bedrooms}
                  bathroom={item.bathrooms}
                  price={item.total}
                  imgUrl={item.image[0]}
                  btnTexto="View Offers"
                  onPress={() => {
                    navigation.navigate("viewmyhomeoffers", item);
                  }}
                  onPressHeart={() => Alert.alert("Added to favorite")}
                />
              )}
            />
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ fontSize: 20, fontFamily: FONTS.bold }}>
              You have no listings
            </Text>
          </View>
        )}
      </MainScreen>
      <Modal visible={loadListings}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../animations/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default MyListings;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 20,
  },
});
