import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { ListingsContext } from "../context/listingContext";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";

import * as Yup from "yup";
import { FONTS, COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryPickerItem from "../components/CategoryPickerItem";

import { areas, cities } from "../data/store";

const initialValues = {
  maxPrice: 0,
  numberOfBedrooms: 0,
  numberOfBathrooms: 0,
  minArea: 0,
};

const validationSchema = Yup.object().shape({
  maxPrice: Yup.number().required().min(1).label("Max Price"),
  numberOfBedrooms: Yup.number().required().min(1).label("Number of Bedrooms"),
  numberOfBathrooms: Yup.number()
    .required()
    .min(1)
    .label("Number of Bathrooms"),
  city: Yup.object().required().label("City"),
  area: Yup.object().required().label("Area"),
  minArea: Yup.number().required().min(1).label("Min Area"),
});

const SearchHouse = () => {
  const [loading, setLoading] = React.useState(false);
  const [theArray, setTheArray] = React.useState([]);

  const { listings, setListings, loadListings, setLoadListings } =
    React.useContext(ListingsContext);
  const [filtered, setFiltered] = React.useState(listings);
  const navigation = useNavigation();

  const handleSearch = (values) => {
    const myMaxPrice = parseInt(values.maxPrice);
    const myNmberOfBedrooms = parseInt(values.numberOfBedrooms);
    const myNumberOfBathrooms = parseInt(values.numberOfBathrooms);
    const myCity = values.city.label;
    const myMinArea = parseInt(values.minArea);
    const myArea = values.area;

    const result = listings.filter((item) => {
      return (
        item.total <= myMaxPrice &&
        item.bathrooms >= myNumberOfBathrooms &&
        item.bedrooms >= myNmberOfBedrooms &&
        item.city?.label === myCity &&
        item.area?.label === myArea &&
        item.size <= myMinArea
      );
    });

    if (result.length > 0) {
      setTheArray(result);
      navigation.navigate("searchedlistings", theArray);
    } else {
      setTheArray(listings);
      navigation.navigate("searchedlistings", theArray);
    }
  };

  return (
    <MainScreen>
      <AppHeader
        titleScreen="Search House"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search House</Text>
        <AppForm
          initialValues={initialValues}
          onSubmit={(values) => handleSearch(values)}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="maxPrice"
            placeholder="Max Price"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormField
            name="numberOfBedrooms"
            placeholder="Min. Number of Bedrooms"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormField
            name="numberOfBathrooms"
            placeholder="Min. Number of Bathrooms"
            keyboardType="numeric"
            width="48%"
          />
          <AppFormPicker
            items={cities}
            name="city"
            placeholder="Select City"
            PickerItemComponent={CategoryPickerItem}
            numOfColumns={3}
          />
          <AppFormPicker items={areas} name="area" placeholder="Select Area" />

          <AppFormField
            name="minArea"
            placeholder="Min Area (marla)"
            keyboardType="numeric"
            width="48%"
          />

          <SubmitButton title="Search" />
        </AppForm>
      </View>
    </MainScreen>
  );
};

export default SearchHouse;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 25,
    marginVertical: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginBottom: 20,
    textAlign: "center",
    color: COLORS.secondary,
  },
});
