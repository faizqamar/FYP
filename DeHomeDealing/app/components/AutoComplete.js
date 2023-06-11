import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/theme";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const AutoComplete = ({ setAddress }) => {
  return (
    <GooglePlacesAutocomplete
      styles={{ textInput: styles.input }}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log("Dataaaaaaaaaaaaaaaaaaaaaaaaaaa", details);
        setAddress(details.description);
        //set region to the selected location coordinates
      }}
      query={{
        key: "AIzaSyDxkPKY9o1rX6Zf3FdJe3Ti5qBxJ71KU4U",
        language: "en",
        components: "country:pk",
      }}
    />
  );
};

export default AutoComplete;

const styles = StyleSheet.create({
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
});
