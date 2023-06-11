import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { Alert } from "react-native";
import { sendNotification } from "../api/expoPushToken";
export const randomString = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

//function that takes a date as input and returns the time in format hh:mm am/pm
export const getTime = (date) => {
  return moment(date).format("hh:mm a");
};

//function that takes a date as input and returns the date in format dddd, MMMM Do YYYY
export const getDate = (date) => {
  return moment(date).format("dddd, MMMM Do YYYY");
};

export const getUserAndSendNotification = async (
  id,
  users = [],
  bodyRequest,
  route
) => {
  //find the user with the id in the users array and get the token
  const user = users.find((user) => user.uid === id);
  if (user.token) {
    const token = user.token;
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnn", token);
    //send notification to the user
    const message = {
      to: token,
      sound: "default",
      title: "De Home Dealing",
      body: bodyRequest,
      data: { route: route },
    };

    sendNotification(message);
  }
};

export const storeInFavorites = async (listing) => {
  //get favorite listings from async storage
  const favorites = await AsyncStorage.getItem("favorites");
  //if favorites is not null, parse it to json
  const favoritesJson = favorites !== null ? JSON.parse(favorites) : [];
  //add the listing to the favorites array
  favoritesJson.push(listing);
  //save the favorites array to async storage
  await AsyncStorage.setItem("favorites", JSON.stringify(favoritesJson));
  Alert.alert("Listing added to favorites");
};

//a function that stores the listing in a async storage array recommendedListings and returns the array
export const storeInRecommendedListings = async (listing) => {
  //get recommended listings from async storage
  const recommendedListings = await AsyncStorage.getItem("recommendedListings");
  //if recommended listings is not null, parse it to json
  const recommendedListingsJson =
    recommendedListings !== null ? JSON.parse(recommendedListings) : [];
  //add the listing to the recommended listings array
  recommendedListingsJson.push(listing);
  //save the recommended listings array to async storage
  await AsyncStorage.setItem(
    "recommendedListings",
    JSON.stringify(recommendedListingsJson)
  );
  return recommendedListingsJson;
};
