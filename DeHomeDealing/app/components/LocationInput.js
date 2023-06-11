//craete a component that will be used to display the location input using google places autocomplete

import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../env";

import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

const LocationInput = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [placeholder, setPlaceholder] = React.useState("Search Location");
  const [selectedLocation, setSelectedLocation] = React.useState({
    latitude: 33.6844,
    longitude: 73.0479,
  });

  const onSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <View style={styles.inputContainer}>
          <Text>{placeholder}</Text>
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <View style={styles.searchBox}>
            <GooglePlacesAutocomplete
              styles={{ textInput: styles.input }}
              placeholder="Search"
              onPress={(data, details = null) => {}}
              query={{
                key: GOOGLE_API_KEY,
                language: "en",
                components: "country:pk",
              }}
            />
          </View>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            region={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude,
              }}
            />
          </MapView>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: "#888",
    fontSize: 18,
    borderWidth: 2,
    color: COLORS.gray,
  },

  map: {
    flex: 1,
  },

  markerFixed: {
    left: "50%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
    top: "50%",
  },

  marker: {
    height: 48,
    width: 48,
  },

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
  searchBox: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});
