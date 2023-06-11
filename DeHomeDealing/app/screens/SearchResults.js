import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";

import Card from "../components/Card";
import ActivityIndicator from "../components/animation/ActivityIndicator";
import LottieView from "lottie-react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { LargeText } from "../components/texts";
import { COLORS } from "../constants/theme";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import MainScreen from "../components/MainScreen";
import AppTextInput from "../components/AppTextInput";
import { ListingsContext } from "../context/listingContext";
import { storeInFavorites } from "../global/functions";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);

  const { listings, setListings, loadListings } = React.useContext(
    ListingsContext
  );
  const [newData, setNewData] = React.useState(listings);

  React.useEffect(() => {
    console.log("Listings Screen", listings);
  }, []);

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (value) => {
    if (!value.length) return setNewData(listings);

    const filteredData = listings.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    if (filteredData.length) {
      setNewData(filteredData);
    } else {
      setNewData(listings);
    }
  };

  return (
    <>
      <MainScreen>
        <View style={{ flex: 1, paddingBottom: 40, marginBottom: 100 }}>
          <ActivityIndicator visible={loading} />
          <View style={styles.headerr}>
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={25}
                color={COLORS.primary}
              />
            </TouchableOpacity>
            <LargeText style={{ color: COLORS.white }}>Listings</LargeText>
          </View>
          {listings.length > 0 ? (
            <View style={{ marginHorizontal: 10 }}>
              <View style={styles.searchBoxStyle}>
                <AppTextInput
                  placeholder="Search House"
                  onChangeText={(text) => handleSearch(text)}
                  icon="magnify"
                />
              </View>

              <ScrollView
                refreshControl={
                  <RefreshControl refreshing={loading} onRefresh={getLisings} />
                }
              >
                {newData.map((item, index) => {
                  return (
                    <View key={index}>
                      <Card
                        title={item.title}
                        bedroom={item.bedrooms}
                        bathroom={item.bathrooms}
                        price={item.total}
                        imgUrl={item.image[0]}
                        onPress={() => {
                          navigation.navigate("Details", item);
                        }}
                        onPressHeart={() => storeInFavorites(item)}
                      />
                    </View>
                  );
                })}
              </ScrollView>
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
                No Listings Found
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
                onPress={() => getLisings()}
              >
                <LargeText style={{ color: COLORS.white }}>Try Again</LargeText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </MainScreen>
      <Modal visible={loadListings}>
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

export default SearchResults;

const styles = StyleSheet.create({
  headerr: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: COLORS.primary,
  },
  iconContainer: {
    padding: 2,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginRight: 15,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 5,
  },
  searchBoxStyle: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
