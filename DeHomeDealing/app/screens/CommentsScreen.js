import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useState, useCallback, useEffect } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebase";
import AppHeader from "../components/AppHeader";
import AppTextInput from "../components/AppTextInput";
import MessageCard from "../components/MessageCard";
import { UserContext } from "../context/userContext";

import moment from "moment";
import { ScrollView } from "react-native";
import MainScreen from "../components/MainScreen";
import { COLORS } from "../constants/theme";
import { AllUsersContext } from "../context/allUsersContext";
import { getUserAndSendNotification } from "../global/functions";

export function CommentsScreen({ route }) {
  const data = route.params;
  const scrollView = React.useRef();
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const { user, setUser } = React.useContext(UserContext);
  const [newMessage, setNewMessage] = useState("");
  const comment = data.messageId;
  const { users, setUsers } = React.useContext(AllUsersContext);

  //onSnapshot function to get doc and listen for changes from collection comments where id is comment
  //detect changes and update the state using onSnapshot
  const getComments = useCallback(async () => {
    //get doc from collection comments where id is comment
    const docRef = doc(db, "comments", comment);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      //get data from doc
      const data = docSnap.data();
      //get messages from data
      const messages = data.messages;
      //set messages to state
      setMessages(messages);
      console.log("Document data:", messages);
      //also if doc data gets updated, update the state
    } else {
      console.log("No such document!");
    }
  }, [comment]);

  useEffect(() => {
    getComments();
    console.log("DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATA", data);
  }, [getComments]);

  //sendMessage function to add new comment to the collection comments
  const sendMessage = async (message) => {
    const newMessage = {
      message,
      user,
      createdAt: moment().format("DD/MM/YYYY HH:mm a"),
    };
    //append new message to messages array
    const newMessages = [...messages, newMessage];

    const docRef = doc(db, "comments", comment);
    updateDoc(docRef, {
      messages: newMessages,
    })
      .then((docRef) => {
        const bodyRequest = "Message Update";
        const route = "myorders";
        getUserAndSendNotification(
          data.userData.uid,
          users,
          bodyRequest,
          route
        );
        getUserAndSendNotification(
          data.listing.postedBy.uid,
          users,
          bodyRequest,
          route
        );
        getComments();
        //update the frontend state of the messages array
      })
      .catch((error) => {
        console.error("Error adding document: ", error.message);
        Alert.alert("Error", error.message);
      });
  };

  return (
    <>
      <MainScreen>
        <AppHeader titleScreen="Inbox" onPress={() => navigation.goBack()} />
        <View style={{ flex: 1 }}>
          {/* add scroll view on message update automaticall scroll to end */}
          <ScrollView
            ref={scrollView}
            onContentSizeChange={() => scrollView.current.scrollToEnd()}
          >
            {messages.map((message, index) => (
              <View style={{ width: "100%" }} key={index}>
                <MessageCard
                  user={message.user}
                  message={message.message}
                  time={message.createdAt}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 25,
            width: "72%",
          }}
        >
          <AppTextInput
            placeholder="Type your message here..."
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
            icon="text"
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage(newMessage);
              setNewMessage("");
            }}
            style={{
              backgroundColor: COLORS.primary,
              padding: 10,
              borderRadius: 10,
              marginLeft: 10,
            }}
          >
            <Text style={{ color: COLORS.white }}>Send</Text>
          </TouchableOpacity>
        </View>
      </MainScreen>
    </>
  );
}
