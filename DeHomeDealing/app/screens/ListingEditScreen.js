import {
  StyleSheet,
  Alert,
  View,
  Image,
  ScrollView,
  Modal,
  Text,
} from "react-native";
import React, { useState } from "react";

import LottieView from "lottie-react-native";
import TrasparentHeader from "../components/TrasparentHeader";
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import * as yup from "yup";
import { COLORS, FONTS } from "../constants/theme";

import CategoryPickerItem from "../components/CategoryPickerItem";

import { propertyTypes, cities, dealCategories, areas } from "../data/store";
import AppButton from "../components/AppButton";
import servicecolors from "../config/servicecolors";
import MainScreen from "../components/MainScreen";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { randomString } from "../global/functions";
import FormImagePicker from "../components/form/FormImagePicker";
import moment from "moment";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import LocationInput from "../components/LocationInput";
import useLocation from "../hooks/useLocation";
import useUser from "../hooks/useUser";
import AppLocationPicker from "../components/AppLocationPicker";

const postAdInitialValues = {
  title: "",
  description: "",
  address: "",
  total: "",
  bedrooms: "",
  bathrooms: "",
  user: null,
  size: "",
  images: [],
  category: null,
  city: null,
  area: null,
  propertyType: null,
  postedTime: "",
  rating: "",
  phone: "",
  mapLocation: null,
};
const postAdValidationSchema = yup.object().shape({
  title: yup.string().required().min(4).max(35).label("Title"),
  description: yup.string().required().min(15).label("Description"),
  address: yup.string().required().min(10).max(30).label("Address"),
  total: yup.number().required().min(1000).max(1000000000).label("Total"),
  size: yup.number().required().min(1).max(1000).label("Size"),
  bedrooms: yup.number().required().min(1).max(10).label("Bedrooms"),
  bathrooms: yup.number().required().min(1).max(10).label("Bathrooms"),
  category: yup.object().required().nullable().label("Category"),
  city: yup.object().required().nullable().label("City"),
  area: yup.object().required().nullable().label("Area"),
  propertyType: yup.object().required().nullable().label("Property Type"),
  userId: yup.string(),
  image: yup.array().min(1, "Please select at least one image."),
  rating: yup.string(),
  phone: yup.string(),
});

const ListingEditScreen = ({ navigation }) => {
  const [posted, setPosted] = useState(false);
  const [setErrorPosted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [urls, setUrls] = useState([]);
  const [userLocation, setUserLocation] = React.useState({});
  const theLocation = useLocation();

  const [modalLocationVisible, setModalLocationVisible] = React.useState(false);
  const [theRegion, setTheRegion] = React.useState({
    //islamabad comsats university
    latitude: 33.7215,
    longitude: 73.0433,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [selectedLocation, setSelectedLocation] = React.useState(theRegion);
  const initialRegion = {
    //islamabad comsats university
    latitude: 33.7215,
    longitude: 73.0433,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  React.useLayoutEffect(() => {
    setSelectedLocation(theRegion);
    console.log("theRegion", theRegion);
  }, [theRegion]);

  const onPressSelectLocation = () => {
    setModalLocationVisible(true);
  };

  const user = useUser();

  React.useEffect(() => {
    console.log("user", user);

    setTimeout(() => {
      setUserLocation(theLocation);
      console.log(theLocation);
    }, 2000);
  }, [theLocation]);

  const handleSubmit = async (myValues) => {
    setProgress(0);
    setModalVisible(true);

    const images = myValues.images;
    const values = myValues;
    uploadImagesToFirebase(images, values);
  };

  const uploadImagesToFirebase = async (images, values) => {
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = Date.now() + randomString(5);
      const storageRef = ref(storage, `listings/${fileName}.jpeg`);
      //create blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", image, true);
        xhr.send(null);
      });
      //upload blob
      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          Alert.alert("Error", "An error occurred while uploading.");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            urls.push(downloadURL);
            if (urls.length === images.length) {
              //all images uploaded
              setUrls(urls);
              setProgress(0);
              setModalVisible(false);
              //save data to firebase
              postData(urls, values);
            }
          });
        }
      );
    }
  };

  const postData = async (images, values) => {
    console.log("entered");
    const docId = randomString(25);

    try {
      setDoc(doc(db, "listings", docId), {
        title: values.title,
        description: values.description,
        address: values.address,
        listingId: docId,
        total: values.total,
        docId: docId,
        size: values.size,
        bedrooms: values.bedrooms,
        bathrooms: values.bathrooms,
        propertyType: values.propertyType,
        category: values.category,
        city: values.city,
        area: values.area,
        image: images,
        userId: auth.currentUser.uid,
        postedBy: user,
        postedTime: moment().format("MMMM Do YYYY, h:mm:ss a"),
        rating: "5",
        phone: user.phoneNumber,
        offers: [],
        location: userLocation ? userLocation : false,
        mapLocation: selectedLocation,
      });
      setPosted(true);
      setModalVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setErrorPosted(true);
      setModalVisible(false);
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
                source={require("../../assets/svgs/posthome.png")}
                style={styles.imageTop}
                resizeMode="contain"
              />
              <View style={styles.formContainer}>
                <AppForm
                  initialValues={postAdInitialValues}
                  validationSchema={postAdValidationSchema}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <View style={{ maxHeight: 125 }}>
                    <FormImagePicker name="images" />
                  </View>
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
                    placeholder="Street#/Street Name"
                    icon="google-maps"
                    name="address"
                    iconColor={COLORS.secondary}
                  />
                  <AppFormField
                    placeholder="Enter Total Price"
                    icon="cash-check"
                    name="total"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    placeholder="Enter area size in Marla"
                    icon="move-resize"
                    name="size"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Number of Rooms"
                    icon="bed-double-outline"
                    name="bedrooms"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormField
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="Enter Number of Bathrooms"
                    icon="bathtub-outline"
                    name="bathrooms"
                    iconColor={COLORS.secondary}
                    keyboardType="number-pad"
                  />
                  <AppFormPicker
                    items={propertyTypes}
                    name="propertyType"
                    placeholder="Property Type"
                    PickerItemComponent={CategoryPickerItem}
                    numOfColumns={3}
                  />
                  <AppFormPicker
                    items={dealCategories}
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

                  <AppLocationPicker
                    modalVisible={modalLocationVisible}
                    onPressSelectLocation={onPressSelectLocation}
                    selectedLocation={selectedLocation}
                    theRegion={theRegion}
                    setTheRegion={setTheRegion}
                    setModalVisible={setModalLocationVisible}
                    setSelectedLocation={setSelectedLocation}
                  />

                  <AppFormPicker
                    items={areas}
                    name="area"
                    placeholder="Select Area in marla"
                  />

                  <SubmitButton title="Post" />
                </AppForm>
              </View>
            </View>
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop
            source={require("../../assets/animations/house.json")}
          />
        </View>
      </Modal>
      <Modal visible={posted} animationType="slide">
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop={false}
            source={require("../../assets/animations/success.json")}
          />
        </View>
        <View style={styles.bottomModalContainer}>
          <Text style={styles.bottomModalTitle}>
            Listing has been posted successfully
          </Text>
          <AppButton
            title="Go Back"
            color={COLORS.primary}
            onPress={() => {
              setPosted(false);
              navigation.goBack();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  bottomModalContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  bottomModalTitle: {
    fontSize: 20,
    fontFamily: FONTS.bol,
    textAlign: "center",
  },
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
