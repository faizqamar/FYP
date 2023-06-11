import {
  StyleSheet,
  Alert,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";

import TrasparentHeader from "../../components/TrasparentHeader";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../../components/form";

import * as yup from "yup";
import { COLORS } from "../../constants/theme";

import CategoryPickerItem from "../../components/CategoryPickerItem";

import { cities, serviceTypes, areas } from "../../data/store";
import LottieView from "lottie-react-native";
import AppButton from "../../components/AppButton";
import servicecolors from "../../config/servicecolors";
import { auth, db } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MainScreen from "../../components/MainScreen";
import { UserContext } from "../../context/userContext";
import { randomString } from "../../global/functions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const postAdInitialValues = {
  title: "",
  description: "",
  price: "",
  address: "",
  userId: "",
  category: null,
  city: null,
  area: null,
  postedTime: "",
  rating: "",
};
const postAdValidationSchema = yup.object().shape({
  title: yup.string().required().min(4).max(35).label("Title"),
  description: yup.string().required().min(15).label("Description"),
  price: yup.string().required().min(1).max(12).label("Price"),

  address: yup.string().required().min(10).max(30).label("Address"),
  category: yup.object().required().nullable().label("Category"),
  city: yup.object().required().nullable().label("City"),
  area: yup.object().required().nullable().label("Area"),
  userId: yup.string(),
  rating: yup.string(),
  postedTime: "",
});

const SellServiceScreen = ({ navigation }) => {
  const [posted, setPosted] = useState(false);
  const [errorPosted, setErrorPosted] = useState(false);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    //get user from async storage

    getUser();
  }, []);

  const getUser = async () => {
    const user = await AsyncStorage.getItem("user");
    setUser(JSON.parse(user));
    console.log("user", user);
  };

  const postData = async (values) => {
    console.log("entered");
    const tareekh = new Date().toDateString();
    const serviceListingId = randomString(35);

    try {
      setDoc(doc(db, "servicelistings", serviceListingId), {
        title: values.title,
        description: values.description,
        address: values.address,
        total: values.price,
        category: values.category,
        city: values.city,
        area: values.area,
        userId: auth.currentUser.uid,
        docId: serviceListingId,
        postedTime: tareekh,
        rating: 5,
        postedBy: user,
      });
      setPosted(true);
    } catch (error) {
      Alert.alert("Error", error.message);
      setErrorPosted(true);
    }
  };
  return (
    <>
      <MainScreen>
        <View style={styles.mainContainer}>
          <TrasparentHeader
            title="Post Ad"
            onPress={() => navigation.goBack()}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.scrolling}>
              <Image
                source={require("../../../assets/svgs/support.png")}
                style={styles.imageTop}
                resizeMode="contain"
              />
              <View style={styles.formContainer}>
                <AppForm
                  initialValues={postAdInitialValues}
                  validationSchema={postAdValidationSchema}
                  onSubmit={(values) => postData(values)}
                >
                  <AppFormField
                    placeholder="Enter Title"
                    icon="text"
                    name="title"
                    iconColor={COLORS.secondary}
                    keyboardType="email-address"
                  />
                  <AppFormField
                    placeholder="Enter Description"
                    icon="details"
                    name="description"
                    iconColor={COLORS.secondary}
                    keyboardType="email-address"
                    multiline
                    numberOfLines={3}
                  />
                  <AppFormField
                    placeholder="Enter Price"
                    icon="cash"
                    name="price"
                    iconColor={COLORS.secondary}
                    keyboardType="email-address"
                  />
                  <AppFormField
                    placeholder="Street#/Street Name"
                    icon="google-maps"
                    name="address"
                    iconColor={COLORS.secondary}
                  />
                  <AppFormPicker
                    items={serviceTypes}
                    name="category"
                    placeholder="Purpose"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={cities}
                    name="city"
                    placeholder="Select City"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={areas}
                    name="area"
                    placeholder="Select Area"
                  />

                  <SubmitButton title="Post" />
                </AppForm>
              </View>
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={posted} animationType="slide">
        {posted && (
          <>
            <View style={{ marginHorizontal: 35 }}>
              <AppButton
                color={servicecolors.five}
                title="Go Back"
                onPress={() => {
                  setPosted(false);
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../../animations/done.json")}
                autoPlay
                loop
              />
            </View>
          </>
        )}
        {errorPosted && (
          <>
            <AppButton
              color={servicecolors.five}
              title="Retry"
              onPress={() => setErrorPosted(false)}
            />
            <View style={{ flex: 1 }}>
              <LottieView
                source={require("../../animations/error.json")}
                autoPlay
                loop
              />
            </View>
          </>
        )}
      </Modal>
    </>
  );
};

export default SellServiceScreen;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
  imageTop: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  mainContainer: {
    flex: 1,
  },
  scrolling: {
    flex: 1,
    alignItems: "center",
  },
});
