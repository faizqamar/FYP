import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants/theme";
import BankCard from "../components/BankCard";

const OwnerBankAccount = ({ route }) => {
  const data = route.params;
  const [bankDetails, setBankDetails] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [copyText, setCopyText] = React.useState("");

  const navigation = useNavigation();

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const getBankDetails = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "banks"),
        where("uid", "==", data.owner.uid)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });

      setBankDetails(myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    console.log("UUUUUUUUUUUUUhdfgjhkdgjhsk", data);
    getBankDetails();
  }, []);
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Bank Details"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          {bankDetails.length > 0 ? (
            <View style={{ flex: 1, marginHorizontal: 20 }}>
              <Text style={styles.title}>Owner Bank Details</Text>
              <FlatList
                data={bankDetails}
                keyExtractor={(item) => item.docID.toString()}
                renderItem={({ item }) => (
                  <BankCard
                    accountName={item.accountname}
                    accountNumber={item.accountnumber}
                    bankName={item.bankname}
                  />
                )}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>No Bank Details</Text>
            </View>
          )}
        </View>
      </MainScreen>
    </>
  );
};

export default OwnerBankAccount;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.gray,
    textAlign: "center",
    marginVertical: 10,
  },
});
