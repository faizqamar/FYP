import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default useUser = () => {
  const [user, setUser] = React.useState({});

  const getUser = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        // value previously stored
        setUser(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  return user;
};
