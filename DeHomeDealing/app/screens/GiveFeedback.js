import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONTS } from "../constants/theme";

import { Rating, AirbnbRating } from "react-native-ratings";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { randomString } from "../global/functions";

import LottieView from "lottie-react-native";

const GiveFeedback = ({ route }) => {
  const data = route.params;
  const [count, setCount] = React.useState(5);
  const [text, setText] = React.useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const handlePress = async () => {
    setLoading(true);
    const myDocId =
      auth.currentUser.uid === data.owner.uid
        ? data.owner.uid + data.user.uid
        : data.user.uid + data.owner.uid;
    if (text.length === 0) {
      Alert.alert("Please write some review");
      setLoading(false);
    } else {
      await setDoc(doc(db, "feedbacks", myDocId), {
        rating: count,
        review: text,
        createdAt: new Date(),
        reviewFor:
          auth.currentUser.uid === data.owner.uid
            ? data.user.uid
            : data.owner.uid,
        reviewBy: auth.currentUser.uid,
      });
      Alert.alert("Feedback Posted Successfully");
      navigation.navigate("mHome");
      setLoading(false);
    }
  };

  return (
    <>
      <MainScreen>
        <AppHeader
          onPress={() => navigation.goBack()}
          titleScreen="Give Feedback"
        />
        <View style={styles.mainContainer}>
          <Text style={styles.title}>Feedback</Text>
          <View>
            <AirbnbRating
              count={5}
              reviews={["Terrible", "Bad", "Meh", "OK", "Best"]}
              defaultRating={count}
              size={30}
              onFinishRating={(rating) => setCount(rating)}
            />

            <AppTextInput
              placeholder="Write Review"
              value={text}
              onChangeText={(text) => setText(text)}
            />

            <AppButton title="Post Feedback" onPress={handlePress} />
          </View>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/feedback.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default GiveFeedback;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginVertical: 20,
    color: COLORS.secondary,
    textAlign: "center",
  },
});
