import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FONTS, COLORS } from "../constants/theme";

const HeaderTab = ({ activeTab, setActiveTab }) => {
  return (
    <View style={styles.mainComponent}>
      <HeaderButton
        text="Buy"
        btnColor="white"
        textColor="black"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Rent"
        btnColor="black"
        textColor="white"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
};

const HeaderButton = ({
  text = "Buy",
  onPress,
  btnColor = "black",
  activeTab,
  setActiveTab,
  textColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainBtn,
        {
          backgroundColor: activeTab === text ? COLORS.primary : COLORS.white,
        },
      ]}
      onPress={() => setActiveTab(text)}
    >
      <Text
        style={[
          styles.mainText,
          {
            color: activeTab === text ? COLORS.white : COLORS.black,
          },
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default HeaderTab;

const styles = StyleSheet.create({
  mainComponent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  mainBtn: {
    marginHorizontal: 10,
    paddingHorizontal: 35,
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    borderRadius: 20,
  },
  mainText: {
    fontSize: 18,
    fontFamily: FONTS.bold,
  },
});
