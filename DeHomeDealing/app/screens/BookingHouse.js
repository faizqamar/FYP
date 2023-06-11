import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../components/form";
import AppFormDatePicker from "../components/form/AppFormDatePicker";

import * as yup from "yup";
import moment from "moment";
import { getUserAndSendNotification, randomString } from "../global/functions";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import LottieView from "lottie-react-native";
import { auth, db } from "../../firebase";
import { AllUsersContext } from "../context/allUsersContext";

const validationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .label("Name"),
  dateFrom: yup
    .string()
    .required()
    .label("Date From"),
  dateTo: yup
    .string()
    .required()
    .label("Date To"),
  price: yup

    .string()
    .required()
    .label("Price"),
});

const buyValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .label("Name"),
  dateFrom: yup
    .string()
    .required()
    .label("Date From"),
  price: yup
    .string()
    .required()
    .label("Price"),
});

const BookingHouse = ({ route }) => {
  const data = route.params;
  const navigation = useNavigation();

  const [buy, setBuy] = React.useState(false);
  const [rent, setRent] = React.useState(false);
  const { user, setUser, userDataLoading } = React.useContext(UserContext);
  const [loading, setLoading] = React.useState(false);
  const { users, setUsers } = React.useContext(AllUsersContext);

  React.useEffect(() => {
    console.log("UUUUUUUUUUUUU", user);
    if (data.category.label === "Rent") {
      setRent(true);
      setBuy(false);
    } else {
      setBuy(true);
      setRent(false);
    }
    getUser();
  }, []);

  const getUser = async () => {
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();
    setUser(userData);
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEE", userData);
  };

  const handleRentBooking = async (values) => {
    setLoading(true);
    const dateFrom = moment(values.dateFrom).toISOString();
    const dateTo = moment(values.dateTo).toISOString();
    const title = values.title;
    const price = values.price;

    const rentData = {
      title,
      dateFrom,
      dateTo,
      price,
    };

    const docId = randomString(35);
    const messageId = randomString(35);

    setDoc(doc(db, "bookings", docId), {
      listingId: data.listingId,
      bookingId: docId,
      userId: user.uid,
      user: user.username,
      userData: user,
      title: rentData.title,
      dateFrom: rentData.dateFrom,
      dateTo: rentData.dateTo,
      sentAt: moment().toISOString(),
      listing: data,
      status: "pending",
      type: "rent",
      messageId: messageId,
      price: rentData.price,
    })
      .then(() => {
        Alert.alert("Booking Sent");
        setLoading(false);
        //create a doc with id as the messageId in comments collection
        const bodyRequest = "You have a new booking request for your listing";
        const route = "viewmyhomeoffers";
        getUserAndSendNotification(
          data.postedBy.uid,
          users,
          bodyRequest,
          route
        );
        setDoc(doc(db, "comments", messageId), {
          messages: [
            {
              message: "Trip Created",
              user: user,
              time: moment().format("MMMM Do YYYY, h:mm a"),
            },
          ],
        });

        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };

  const handleBuyBooking = async (values) => {
    setLoading(true);
    const dateFrom = moment(values.dateFrom).toISOString();
    const price = values.price;
    const title = values.title;

    const buyData = {
      title,
      dateFrom,
      price,
    };

    const docId = randomString(35);
    const messageId = randomString(35);

    setDoc(doc(db, "bookings", docId), {
      listingId: data.listingId,
      bookingId: docId,
      userId: user.uid,
      user: user.username,
      userData: user,
      title: buyData.title,
      dateFrom: buyData.dateFrom,
      price: buyData.price,
      sentAt: moment().toISOString(),
      listing: data,
      status: "pending",
      type: "buy",
      messageId: messageId,
    })
      .then(() => {
        Alert.alert("Booking Request Sent");
        setLoading(false);
        const bodyRequest = "You have a new booking request for your listing";
        const route = "viewmyhomeoffers";
        getUserAndSendNotification(
          data.postedBy.uid,
          users,
          bodyRequest,
          route
        );
        //create a doc with id as the messageId in comments collection
        setDoc(doc(db, "comments", messageId), {
          messages: [
            {
              message: "Booking discussion",
              user: user,
              time: moment().format("MMMM Do YYYY, h:mm a"),
            },
          ],
        });

        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Booking House"
          onPress={() => navigation.goBack()}
        />

        {rent && (
          <View style={styles.container}>
            <Text style={styles.title}>Book House For Rent</Text>

            <AppForm
              initialValues={{
                name: "",
                dateFrom: "",
                dateTo: "",
                price: "",
              }}
              onSubmit={(values) => handleRentBooking(values)}
              validationSchema={validationSchema}
            >
              <AppFormField name="title" placeholder="Title" icon="text" />
              <AppFormDatePicker name="dateFrom" placeholder="Date From:" />
              <AppFormDatePicker name="dateTo" placeholder="Date To:" />
              <AppFormField name="price" placeholder="Price" icon="cash" />

              <View style={styles.btn}>
                <SubmitButton title="Send Booking Request" />
              </View>
            </AppForm>
          </View>
        )}
        {buy && (
          <View style={styles.container}>
            <Text style={styles.title}>Own a House</Text>
            <AppForm
              initialValues={{
                title: "",
                dateFrom: "",
                price: "",
              }}
              validationSchema={buyValidationSchema}
              onSubmit={(values) => handleBuyBooking(values)}
            >
              <AppFormField name="title" placeholder="Title" icon="text" />
              <AppFormDatePicker name="dateFrom" placeholder="Date From:" />
              <AppFormField name="price" placeholder="Price" icon="cash" />

              <View style={styles.btn}>
                <SubmitButton title="Send Booking Request" />
              </View>
            </AppForm>
          </View>
        )}
      </MainScreen>
      <Modal visible={userDataLoading && loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/request.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default BookingHouse;

const styles = StyleSheet.create({
  btn: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 20,
    color: COLORS.primary,
  },
});
