import { Linking, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../../constants/theme";
import WithHeading from "../../components/WithHeading";
import AppButton from "../../components/AppButton";
import colors from "../../config/colors";

const ServiceBookingDetails = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("View Details Pressed");
    navigation.navigate("servicescommentscreen", data);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${data.owner.phoneNumber}`);
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Service Booking Detail"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Booking Details</Text>
          <View>
            <WithHeading heading="Needed on:" data={data.date} />
            <WithHeading heading="Location:" data={data.location} />
            <WithHeading heading="At Date:" data={data.date} />
            <WithHeading heading="At Time:" data={data.time} />
            <WithHeading heading="Request Status:" data={data.status} />

            <View>
              <AppButton
                title="Chat"
                onPress={handlePress}
                color={colors.primary}
              />
              <AppButton
                title="Call Service Provider"
                onPress={handleCall}
                color={colors.secondary}
              />
            </View>
          </View>
        </View>
      </MainScreen>
    </>
  );
};

export default ServiceBookingDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
});
