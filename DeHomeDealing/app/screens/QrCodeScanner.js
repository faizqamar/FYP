import {
  Alert,
  Button,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";

import { BarCodeScanner } from "expo-barcode-scanner";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import LottieView from "lottie-react-native";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const QrCodeScanner = () => {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const navigation = useNavigation();
  const [id, setId] = React.useState("");
  const [listing, setListing] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleScanned = () => {
    if (listing) navigation.navigate("qrDetails", listing);
  };

  const getData = async (id) => {
    setLoading(true);

    try {
      //get doc where doc id is equal to id
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setListing(docSnap.data());
        console.log(
          "liiiiiiiiiiiiiiiiiiissssssssssssstiiiiiiiiiiiiiiing",
          listing
        );
        setLoading(false);
      } else {
        console.log("Document does not exist");
        setLoading(false);
        Alert.alert("Error", "No listing found with this QR code");
        navigation.goBack();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setId(data);
    console.log("The id is ", id);
    if (data) getData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  return (
    <>
      <MainScreen>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <>
            <View style={styles.mainQrCode}>
              <View style={styles.qrCodeIcon}>
                <Image
                  resizeMode="contain"
                  source={require("../../assets/icons/qrcode.png")}
                  style={styles.qrCodeIcon}
                />
              </View>
            </View>
            <View style={styles.btnContainer}>
              <AppButton
                title="Tap to Re-Scan"
                color={colors.danger}
                textColor={colors.white}
                onPress={() => setScanned(false)}
              />
              <AppButton
                title="Check Listing"
                onPress={handleScanned}
                color={colors.secondary}
              />
            </View>
          </>
        )}
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            autoPlay
            loop
            source={require("../../assets/animations/find.json")}
          />
        </View>
      </Modal>
    </>
  );
};

export default QrCodeScanner;

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  qrCodeIcon: {
    width: 150,
    height: 150,
    backgroundColor: colors.white,
  },
  mainQrCode: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
