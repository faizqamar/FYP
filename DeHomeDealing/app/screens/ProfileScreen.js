import { StyleSheet, Text, View, Image, ScrollView, Modal } from "react-native";
import React from "react";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";
import LinkComponents from "../components/LinkComponents";
import AppButton from "../components/AppButton";
import { auth } from "../../firebase";
import MainScreen from "../components/MainScreen";
import LottieView from "lottie-react-native";
import { UserContext } from "../context/userContext";
import servicecolors from "../config/servicecolors";
import useUser from "../hooks/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = ({ navigation }) => {
  const user = useUser();
  const [name, setName] = React.useState("");

  const handleLogout = () => {
    auth.signOut();
    //remove user from async storage
    AsyncStorage.removeItem("user");
  };

  return (
    <>
      <MainScreen>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <ScreenHeader
            headerText="Profile"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.topContainer}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                source={
                  user.profileImage
                    ? { uri: user.profileImage }
                    : require("../../assets/images/many/mosh.jpg")
                }
                style={styles.image}
              />
            </View>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.bioText}>{user.email}</Text>
          </View>
          <View style={styles.midContainer}>
            <Text style={styles.midTitle}>My Housing</Text>
            <LinkComponents
              title="My Listings"
              icon="post"
              onPress={() => navigation.navigate("Mylisting")}
              iconStyle={servicecolors.two}
            />
            <LinkComponents
              title="My Sent Offers"
              icon="cash"
              onPress={() => navigation.navigate("mysentoffers")}
              iconStyle={servicecolors.seven}
            />
            <LinkComponents
              title="My Orders"
              icon="cash"
              onPress={() => navigation.navigate("myorders")}
            />
            <LinkComponents
              title="Listings Orders"
              icon="cash"
              onPress={() => navigation.navigate("ownerorders")}
              iconStyle={COLORS.primary}
            />
            <LinkComponents
              title="Reports"
              iconStyle={colors.secondary}
              icon="information"
              onPress={() => navigation.navigate("Reports")}
            />
            <LinkComponents
              title="Services Listings Offers"
              iconStyle="brown"
              icon="face-man"
              onPress={() => navigation.navigate("serviceoffersreceived")}
            />
            <LinkComponents
              title="Service Bookings"
              iconStyle="cyan"
              icon="face-man"
              onPress={() => navigation.navigate("mybookingrequests")}
            />
            <LinkComponents
              title="Service Orders"
              iconStyle="black"
              icon="face-man"
              onPress={() => navigation.navigate("userviceorders")}
            />
            <LinkComponents
              title="Listing Services Orders"
              iconStyle="green"
              icon="face-man"
              onPress={() => navigation.navigate("oserviceorders")}
            />
            <LinkComponents
              title="Locations"
              iconStyle="green"
              icon="face-man"
              onPress={() => navigation.navigate("mapscreen")}
            />
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.midTitle}>General</Text>
            <LinkComponents
              title="Update Profile"
              iconStyle="orange"
              icon="update"
              onPress={() => navigation.navigate("updateprofile")}
            />
            <LinkComponents
              title="Recommended Listings"
              iconStyle="purple"
              icon="email"
              onPress={() => navigation.navigate("recommended")}
            />
            <LinkComponents
              title="Report a problem"
              iconStyle="#ee6c4d"
              icon="alarm-multiple"
              onPress={() => navigation.navigate("report")}
            />
          </View>

          <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
            <AppButton title="log Out" onPress={() => handleLogout()} />
          </View>
        </ScrollView>
      </MainScreen>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioText: {
    fontFamily: FONTS.medium,
    color: COLORS.secondary,
  },
  bottomContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  topContainer: {
    height: 273,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 150,
    width: 150,
    overflow: "hidden",
  },
  imageContainer: {
    overflow: "hidden",
  },
  midContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  midTitle: {
    fontFamily: FONTS.bold,
    fontSize: 20,
    color: COLORS.primary,
    marginBottom: 10,
  },
  name: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    color: colors.white,
    marginVertical: 7,
  },
});
