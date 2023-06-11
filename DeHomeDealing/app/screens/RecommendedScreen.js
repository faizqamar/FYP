import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { FONTS } from "../constants/theme";
import { auth } from "../../firebase";
import AppButton from "../components/AppButton";
import BankCard from "../components/BankCard";
import { useNavigation } from "@react-navigation/native";
import { BanksContext } from "../context/banksContext";

const RecommendedScreen = () => {
  const navigation = useNavigation();
  const { banks, setBanks, loadBanks, setLoadBanks } = React.useContext(
    BanksContext
  );

  //get all the banks from banks where uid is equal to the current user's uid
  const myBanks = banks.filter((bank) => bank.uid === auth.currentUser.uid);

  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Bank Details"
          onPress={() => navigation.goBack()}
        />
        {myBanks.length > 0 ? (
          <View style={{ flex: 1 }}>
            <View style={styles.listContainer}>
              <Text style={styles.title}>Your Banks</Text>
              <FlatList
                data={myBanks}
                keyExtractor={(item) => item.docID.toString()}
                renderItem={({ item }) => (
                  <BankCard
                    bankName={item.bankname}
                    accountNumber={item.accountnumber}
                    accountName={item.accountname}
                  />
                )}
              />
            </View>
            <View style={styles.btnContainer}>
              <AppButton
                title="Add Bank"
                onPress={() => navigation.navigate("addbank")}
              />
            </View>
          </View>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.title}>No Banks Added</Text>
            <AppButton
              title="Add Bank"
              onPress={() => navigation.navigate("addbank")}
            />
          </View>
        )}
      </MainScreen>
    </>
  );
};

export default RecommendedScreen;

const styles = StyleSheet.create({
  btnContainer: {
    marginHorizontal: 20,
    marginVertical: 30,
  },
  listContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: "center",
    marginVertical: 20,
  },
});
