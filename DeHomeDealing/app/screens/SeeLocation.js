import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MapView, { Marker } from "react-native-maps";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";

const SeeLocation = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  return (
    <MainScreen>
      <AppHeader
        titleScreen="User's Location"
        onPress={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: data?.latitude,
            longitude: data?.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: data?.latitude,
              longitude: data?.longitude,
            }}
            title="User's Location"
            description="User Posted ad from this location"
          />
        </MapView>
      </View>
    </MainScreen>
  );
};

export default SeeLocation;

const styles = StyleSheet.create({});
