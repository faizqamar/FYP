import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";

import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppButton from "./AppButton";

const AppLocationPicker = ({
  onPressSelectLocation,
  theRegion,
  setTheRegion,
  modalVisible,
  setModalVisible,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPressSelectLocation}>
        <View style={styles.mainContainer}>
          {selectedLocation ? (
            <Text style={styles.placeholderText}>Change Location</Text>
          ) : (
            <Text style={styles.placeholderText}>Select Location</Text>
          )}
        </View>
      </TouchableOpacity>
      <Modal visible={modalVisible}>
        <AppButton
          title="Select Location"
          onPress={() => setModalVisible(false)}
        />
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
              }}
            />
          </View>

          <MapView
            style={{ flex: 1 }}
            initialRegion={theRegion}
            region={theRegion}
          >
            <Marker
              coordinate={selectedLocation}
              title="Drag to change location"
              draggable
              onDragEnd={(e) => {
                setSelectedLocation(e.nativeEvent.coordinate);
              }}
              onPress={() => console.log("Marker pressed")}
            ></Marker>
          </MapView>
        </View>
      </Modal>
    </>
  );
};

export default AppLocationPicker;

const styles = StyleSheet.create({
  mainModalContainer: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 17,
    borderRadius: 8,
    marginVertical: 25,
  },
  placeholderText: {
    color: COLORS.gray,
    fontFamily: FONTS.regular,
    fontSize: 14,
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
});
