import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import React from "react";

import { COLORS } from "../constants/theme";
import HomeHeader from "../components/HomeHeader";
import HomeSection from "../components/HomeSection";
import Card from "../components/Card";
import LinkButton from "../components/LinkButton";
import MainScreen from "../components/MainScreen";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/userContext";
import { ListingsContext } from "../context/listingContext";
import useLocation from "../hooks/useLocation";
import useUser from "../hooks/useUser";

const HomeScreen = ({ navigation }) => {
  const navigations = useNavigation();
  const { listings, loadListings } = React.useContext(ListingsContext);
  const [visibility, setVisibility] = React.useState(true);
  const location = useLocation();

  const user = useUser();

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setVisibility(false);
      console.log("user from async storage", user);
    }, 3000);
  }, [location]);

  return (
    <>
      <MainScreen>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.firstBg}></View>
            <View style={styles.mainContainer}>
              <HomeHeader
                onPressNav={() => navigations.openDrawer()}
                onPressPic={() => navigation.navigate("Profile")}
              />
              <HomeSection
                name={user.username}
                onPress={() => navigation.navigate("Verify")}
                user={user}
              />
              <View style={styles.btnsContainer}>
                <LinkButton
                  title="Listings"
                  onPress={() => navigation.navigate("Listings")}
                />
                <LinkButton
                  title="Agreement"
                  onPress={() => navigation.navigate("Agreement")}
                />
                <LinkButton
                  title="Services"
                  onPress={() => navigation.navigate("services")}
                />
              </View>
              <View style={styles.btnsContainer}>
                <LinkButton
                  title="Bank Details"
                  onPress={() => navigation.navigate("foryou")}
                />
                <LinkButton
                  title="Sell Service"
                  onPress={() => navigation.navigate("Selling")}
                />
                <LinkButton
                  title="QR Code"
                  onPress={() => navigation.navigate("qrcodescanner")}
                />
              </View>
              {listings.map((item, index) => (
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
                    onPressHeart={() => Alert.alert("Added to favorite")}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={visibility}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/house.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 20,
  },
  firstBg: {
    width: "100%",
    height: 400,
    backgroundColor: COLORS.primary,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  mainContainer: {
    flex: 1,
  },
});
