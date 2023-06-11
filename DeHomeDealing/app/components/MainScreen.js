import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

import Constants from "expo-constants";
const MainScreen = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>{children}</View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
});
