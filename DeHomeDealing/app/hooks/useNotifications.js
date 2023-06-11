import React from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { Alert } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default useNotifications = (notificationListener) => {
  const notiResponseListener = React.useRef();
  const lastNotificationResponse = Notifications.useLastNotificationResponse();
  React.useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  //get user permission for the notifications
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device?.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
        Alert.alert(
          "Notification Permission",
          "You need to allow notifications"
        );
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Expo Token", token);
      if (token) {
        await uploadToken(token);
      }
    } else {
      Alert.alert("Must use physical device for Push Notifications");
    }
  };

  const uploadToken = async (token) => {
    const userToken = token;
    const data = {
      token: userToken,
    };
    const docRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(docRef, data)
      .then((docRef) => {
        console.log("token updated");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Notification not registered, please restart the app");
      });
  };
};
