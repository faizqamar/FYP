import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const AllUsersContext = React.createContext("");

const AllUsersProvider = ({ children }) => {
  const [users, setUsers] = React.useState([]);
  const [usersLoading, setUsersLoading] = React.useState(false);

  const getUsers = async () => {
    setUsersLoading(true);
    try {
      const colRef = collection(db, "users");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setUsers(myData);
      setUsersLoading(false);
    } catch (error) {
      console.log(error);
      setUsersLoading(false);
    }
  };

  React.useEffect(() => {
    getUsers();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", users);
    }, 2000);
  }, []);

  return (
    <AllUsersContext.Provider
      value={{ users, setUsers, usersLoading, setUsersLoading }}
    >
      {children}
    </AllUsersContext.Provider>
  );
};

export { AllUsersContext, AllUsersProvider };
