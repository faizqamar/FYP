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
import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from "../components/form";

import CategoryPickerItem from "../components/CategoryPickerItem";

import * as yup from "yup";

import { COLORS, FONTS } from "../constants/theme";
import LargeText from "../components/texts/LargeText";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import { agreementTypes, propertyTypes } from "../data/store";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import MainScreen from "../components/MainScreen";
import { randomString } from "../global/functions";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import moment from "moment";
import AppButton from "../components/AppButton";

const agreementInitialValues = {
  title: "",
  landlordName: "",
  userName: "",
  agreementType: null,
  propertyType: null,
  propertyAddress: "",
  termsAndConditions: "",
  postelCode: "",
  uid: "",
  price: "",
  dueDate: "",
};

const agreementValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required()
    .min(1)
    .max(25)
    .label("Title"),
  propertyAddress: yup
    .string()
    .required()
    .min(11)
    .max(80)
    .label("Address"),
  uid: yup.string(),
  termsAndConditions: yup
    .string()
    .required()
    .min(25)
    .max(370)
    .label("Terms and Conditions"),
});

const AgreementScreen = ({ navigation }) => {
  const submitAgreement = async (values) => {
    console.log("entered");
    console.log(auth.currentUser.uid);
    const currentTime = moment().format("MMM Do YY");
    const docId = randomString(25);

    try {
      setDoc(doc(db, "agreements", docId), {
        label: values.title,
        uid: auth.currentUser.uid,
        value: docId,
        propertyAddress: values.propertyAddress,
        termsAndConditions: values.termsAndConditions,
        generatedAt: currentTime,
      });
      const html = `<html>
      <body>
        <div style="align-items: center; justify-content: center">
         
          <h1>De Home Dealing</h1>
        </div>
        <div>
          <h5>${values.title}</h5>
          <h6>Address: ${values.address}</h6>
          <h6>Terms and Conditions</h6>
          <p>${values.termsAndConditions}</p>
          <div>
            <h1>Signs of both parties</h1>
          </div>
        </div>
      </body>
    </html>
    `;
      const result = await printToFileAsync({ html: html, base64: false });
      await shareAsync(result.uri);
      navigation.goBack();
      Alert.alert("Agreement Generated");
    } catch (error) {
      console.log(error);
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
          <LargeText>Agreement</LargeText>
        </View>
        <View style={styles.innerContainer}>
          <Image
            source={require("../../assets/svgs/agreement.png")}
            resizeMode="contain"
            style={styles.image}
          />
          <Text style={styles.title}>Make an Agreement</Text>
          <AppForm
            initialValues={agreementInitialValues}
            onSubmit={(values) => submitAgreement(values)}
            validationSchema={agreementValidationSchema}
          >
            <AppFormField
              placeholder="Enter Agreement Title"
              icon="format-text"
              name="title"
              iconColor={COLORS.secondary}
            />

            <AppFormField
              placeholder="Enter Property Address"
              icon="home-map-marker"
              name="propertyAddress"
              iconColor={COLORS.secondary}
            />

            <AppFormField
              placeholder="Enter Terms and Conditions"
              icon="file-sign"
              name="termsAndConditions"
              iconColor={COLORS.secondary}
              multiline
              numberOfLines={7}
            />
            <SubmitButton title="Generate Agreement" />
          </AppForm>
          <AppButton
            title="Using Templates"
            onPress={() => navigation.navigate("agreementTemplates")}
            color={COLORS.secondary}
          />
        </View>
      </ScrollView>
    </MainScreen>
  );
};

export default AgreementScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
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
  title: {
    marginVertical: 15,
    color: COLORS.primary,
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
  },
});
