import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeInFavorites } from "../global/functions";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import { ListingsContext } from "../context/listingContext";

const Recommender = () => {
  const [myArray, setMyArray] = React.useState([]);
  const navigation = useNavigation();

  const { listings, setListings } = React.useContext(ListingsContext);

  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    //get all recommended listings stored in async storage and set it to myArray
    getTheArray();
  }, [myArray]);

  const getTheArray = async () => {
    setLoading(true);
    try {
      //get all recommended listings stored in async storage and set it to myArray
      const value = await AsyncStorage.getItem("recommendedListings");
      if (value !== null) {
        setMyArray(JSON.parse(value));
        getRecommendedListings();
      }
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  //function that get at leaset 3 listings objects if length is three from myArray and take their tags listing.category.label and store them in the labels array and also take tags from listing.city.label and store them in the city array and then compare the two arrays and return the listings that have the same tags
  const getRecommendedListings = () => {
    var labels = [];
    var city = [];
    var recommendedListings = [];
    if (myArray.length >= 3) {
      for (let i = 0; i < 3; i++) {
        labels.push(myArray[i].category.label);
        city.push(myArray[i].city.label);
      }
      for (let i = 0; i < listings.length; i++) {
        if (
          labels.includes(listings[i].category.label) &&
          city.includes(listings[i].city.label)
        ) {
          recommendedListings.push(listings[i]);
        }
      }

      return recommendedListings;
    } else {
      setMyArray(listings);
    }
  };

  return (
    <MainScreen>
      <AppHeader
        titleScreen="Recommended"
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.titleMain}>Recommended Listings</Text>
        <View style={{ flex: 1 }}>
          <ScrollView>
            {myArray.length > 0 ? (
              myArray.map((item, index) => (
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
              ))
            ) : (
              <View style={styles.mainNo}>
                <Text>No Recommended Listings</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </MainScreen>
  );
};

export default Recommender;

const styles = StyleSheet.create({
  mainNo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titleMain: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
});
