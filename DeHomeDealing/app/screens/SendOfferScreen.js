import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";
import servicecolors from "../config/servicecolors";
import { auth, db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { UserContext } from "../context/userContext";
import { getUserAndSendNotification } from "../global/functions";
import { AllUsersContext } from "../context/allUsersContext";

const validationSchema = yup.object().shape({
  price: yup
    .string()
    .required()
    .min(1)
    .max(12)
    .label("Price"),
  message: yup
    .string()
    .required()
    .min(1)
    .label("Message"),
});

const SendOfferScreen = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;
  const { user, setUser } = React.useContext(UserContext);
  const { users, setUsers } = React.useContext(AllUsersContext);
  React.useEffect(() => {
    console.log("UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU", user);
  }, []);

  const handleSendOffer = (values) => {
    console.log(values);
    const docId = data.listingId;
    const targetData = data.offers;
    const myObject = {
      price: values.price,
      message: values.message,
      status: "pending",
      user: auth.currentUser.uid,
    };
    const updatedData = [...targetData, myObject];
    updateDoc(doc(db, "listings", docId), {
      offers: updatedData,
    })
      .then(() => {
        Alert.alert("Success", "Offer has been sent successfully.");
        navigation.goBack();
        const bodyRequest = "Received a counter offer check";
        getUserAndSendNotification(data.userId, users, bodyRequest, route);
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };
  return (
    <MainScreen>
      <View style={styles.mainContainer}>
        <AppHeader
          titleScreen="Send Offer"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Send Offer</Text>
          <AppForm
            initialValues={{ price: "", message: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSendOffer(values)}
          >
            <AppFormField placeholder="Offer Price" name="price" icon="cash" />
            <AppFormField
              placeholder="Message in details"
              name="message"
              icon="email"
              multiline
              numberOfLines={7}
            />
            <SubmitButton title="Send Offer" color={COLORS.primary} />
          </AppForm>
        </View>
      </View>
    </MainScreen>
  );
};

export default SendOfferScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 15,
    fontFamily: FONTS.bold,
  },
});
