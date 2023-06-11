import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { COLORS, FONTS } from "../constants/theme";
import { Linking } from "react-native";

import servicecolors from "../config/servicecolors";
import colors from "../config/colors";
import { RegularText, MediumText, LightText } from "../components/texts";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import IconicText from "../components/IconicText";
import AppButton from "../components/AppButton";
import CategoryPickerItem from "../components/CategoryPickerItem";
import PersonDetailsContainer from "../components/PersonDetailsContainer";
import CallToAction from "../components/CallToAction";
import MapView, { Marker } from "react-native-maps";

import QRCode from "react-native-qrcode-svg";
function ListingDetailsScreen({ route, navigation }) {
  const data = route.params;
  React.useEffect(() => {
    console.log("data", data);
  }, []);

  const handleBookings = () => {
    navigation.navigate("BookingHouse", data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.light }}>
      <ScrollView style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("detailedImage", data.image)}
        >
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: data.image[0] }} />
            <View style={styles.ratingContainer}>
              <MaterialCommunityIcons name="star" size={20} color="yellow" />
              <MediumText style={{ color: "white", marginHorizontal: 5 }}>
                {data.rating}
              </MediumText>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <RegularText style={styles.price}>
              Total PKR: {data.total}
            </RegularText>
          </View>
          <View style={styles.titleContainer}>
            <MediumText style={styles.title}>{data.title}</MediumText>
            <RegularText>📍{data.address}</RegularText>
            <LightText>📍{data.area.label}</LightText>
          </View>
        </View>
        <View style={styles.featuresContainer}>
          <IconicText icon="move-resize" title={data.size} />
          <IconicText icon="bed-double-outline" title={data.bedrooms} />
          <IconicText icon="bathtub-outline" title={data.bathrooms} />
        </View>
        <View style={styles.descriptionContainer}>
          <MediumText style={{ color: COLORS.primary }}>Description</MediumText>
          <LightText>{data.description}</LightText>
        </View>

        <View style={styles.propertyInfo}>
          <MediumText style={{ color: COLORS.primary }}>
            Property Type
          </MediumText>
          <CategoryPickerItem item={data.propertyType} />
          <MediumText style={{ color: COLORS.primary }}>Purpose</MediumText>
          <CategoryPickerItem item={data.category} />
          <MediumText style={{ color: COLORS.primary }}>City</MediumText>
          <CategoryPickerItem item={data.city} />
        </View>
        <View style={styles.btnContainer}>
          <CallToAction
            title="Call"
            style={{ backgroundColor: servicecolors.seven }}
            onPress={() => Linking.openURL(`tel:${data.phoneNumber}`)}
          />
          <CallToAction
            title="Chat"
            style={{ backgroundColor: servicecolors.three }}
            onPress={() => navigation.navigate("inbox", data)}
          />
        </View>
        <View style={styles.sendOfferContainer}>
          <AppButton
            title="Send Counter Offer"
            color={colors.primary}
            onPress={() => navigation.navigate("sendofferhome", data)}
          />
          <AppButton
            title="Book Now!"
            color={colors.secondary}
            onPress={handleBookings}
          />
        </View>
        <View
          style={{
            height: 150,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <QRCode value={data.listingId} />
        </View>
        <View>
          {data.postedBy.isVerified ? (
            <View style={styles.verifiedBox}>
              <Text style={styles.verifiedText}>Posted by a Verified User</Text>
            </View>
          ) : (
            <View style={styles.verifiedBox}>
              <Text style={styles.verifiedText}>
                Posted by a Non Verified User
              </Text>
            </View>
          )}
        </View>

        {data.location && (
          <View style={styles.locationBtn}>
            <AppButton
              title="Owner Location"
              onPress={() => navigation.navigate("seelocation", data.location)}
              color="#38b000"
            />
          </View>
        )}

        <View>
          <Text style={styles.locationTitle}>Location on Map</Text>
          <View style={styles.mapContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("listingmap", data.mapLocation)
              }
            >
              <Image
                resizeMode="cover"
                source={require("../../assets/images/google.png")}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.ownerDetailsContainer}>
          <PersonDetailsContainer
            onPress={() => navigation.navigate("viewfeedbacks")}
            ownerName={data.postedBy.username}
            onPressBtn={() => navigation.navigate("viewfeedbacks")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default ListingDetailsScreen;

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 15,
    backgroundColor: COLORS.white,
    marginHorizontal: 15,
    borderRadius: 15,
  },
  detailsContainer: {
    backgroundColor: servicecolors.white,
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  descriptionContainer: {
    padding: 10,
    backgroundColor: servicecolors.white,
    borderRadius: 15,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  featuresContainer: {
    backgroundColor: servicecolors.white,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "100%",
    height: 325,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: "hidden",
    elevation: 10,
  },
  sendOfferContainer: {
    marginVertical: 10,
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 15,
  },
  locationBtn: {
    marginVertical: 10,
    backgroundColor: colors.white,
    paddingHorizontal: 70,
  },
  price: {
    color: COLORS.white,
    paddingVertical: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    width: "100%",
    borderRadius: 15,
  },
  propertyInfo: {
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    backgroundColor: servicecolors.white,
  },
  ratingContainer: {
    position: "absolute",
    bottom: 20,
    right: 59,
    padding: 5,
    backgroundColor: colors.dark,
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 15,
  },
  title: {
    color: COLORS.primary,
  },
  titleContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  verifiedBox: {
    backgroundColor: COLORS.secondary,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  verifiedText: {
    color: COLORS.white,
    textAlign: "center",
    paddingVertical: 10,
    fontFamily: FONTS.semiBold,
  },
  mapBox: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
  },
  locationTitle: {
    marginVertical: 10,
    fontFamily: FONTS.bold,
    marginHorizontal: 20,
    fontSize: 20,
    color: COLORS.primary,
  },
  mapContainer: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 15,
    overflow: "hidden",
  },
});
