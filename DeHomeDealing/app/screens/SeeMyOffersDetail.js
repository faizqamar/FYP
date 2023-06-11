import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import WithHeading from "../components/WithHeading";
import { FONTS, COLORS } from "../constants/theme";
import moment from "moment";
import AppButton from "../components/AppButton";
import { randomString, getUserAndSendNotification } from "../global/functions";
import { BanksContext } from "../context/banksContext";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AllUsersContext } from "../context/allUsersContext";

import LottieView from "lottie-react-native";

const SeeMyOffersDetail = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();
  const { banks, setBanks } = React.useContext(BanksContext);
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log("hehhehhehehehehehehhehehehehehehehehe", data);
  }, []);

  const myDateFrom = moment(data.dateFrom).format("DD MMM YYYY");
  if (data.dateTo) {
    var myDateTo = moment(data.dateTo).format("DD MMM YYYY");
  }

  const moveToChat = () => {
    navigation.navigate("commentscreen", data);
  };

  const seeAgreement = () => {
    navigation.navigate("viewtheagreement", data);
  };
  const updateBookingDoc = async () => {
    const docRef = doc(db, "bookings", data.bookingId);
    await updateDoc(docRef, {
      isAccepted: true,
      status: "accepted",
    });
  };

  const placeOrder = async () => {
    setLoading(true);

    const aRandomString = randomString(30);
    //
    const myData = {
      messagesId: data.messageId,
      bookingId: data.bookingId,
      owner: data.listing.postedBy,
      user: data.userData,
      orderStatus: "started",
      paymentStatus: "pending",
      listing: data.listing.listingId,
      type: data.type,
      price: data.price,
    };

    //add doc in orders collection where doc id is the orderId
    const docRef = doc(db, "orders", aRandomString);
    await setDoc(docRef, {
      messagesId: myData.messagesId,
      orderId: aRandomString,
      bookingId: myData.bookingId,
      owner: myData.owner,
      price: myData.price,
      user: myData.user,
      orderStatus: myData.orderStatus,
      paymentStatus: myData.paymentStatus,
      listingId: myData.listing,
      type: myData.type,
      orderPlacedAt: moment(new Date()).format("DD MMM YYYY"),
    })
      .then(() => {
        const bodyRequest = "woooh! You have a new order.";
        const route = "ownerorders";
        updateBookingDoc();

        getUserAndSendNotification(myData.owner.uid, users, bodyRequest, route);
        setLoading(false);
        navigation.navigate("ownerorders");
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        setLoading(false);
        navigation.goBack();
      });
  };

  return (
    <>
      {!data.isAccepted ? (
        <MainScreen>
          <AppHeader
            titleScreen="Offer Detail"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.title}>Offer Details</Text>
          <View style={styles.mainContainer}>
            <WithHeading heading="Request for:" data={data.type} />
            <WithHeading heading="Requested by:" data={data.user} />
            <WithHeading heading="Request Title:" data={data.title} />
            {data.price && <WithHeading heading="Price:" data={data.price} />}
            <WithHeading data={myDateFrom} heading="Needed From:" />
            {myDateTo && <WithHeading data={myDateTo} heading="Date To:" />}

            <View style={styles.innerContainer}>
              <AppButton
                title="Chat"
                onPress={moveToChat}
                color={COLORS.primary}
              />
              <AppButton
                title="See Agreement"
                onPress={seeAgreement}
                color={COLORS.secondary}
              />
            </View>

            {data.agreement && (
              <View>
                <Text style={styles.agreeTerms}>
                  Agree With Terms&Conditions
                </Text>

                <View style={styles.bottomBtnContainer}>
                  <AppButton title="Place order" onPress={placeOrder} />
                </View>
              </View>
            )}
          </View>
        </MainScreen>
      ) : (
        <MainScreen>
          <AppHeader
            titleScreen="Offer Detail"
            onPress={() => navigation.goBack()}
          />
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.title}>Offer Details</Text>
            <View>
              <AppButton
                title="Go To Orders"
                onPress={() => navigation.navigate("myorders")}
              />
            </View>
          </View>
        </MainScreen>
      )}
      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
          }}
        >
          <LottieView
            source={require("../../assets/animations/order.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default SeeMyOffersDetail;

const styles = StyleSheet.create({
  agreeTerms: {
    fontSize: 16,
    fontFamily: FONTS.semiBold,
    marginVertical: 5,
    textAlign: "center",
  },
  bottomBtnContainer: {},
  mainContainer: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
