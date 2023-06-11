import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
  Text,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import * as yup from "yup";

import { COLORS, FONTS } from "../constants/theme";
import LargeText from "../components/texts/LargeText";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MainScreen from "../components/MainScreen";

import * as ImagePicker from "expo-image-picker";
import { randomString } from "../global/functions";
import colors from "../config/colors";
import moment from "moment";
import FormImagePicker from "../components/form/FormImagePicker";
import { UserContext } from "../context/userContext";
import UploadScreen from "./UploadScreen";

const uvInitialValues = {
  cnic: "",
  phone: "",
  address: "",
  postelCode: "",
  images: [],
};

const uvValidationSchema = yup.object().shape({
  cnic: yup
    .string()
    .required()
    .min(13)
    .max(13)
    .label("CNIC"),
  phone: yup
    .string()
    .required()
    .min(11)
    .max(11)
    .label("Phone"),
  address: yup
    .string()
    .required()
    .label("Address"),
  postelCode: yup
    .string()
    .required()
    .min(5)
    .max(5)
    .label("Postel Code"),
  images: yup.array().min(1, "Please select at least one image."),
});

const UserVerificationScreen = ({ navigation }) => {
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [urls, setUrls] = React.useState([]);
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    console.log("User Verification Screen", user);
  }, []);

  const handleSubmit = async (values) => {
    setProgress(0);
    setModalVisible(true);

    const images = values.images;
    const myValues = values;
    uploadImagesToFirebase(images, myValues);
  };

  const uploadImagesToFirebase = async (images, values) => {
    const urls = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = Date.now() + randomString(5);
      const storageRef = ref(storage, `verifications/${fileName}.jpeg`);
      //create blob
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function() {
          resolve(xhr.response);
        };
        xhr.onerror = function(e) {
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
              helloFunction(urls, values);
            }
          });
        }
      );
    }
  };

  const helloFunction = async (urls, values) => {
    setModalVisible(true);
    const docId = randomString(35);
    try {
      setDoc(doc(db, "vrequests", docId), {
        cnic: values.cnic,
        phone: values.phone,
        address: values.address,
        postelCode: values.postelCode,
        docId: docId,
        user: user,
        images: urls,
        status: "pending",
        submittedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
      })
        .then(() => {
          setModalVisible(false);
          Alert.alert("User Verification request Sent");
          navigation.goBack();
        })
        .catch((error) => {
          setModalVisible(false);
          Alert.alert("Error", error.message);
        });
    } catch (error) {
      Alert.alert("Error", error.message);
      setModalVisible(false);
    }
  };

  return (
    <MainScreen>
      <ScrollView style={styles.mainContainer}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              padding: 3,
              backgroundColor: COLORS.primary,
              borderRadius: 20,
              marginHorizontal: 10,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={COLORS.white}
            />
          </TouchableOpacity>
          <LargeText>User Verification</LargeText>
        </View>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/svgs/verification.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <LargeText style={{ marginVertical: 15, color: COLORS.primary }}>
            User Verification
          </LargeText>
          <UploadScreen
            onDone={() => setModalVisible(false)}
            progress={progress}
            visible={modalVisible}
          />

          <AppForm
            initialValues={uvInitialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={uvValidationSchema}
          >
            <FormImagePicker name="images" />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="CNIC e.g. 3410112334904"
              icon="email"
              name="cnic"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Phone Number e.g. 03030623268"
              icon="phone"
              name="phone"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Address e.g. Street#, City, Country"
              icon="marker"
              name="address"
              iconColor={COLORS.secondary}
            />
            <AppFormField
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Postel Code e.g. 52330"
              icon="email"
              name="postelCode"
              iconColor={COLORS.secondary}
            />
            <SubmitButton title="Submit Request" />
          </AppForm>
        </View>
      </ScrollView>
    </MainScreen>
  );
};

export default UserVerificationScreen;

const styles = StyleSheet.create({
  cnicText: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
  },
  crossContainer: {
    position: "absolute",
    top: 10,
    right: 5,
    backgroundColor: colors.danger,
    borderRadius: 20,
    padding: 5,
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 100,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  image: {
    width: 175,
    height: 175,
    marginVertical: 20,
    alignSelf: "center",
  },
  imagePicker: {
    width: 125,
    height: 125,
    marginVertical: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  imageSelected: {
    width: 300,
    height: 250,
  },
});

// const user = auth.currentUser;

//     const docId = randomString(25);
//     try {
//       setDoc(doc(db, "vrequests", docId), {
//         cnic: values.cnic,
//         phone: values.phone,
//         address: values.address,
//         postelCode: values.postelCode,
//         docId: docId,
//         uid: user.uid,
//         images: values.images,
//         submittedAt: moment().format("MMMM Do YYYY, h:mm:ss a"),
//       });

//       Alert.alert("Success", "User verification request sent");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     }
