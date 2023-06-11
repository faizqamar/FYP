import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants/theme";
import { AppForm, AppFormField, SubmitButton } from "../components/form";

import * as yup from "yup";
import { randomString } from "../global/functions";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import LottieView from "lottie-react-native";

const validationSchema = yup.object().shape({
  bankName: yup
    .string()
    .required()
    .min(1)
    .max(25)
    .label("Bank Name"),
  accountNumber: yup
    .string()
    .required()
    .min(1)
    .max(25)
    .label("Account Number"),
  accountName: yup
    .string()
    .required()
    .min(1)
    .max(25)
    .label("Account Title"),
});

const initialValues = {
  bankName: "",
  accountNumber: "",
  accountName: "",
};

const AddBank = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const handleAdd = async (values) => {
    setLoading(true);
    const { bankName, accountNumber, accountName } = values;

    const docId = randomString(35);
    const data = {
      bankName,
      accountNumber,
      accountName,
      uid: auth.currentUser.uid,
      docId,
    };

    //upload data to firebase banks collection
    const docRef = doc(db, "banks", docId);
    await setDoc(docRef, {
      bankname: bankName,
      accountnumber: accountNumber,
      accountname: accountName,
      uid: auth.currentUser.uid,
      docID: docId,
    });
    Alert.alert("Bank Added", "Bank has been added successfully");
    setLoading(false);
    navigation.goBack();
  };
  return (
    <>
      <MainScreen>
        <AppHeader titleScreen="Add Bank" onPress={() => navigation.goBack()} />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Add a Bank</Text>
          <AppForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleAdd(values)}
          >
            <AppFormField name="bankName" placeholder="Bank Name" />
            <AppFormField name="accountNumber" placeholder="Account Number" />
            <AppFormField name="accountName" placeholder="Account Title" />

            <View style={{ marginVertical: 10 }}>
              <SubmitButton title="Add Bank" />
            </View>
          </AppForm>
        </View>
      </MainScreen>

      <Modal visible={loading} transparent={true}>
        <View
          style={{
            flex: 1,
          }}
        >
          <LottieView
            loop
            autoPlay
            source={require("../../assets/animations/bank.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default AddBank;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.semiBold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
});
