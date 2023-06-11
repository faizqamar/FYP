import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const SordersContext = React.createContext("");

const SordersProvider = ({ children }) => {
  const [sOrders, setSOrders] = React.useState([]);
  const [sOrdersLoading, setSOrdersLoading] = React.useState(false);

  const getOrders = async () => {
    setSOrdersLoading(true);
    try {
      const colRef = collection(db, "serviceOrders");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setSOrders(myData);
      setSOrdersLoading(false);
    } catch (error) {
      console.log(error);
      setSOrdersLoading(false);
    }
  };

  React.useEffect(() => {
    getOrders();
    setTimeout(() => {
      console.log("ALLLLLLLLl", sOrders);
    }, 2000);
  }, []);

  return (
    <SordersContext.Provider
      value={{
        sOrders,
        setSOrders,
        sOrdersLoading,
        setSOrdersLoading,
      }}
    >
      {children}
    </SordersContext.Provider>
  );
};

export { SordersContext, SordersProvider };
