import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ServicesListingsContext } from "../../context/servicesContext";
import { auth } from "../../../firebase";
import MainScreen from "../../components/MainScreen";
import ServiceCard from "../../components/ServiceCard";

const MyServiceListings = () => {
  const { servicesListings, setServicesListings } = useContext(
    ServicesListingsContext
  );

  const myListings = servicesListings.filter(
    (item) => item.postedBy.uid === auth.currentUser.uid
  );
  return (
    <>
      <MainScreen>
        <View style={styles.mainContainer}>
          <Text>My Services</Text>
          {myListings.length > 0 ? (
            <View style={styles.mainIF}>
              {myListings.map((item, index) => (
                <View key={index}>
                  <ServiceCard />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.noServiceContainer}>
              <Text style={styles.noServiceText}>
                You have not posted any services yet
              </Text>
            </View>
          )}
        </View>
      </MainScreen>
    </>
  );
};

export default MyServiceListings;

const styles = StyleSheet.create({});
