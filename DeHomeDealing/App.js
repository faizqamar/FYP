import { StyleSheet, LogBox, Image } from "react-native";
import React, { useState } from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import colors from "./app/config/colors";
import { useFonts } from "expo-font";
import { UserProvider } from "./app/context/userContext";
import { ListingsProvider } from "./app/context/listingContext";
import { AgreementsProvider } from "./app/context/agreementContext";
import { BanksProvider } from "./app/context/banksContext";
import { AllUsersProvider } from "./app/context/allUsersContext";
import { OrdersProvider } from "./app/context/ordersContext";
import { ServicesProvider } from "./app/context/servicesContext";
import { SordersProvider } from "./app/context/sOrdersContext";
import { StripeProvider } from "@stripe/stripe-react-native";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.light,
  },
};

const App = () => {
  const [user, setUser] = useState(null);
  LogBox.ignoreAllLogs();
  React.useEffect(() => {
    firebaseAuthState();
  }, []);

  const firebaseAuthState = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  };
  const [fontsLoaded] = useFonts({
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  if (!fontsLoaded) return null;
  return (
    <AllUsersProvider>
      <OrdersProvider>
        <AgreementsProvider>
          <BanksProvider>
            <ListingsProvider>
              <ServicesProvider>
                <SordersProvider>
                  <StripeProvider publishableKey="pk_test_51LrHfaCHHxU4hGNy8oQdWJuSWwD0J9nNRmyyhyQNG0he8a5KOLNVhxE8lgZ2d7KhPfmlhgHETZAolwgVSoIC64Lw00EWtW8fvV">
                    <UserProvider>
                      <NavigationContainer theme={theme}>
                        {user ? <TabNavigator /> : <AuthNavigator />}
                      </NavigationContainer>
                    </UserProvider>
                  </StripeProvider>
                </SordersProvider>
              </ServicesProvider>
            </ListingsProvider>
          </BanksProvider>
        </AgreementsProvider>
      </OrdersProvider>
    </AllUsersProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
