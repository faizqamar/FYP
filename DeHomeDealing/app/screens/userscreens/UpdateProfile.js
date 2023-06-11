import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../../components/MainScreen";
import AppHeader from "../../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../../components/form";

import * as yup from "yup";
import FormImagePicker from "../../components/form/FormImagePicker";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

import LottieView from "lottie-react-native";

const validationSchema = yup.object().shape({
  images: yup
    .array()
    .required()
    .max(1, "Please select maximum one image."),
  userName: yup
    .string()
    .required()
    .min(4)
    .label("Username"),
  phoneNumber: yup
    .string()
    .required()
    .min(11)
    .label("Phone Number"),
});

const initialValues = {
  images: [],
  userName: "",
  phoneNumber: "",
};

const UpdateProfile = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);
  const [urls, setUrls] = React.useState([]);

  const handleUpdate = async (myValues) => {
    console.log("ennnter");
    setLoading(true);
    const images = myValues.images;
    const values = myValues;
    uploadImagesToFirebase(images, values);
  };

  const uploadImagesToFirebase = async (images, values) => {
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const fileName = Date.now() + randomString(5);
      const storageRef = ref(storage, `profile/${fileName}.jpeg`);
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
    try {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        images: images,
        username: values.userName,
        phoneNumber: values.phoneNumber,
      });
      setLoading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setLoading(true);
    }
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Update Profile"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.topContainer}>
              <Image
                resizeMode="contain"
                source={require("../../../assets/icons/update.png")}
                style={styles.image}
              />
              <Text style={styles.title}>Update Profile</Text>
            </View>

            <View style={styles.formContainer}>
              <AppForm
                initialValues={initialValues}
                onSubmit={(values) => handleUpdate(values)}
                validationSchema={validationSchema}
              >
                <FormImagePicker name="images" />
                <AppFormField name="userName" placeholder="Updated Name" />
                <AppFormField
                  name="phoneNumber"
                  placeholder="Updated Phone Number"
                />

                <SubmitButton title="Update Profile" />
              </AppForm>
            </View>
          </ScrollView>
        </View>
      </MainScreen>

      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.primary,
          }}
        >
          <LottieView />
        </View>
      </Modal>
    </>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  topContainer: {
    marginVertical: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginTop: 12,
    color: COLORS.primary,
  },
});
