import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ExtraLargeText } from "../../components/texts";
import { FlatList } from "react-native";
import { COLORS } from "../../constants/theme";
import servicecolors from "../../config/servicecolors";
import { serviceTypes } from "../../data/store";
import ServiceType from "../../components/ServiceType";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import MainScreen from "../../components/MainScreen";

const AllServices = ({ navigation }) => {
  return (
    <MainScreen>
      <View style={{ flex: 1, backgroundColor: COLORS.white }}>
        <View style={styles.headingContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.iconContainer}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <ExtraLargeText>All Categories</ExtraLargeText>
        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            numColumns={3}
            data={serviceTypes}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <ServiceType
                label={item.label}
                color={item.backgroundColor}
                icon={item.icon}
                numColumns={3}
                onPress={() =>
                  navigation.navigate("slistings", {
                    label: item.label,
                  })
                }
              />
            )}
          />
        </View>
      </View>
    </MainScreen>
  );
};

export default AllServices;

const styles = StyleSheet.create({
  headingContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
    borderLeftWidth: 3,
    marginHorizontal: 15,
    borderLeftColor: servicecolors.three,
    borderRadius: 20,
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    padding: 2,
    backgroundColor: servicecolors.three,
    borderRadius: 8,
    marginRight: 15,
  },
});
