import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import ScreenHeader from "../components/ScreenHeader";
import ReportsComponent from "../components/ReportsComponent";
import MainScreen from "../components/MainScreen";

const ReportsScreen = ({ navigation }) => {
  return (
    <MainScreen>
      <ScreenHeader headerText="Reports" onPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.innerContainer}>
            <ReportsComponent
              icon="file-eye"
              text="Liked Listings"
              onPress={() => navigation.navigate("showfav")}
            />
            <ReportsComponent
              icon="ticket-account"
              text="Previous Bookings"
              onPress={() => navigation.navigate("previousbookings")}
            />
            <ReportsComponent
              icon="account-cash"
              text="Payments"
              onPress={() => navigation.navigate("showpayments")}
            />
          </View>
        </ScrollView>
      </View>
    </MainScreen>
  );
};

export default ReportsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
});
