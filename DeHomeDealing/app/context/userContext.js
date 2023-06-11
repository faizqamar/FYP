import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
//create a context object
const UserContext = React.createContext();
//create a provider for components to consume and subscribe to changes
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const [userDataLoading, setUserDataLoading] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    try {
      setUserDataLoading(true);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        //store data in AsyncStorage as user

        setUser(docSnap.data());
        AsyncStorage.setItem("user", JSON.stringify(docSnap.data()));
        console.log("User data successfully loaded!", user);
        setUserDataLoading(false);
      } else {
        console.log("Document does not exist");
        setUserDataLoading(false);
      }
    } catch (error) {
      console.log(error);
      setUserDataLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{ user, setUser, userDataLoading, setUserDataLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

//make the context object available to the app
export { UserContext, UserProvider };
