import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../../firebase";
import colors from "../config/colors";
import { COLORS, FONTS } from "../constants/theme";

const MessageCard = ({ user, message = "This is my message", image, time }) => {
  return (
    <View
      style={
        user.uid === auth.currentUser.uid
          ? styles.myMessage
          : styles.otherMessage
      }
    >
      <View>
        <Text
          style={
            user.uid === auth.currentUser.uid ? styles.textMe : styles.textOther
          }
        >
          {user.username}
        </Text>
      </View>
      <Text
        style={
          user.uid === auth.currentUser.uid ? styles.textMe : styles.textOther
        }
      >
        {message}
      </Text>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {/* //time */}
      <Text
        style={
          user.uid === auth.currentUser.uid ? styles.timeMe : styles.timeOther
        }
      >
        {time}
      </Text>
    </View>
  );
};

export default MessageCard;

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  myMessage: {
    backgroundColor: COLORS.primary,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  textMe: {
    color: colors.white,
    fontSize: 14,
    fontFamily: FONTS.regular,
    padding: 5,
  },
  textOther: {
    color: COLORS.primary,
    fontSize: 14,
    fontFamily: FONTS.regular,
    padding: 5,
  },
  timeMe: {
    color: colors.white,
    fontSize: 8,
    fontFamily: FONTS.regular,
    alignSelf: "flex-end",
  },
  timeOther: {
    color: COLORS.primary,
    fontSize: 8,
    fontFamily: FONTS.regular,
    alignSelf: "flex-end",
  },
  sentText: {
    color: COLORS.gray,
    fontSize: 12,
    fontFamily: FONTS.bold,
  },
});
