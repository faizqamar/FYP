import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import OneLineComponent from "../components/OneLineComponent";
import { COLORS } from "../constants/theme";
import ScreenHeader from "../components/ScreenHeader";
import MainScreen from "../components/MainScreen";

const chats = [
  {
    id: 1,
    user: "Dawar",
    lastMsg: "Hello, Im on my way",
    imgSource: require("../../assets/images/many/person03.png"),
  },
  {
    id: 2,
    user: "Dawar",
    lastMsg: "Hello, Im on my way",
    imgSource: require("../../assets/images/many/person03.png"),
  },
  {
    id: 3,
    user: "Dawar",
    lastMsg: "Hello, Im on my way",
    imgSource: require("../../assets/images/many/person03.png"),
  },
  {
    id: 4,
    user: "Dawar",
    lastMsg: "Hello, Im on my way",
    imgSource: require("../../assets/images/many/person03.png"),
  },
];

const ChatScreen = ({ navigation }) => {
  return (
    <MainScreen>
      <View>
        <ScreenHeader onPress={() => navigation.navigate("Home")} />
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <OneLineComponent
              imgSource={item.imgSource}
              lastMsg={item.lastMsg}
              user={item.user}
              onPress={() => navigation.navigate("Chat")}
            />
          )}
        />
      </View>
    </MainScreen>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
