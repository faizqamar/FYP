import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import MainScreen from "../components/MainScreen";
import AppHeader from "../components/AppHeader";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/theme";
import colors from "../config/colors";

const DetailedImage = ({ route }) => {
  const navigation = useNavigation();
  const data = route.params;

  const { width, height } = Dimensions.get("window");

  React.useEffect(() => {
    console.log(data);
  }, []);

  return (
    <MainScreen>
      <AppHeader titleScreen="Images" onPress={() => navigation.goBack()} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.black,
        }}
      >
        <ScrollView horizontal={true}>
          {data.map((item, index) => (
            <Image
              key={index}
              style={{ width: width, height: height / 1.2, margin: 10 }}
              source={{ uri: item }}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
      </View>
    </MainScreen>
  );
};

export default DetailedImage;

const styles = StyleSheet.create({});
