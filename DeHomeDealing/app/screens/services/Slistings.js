import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants/theme";
import { ExtraLargeText } from "../../components/texts";
import servicecolors from "../../config/servicecolors";
import ServiceCard from "../../components/ServiceCard";
import colors from "../../config/colors";
import MainScreen from "../../components/MainScreen";
import LottieView from "lottie-react-native";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import AppHeader from "../../components/AppHeader";

const Slistings = ({ navigation, route }) => {
  const [listings, setListings] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [dataLength, setDataLength] = React.useState();
  const labels = route.params.label;

  useEffect(() => {
    getLisings();
    // testing();
    // return;
  }, []);

  const testing = () => {
    console.log("testing");
    console.log(labels);
  };

  const getLisings = async () => {
    try {
      setLoading(true);
      const colRef = collection(db, "servicelistings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      console.log(myData);
      //store data in AsyncStorage
      //filter the data where label==labels
      const filteredData = myData.filter((item) =>
        item.category.label.toLowerCase().includes(labels.toLowerCase())
      );
      console.log("Filtered Data", filteredData);
      setListings(filteredData);
      if (filteredData.length == 0) {
        setDataLength(true);
      } else {
        setDataLength(false);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const label = route.params.label;
  return (
    <>
      <MainScreen>
        {dataLength && (
          <>
            <AppHeader
              titleScreen={label}
              onPress={() => navigation.goBack()}
            />
            <View style={styles.noDataContainer}>
              <Text>No Listings available</Text>
            </View>
          </>
        )}
        {!dataLength && (
          <View style={{ flex: 1, backgroundColor: colors.light }}>
            <View style={styles.headingContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.iconContainer}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={30}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
              <ExtraLargeText>{label}</ExtraLargeText>
            </View>
            <View style={styles.listingContainer}>
              <FlatList
                data={listings}
                keyExtractor={(item) => item.description}
                renderItem={({ item }) => (
                  <ServiceCard
                    title={item.title}
                    price={item.total}
                    onPress={() =>
                      navigation.navigate("servicelistingdetails", item)
                    }
                  />
                )}
              />
            </View>
          </View>
        )}
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            loop
            autoPlay
            source={require("../../animations/loader.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default Slistings;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    marginHorizontal: 15,
    borderLeftColor: servicecolors.three,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 2,
    backgroundColor: servicecolors.three,
    borderRadius: 8,
    marginRight: 15,
  },
  listingContainer: {
    flex: 1,
    padding: 10,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
