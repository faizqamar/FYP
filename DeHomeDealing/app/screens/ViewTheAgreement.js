import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { FONTS, COLORS } from "../constants/theme";
import WithHeading from "../components/WithHeading";
import AppButton from "../components/AppButton";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";

const ViewTheAgreement = ({ route }) => {
  const data = route.params;
  const values = data.agreement;

  const navigation = useNavigation();

  const generateAgreement = async () => {
    try {
      const html = `<html>
      <body>
        <div style="align-items: center; justify-content: center">
          <h1>De Home Dealing</h1>
        </div>
        <div>
          <h5>${values.label}</h5>
          <h6>Address: ${values.propertyAddress}</h6>
          <h6>Terms and Conditions</h6>
          <p>${values.termsAndConditions}</p>
          <div>
            <h6>Owner</h6>
            <p>${data.listing.postedBy.username}</p>
          </div>
          <div>
            <h6>Buyer</h6>
            <p>${data.userData.username}</p>
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
      <AppHeader titleScreen="Agreement" onPress={() => navigation.goBack()} />
      {data.agreement ? (
        <View style={styles.container}>
          <Text style={styles.title}>Agreement</Text>
          <View style={styles.innerContainer}>
            <WithHeading
              heading="Agreement Title:"
              data={data.agreement.label}
            />
            <WithHeading
              heading="Property Address"
              data={data.agreement.propertyAddress}
            />
            <WithHeading heading="Terms&Conditions" />
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                {data.agreement.termsAndConditions}
              </Text>
            </View>

            <View style={styles.btnContainer}>
              <AppButton
                title="Generate Agreement"
                onPress={generateAgreement}
                color={COLORS.secondary}
              />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.noContainer}>
          <Text style={styles.title}>No Agreement</Text>
        </View>
      )}
    </MainScreen>
  );
};

export default ViewTheAgreement;

const styles = StyleSheet.create({
  btnContainer: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 20,
  },
  noContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.secondary,
    textAlign: "center",
    marginVertical: 20,
  },
  termsContainer: {
    padding: 10,
    backgroundColor: COLORS.white,
  },
  termsText: {},
});
