import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";

import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { ListingsContext } from "../context/listingContext";
import { COLORS } from "../constants/theme";

const MapScreen = () => {
  const [theRegion, setTheRegion] = React.useState({
    //islamabad comsats university
    latitude: 33.7215,
    longitude: 73.0433,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const { listings, setListings } = React.useContext(ListingsContext);
  const [listing, setListing] = React.useState(null);

  const [selectedLocation, setSelectedLocation] = React.useState(theRegion);

  React.useLayoutEffect(() => {
    setSelectedLocation(theRegion);
  }, [theRegion]);

  const navigation = useNavigation();

  const handleMarkerPress = (listing) => {
    setListing(listing);
  };

  return (
    <MainScreen>
      <AppHeader titleScreen="Map Screen" onPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <View style={styles.search}>
          <GooglePlacesAutocomplete
            styles={{ textInput: styles.input }}
            placeholder="Search"
            fetchDetails={true}
            GooglePlacesSearchQuery={{
              rankby: "distance",
            }}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              setTheRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              });
              console.log(details.geometry.location);
              //set region to the selected location coordinates
            }}
            query={{
              key: "AIzaSyDxkPKY9o1rX6Zf3FdJe3Ti5qBxJ71KU4U",
              language: "en",
              components: "country:pk",
              types: "establishment",

              radius: 30000,
              location: `${theRegion.latitude}, ${theRegion.longitude}`,
            }}
          />
        </View>
        <MapView
          style={{ flex: 1 }}
          region={theRegion}
          onRegionChangeComplete={(region) => setTheRegion(region)}
        >
          {listings.map((listing, index) => (
            <View key={index}>
              <Marker
                coordinate={listing.mapLocation}
                title="listing"
                onPress={() => handleMarkerPress(listing)}
                //show a custom marke
                //set size of marker image
                style={{ width: 20, height: 20 }}
              ></Marker>
            </View>
          ))}
        </MapView>
        <View style={styles.bottomAbsoluteContainer}>
          {listing && (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", listing)}
            >
              <View style={styles.listingCard}>
                <Text style={styles.listingCardText}>See this Listing</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </MainScreen>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  bottomAbsoluteContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    left: 50,
  },
  input: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#888",
    fontSize: 18,
    borderWidth: 2,
    color: "#888",
  },

  search: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    zIndex: 1,
  },
  listingCard: {
    padding: 15,
    backgroundColor: COLORS.white,
  },
  listingCardText: {},
});
