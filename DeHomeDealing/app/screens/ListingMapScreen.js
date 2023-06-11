//react native map screen with marker at location getting from the route params
//react native map screen with marker at location getting from the route params

import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import AppHeader from "../components/AppHeader";
import MainScreen from "../components/MainScreen";

const ListingMapScreen = ({ route }) => {
  const navigation = useNavigation();
  const [theRegion, setTheRegion] = useState({
    latitude: route.params.latitude,
    longitude: route.params.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <MainScreen>
      <View style={styles.container}>
        <AppHeader
          titleScreen="Map Screen"
          onPress={() => navigation.goBack()}
        />
        <MapView
          style={styles.map}
          region={theRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: route.params.latitude,
              longitude: route.params.longitude,
            }}
            title="Property Location"
            description="This is the location of the property"
          />
        </MapView>
      </View>
    </MainScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default ListingMapScreen;
