import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";

import { GiftedChat } from "react-native-gifted-chat";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../../firebase";
import { UserContext } from "../context/userContext";

const InboxScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const { user } = React.useContext(UserContext);

  const onSignOut = () => {
    auth.signOut();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const collectionRef = collection(db, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      );
    });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);
  return (
    <MainScreen>
      <AppHeader titleScreen="Chat" />
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          avatar: "https://i.pravatar.cc/300",
          name: user.username,
        }}
      />
    </MainScreen>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({});
