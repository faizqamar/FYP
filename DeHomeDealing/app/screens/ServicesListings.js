import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { ServicesListingsContext } from "../context/servicesContext";
import { COLORS, FONTS } from "../constants/theme";
import ServiceCard from "../components/ServiceCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const ServicesListings = () => {
  const navigation = useNavigation();
  const { servicesListings, setServicesListings } = React.useContext(
    ServicesListingsContext
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const getListings = async () => {
    setRefreshing(true);
    try {
      const colRef = collection(db, "servicelistings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //store data in AsyncStorage
      setServicesListings(myData);
      setRefreshing(false);
    } catch (error) {
      console.log(error);
      setRefreshing(false);
    }
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Services Listings"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Services Listings</Text>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={getListings} />
            }
          >
            {servicesListings.length > 0 ? (
              <View style={styles.mainIF}>
                {servicesListings.map((item, index) => (
                  <View key={index}>
                    <ServiceCard
                      onPress={() =>
                        navigation.navigate("servicelistingdetails", item)
                      }
                      title={item.title}
                      price={item.total}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View style={styles.noServiceContainer}>
                <Text style={styles.noServiceText}>No Services Listings</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </MainScreen>
    </>
  );
};

export default ServicesListings;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  mainIF: {
    flex: 1,
    marginHorizontal: 12,
  },
});
