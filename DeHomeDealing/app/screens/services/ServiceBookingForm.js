import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";

import * as yup from "yup";
import AppFormDatePicker from "../../components/form/AppFormDatePicker";
import { FONTS } from "../../constants/theme";
import AppFormTimePicker from "../../components/form/AppFormTimePicker";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

import LottieView from "lottie-react-native";
import { UserContext } from "../../context/userContext";
import {
  getUserAndSendNotification,
  randomString,
} from "../../global/functions";
import { AllUsersContext } from "../../context/allUsersContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = yup.object().shape({
  location: yup.string().required().min(1).label("Location"),
  date: yup.date().required("Required").label("Date"),
  time: yup.date().required("Required").label("Date"),
  description: yup.string().required().min(1).label("Description"),
  message: yup.string().required().min(1).label("Message"),
});

const initialValues = {
  location: "",
  date: "",
  time: "",
  description: "",
  message: "",
};

const ServiceBookingForm = ({ route }) => {
  const navigation = useNavigation();
  const serviceListing = route.params;
  const [currentListing, setCurrentListing] = React.useState(serviceListing);
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState({});
  const { users, setUsers } = React.useContext(AllUsersContext);
  React.useEffect(() => {
    console.log(currentListing);
    getUser();
  }, []);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const messagesId = randomString(35);
    const bookingId = randomString(35);

    const data = {
      location: values.location,
      date: moment(values.date).format("DD-MM-YYYY"),
      time: moment(values.time).format("hh:mm A"),
      description: values.description,
      requestSentAt: moment().format("DD-MM-YYYY hh:mm A"),
      user: user,
      userId: auth.currentUser.uid,
      messagesId: messagesId,
      status: "pending",
      orderStarted: false,
      bookingId: bookingId,
      owner: currentListing.postedBy,
      total: currentListing.total,
      listing: currentListing,
    };

    await setDoc(doc(db, "serviceBookings", bookingId), data).then(() => {
      //add doc in the servicesMessages collection
      const messageData = {
        message: values.message,
        sentAt: moment().format("DD-MM-YYYY hh:mm A"),
        user: user,
        userId: auth.currentUser.uid,
      };
      setDoc(doc(db, "serviceMessages", messagesId), {
        messages: [messageData],
      })
        .then(() => {
          setLoading(false);
          const bodyRequest = "Service Listing Got a new booking request";
          const route = "myservicelisting";
          getUserAndSendNotification(
            currentListing.postedBy.uid,
            users,
            bodyRequest,
            route
          );
          Alert.alert("Success", "Booking request sent successfully!");
          navigation.goBack();
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
          setLoading(false);
        });
    });

    setLoading(false);
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Service Booking"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: FONTS.bold,
              textAlign: "center",
              marginVertical: 20,
            }}
          >
            Service Booking Form
          </Text>
          <ScrollView>
            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <AppFormField
                name="location"
                placeholder="Location"
                icon="map-marker"
              />
              <AppFormDatePicker name="date" placeholder="Date" />
              <AppFormTimePicker name="time" placeholder="Time" />
              <AppFormField
                name="description"
                placeholder="Description"
                icon="text"
              />
              <AppFormField
                name="message"
                placeholder="Add Message"
                icon="email"
              />

              <SubmitButton title="Book now!" />
            </AppForm>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../../assets/animations/booking.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default ServiceBookingForm;

const styles = StyleSheet.create({});
