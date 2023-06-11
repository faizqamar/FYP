import { FlatList, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import Card from "../components/Card";
import { storeInFavorites } from "../global/functions";

import LottieView from "lottie-react-native";

const SearchedListings = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    console.log(data);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Searched Listings"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Searched Listings</Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.docId.toString()}
            renderItem={({ item }) => (
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
            )}
          />
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/loading.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default SearchedListings;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 15,
  },
});
