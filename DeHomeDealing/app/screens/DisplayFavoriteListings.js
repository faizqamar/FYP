import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import { COLORS, FONTS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/Card";
import { useNavigation } from "@react-navigation/native";

import LottieView from "lottie-react-native";
const DisplayFavoriteListings = () => {
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation();

  const [favor, setFavor] = React.useState([]);

  const getFav = async () => {
    try {
      setLoading(true);
      //get the favorites from async storage
      const fav = await AsyncStorage.getItem("favorites");
      //parse the data
      const favData = JSON.parse(fav);
      //set the data to the state
      setFavor(favData);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    //after two seconds set loading to false
    getFav();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Favourites"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>My Favourites</Text>

          {favor.length > 0 ? (
            <View style={{ flex: 1 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {favor.map((item, index) => {
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
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>No Favourites Found</Text>
            </View>
          )}
        </View>
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

export default DisplayFavoriteListings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    marginVertical: 20,
    textAlign: "center",
  },
});
