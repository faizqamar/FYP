import {
  Alert,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { AgreementsContext } from "../context/agreementContext";
import MainScreen from "../components/MainScreen";

import LottieView from "lottie-react-native";

import * as yup from "yup";
import { COLORS, FONTS } from "../constants/theme";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { getUserAndSendNotification } from "../global/functions";
import { AllUsersContext } from "../context/allUsersContext";

const validationSchema = yup.object().shape({
  agreement: yup.object().required().nullable().label("Agreement"),
});

const SendAgreements = ({ route }) => {
  const navigation = useNavigation();
  const myData = route.params;
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [loading, setLoading] = React.useState(false);
  const { agreements, loadAgreements, setAgreements, setLoadAgreements } =
    React.useContext(AgreementsContext);

  React.useEffect(() => {
    console.log("Owner added the agreement", myData);
  }, []);

  const getAgreements = async () => {
    setLoading(true);
    try {
      const colRef = collection(db, "agreements");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //filter myData where uid ===auth.currentUser.uid
      myData = myData.filter((item) => item.uid === auth.currentUser.uid);
      setAgreements(myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const docId = myData.bookingId;

  const addAgreement = async (item) => {
    const updatedData = item;
    setLoadAgreements(true);

    //add updatedData to firestore doc where bookingId = docId in the bookings collection
    const docRef = doc(db, "bookings", docId);
    await updateDoc(docRef, {
      agreement: updatedData,
    });
    setLoadAgreements(false);
    const bodyRequest = "Owner Added the agreement";
    const route = "myoffers";
    getUserAndSendNotification(myData.userData.uid, users, bodyRequest, route);
    Alert.alert("Agreement Sent", "Agreement has been sent to the client");
    navigation.goBack();
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Send Agreements"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Send Agreements</Text>

          <View style={styles.btnContainer}>
            <AppButton
              title="Create Agreement"
              onPress={() => navigation.navigate("Agreement")}
            />
          </View>

          <View style={styles.innerContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={getAgreements}
                />
              }
            >
              <Text style={styles.texto}>
                Click on any of the following agreement to share it
              </Text>

              {agreements.map((item, index) => (
                <TouchableOpacity
                  style={{ marginVertical: 5 }}
                  onPress={() => addAgreement(item)}
                >
                  <View style={styles.agreementCard}>
                    <Text style={styles.label}>{item.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </MainScreen>
      <Modal visible={loading} animationType="slide">
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/agreement.json")}
            loop
            autoPlay
          />
        </View>
      </Modal>
    </>
  );
};

export default SendAgreements;

const styles = StyleSheet.create({
  btnContainer: {
    justifyContent: "center",
    marginHorizontal: 35,
  },
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 12,
    color: COLORS.primary,
  },
  agreementCard: {
    padding: 15,
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.secondary,
    textAlign: "center",
  },
  innerContainer: {
    marginHorizontal: 20,
    borderRadius: 12,
  },
  texto: {
    fontFamily: FONTS.regular,
    textAlign: "center",
    marginVertical: 10,
  },
});
