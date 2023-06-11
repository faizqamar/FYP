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

const MyAgreements = () => {
  const navigation = useNavigation();
  const myData = route.params;
  const { users, setUsers } = React.useContext(AllUsersContext);
  const [loading, setLoading] = React.useState(false);
  const { agreements, setAgreements } = React.useContext(AgreementsContext);

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

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Send Agreements"
          onPress={() => navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>My Agreements</Text>

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
                  key={index}
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

export default MyAgreements;

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
