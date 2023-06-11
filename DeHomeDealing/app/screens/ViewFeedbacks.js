import {
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import { FONTS } from "../constants/theme";

import LottieView from "lottie-react-native";
import { Rating, AirbnbRating } from "react-native-ratings";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import WithHeading from "../components/WithHeading";
import colors from "../config/colors";

const ViewFeedbacks = ({ route }) => {
  const [loading, setLoading] = React.useState(false);
  const data = route.params;
  const [feedbacks, setFeedbacks] = React.useState([]);
  const navigation = useNavigation();

  React.useEffect(() => {
    getFeedbacks();
  }, []);

  //get all the doc from feedback collection where reviewFor is equal to auth.currentUser.uid

  const getFeedbacks = async () => {
    setLoading(true);
    try {
      //get all the docs from feedback collection where reviewFor is equal to auth.currentUser.uid
      const q = query(
        collection(db, "feedbacks"),
        where("reviewFor", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      var myData = [];
      querySnapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });

      setFeedbacks(myData);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <MainScreen>
        <AppHeader
          titleScreen="Feedbacks"
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getFeedbacks} />
            }
          >
            <Text style={styles.title}>User's Past Feedbacks</Text>
            {feedbacks.length > 0 ? (
              <View style={{ flex: 1 }}>
                {feedbacks.map((item, index) => (
                  <View style={styles.mainCard} key={index}>
                    <AirbnbRating
                      count={5}
                      reviews={["Terrible", "Bad", "Meh", "Good", "Great Work"]}
                      defaultRating={item.rating}
                      size={20}
                      isDisabled={true}
                    />
                    <View style={styles.reviewContainer}>
                      <WithHeading heading="Review:" data={item.review} />
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: "center" }}>
                  No feedbacks to show
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      </MainScreen>
      <Modal visible={loading}>
        <View style={{ flex: 1 }}>
          <LottieView
            source={require("../../assets/animations/loading.json")}
            autoPlay
            loop
          />
        </View>
      </Modal>
    </>
  );
};

export default ViewFeedbacks;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    margin: 10,
    textAlign: "center",
  },
  mainCard: {
    backgroundColor: colors.white,
    marginHorizontal: 20,
    borderRadius: 20,
    marginVertical: 10,
  },
  reviewContainer: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
});
