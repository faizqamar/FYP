import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const BanksContext = React.createContext("");

const BanksProvider = ({ children }) => {
  const [banks, setBanks] = React.useState([]);
  const [loadBanks, setLoadBanks] = React.useState(false);

  const getBanks = async () => {
    setLoadBanks(true);
    try {
      const colRef = collection(db, "banks");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setBanks(myData);
      setLoadBanks(false);
    } catch (error) {
      console.log(error);
      setLoadBanks(false);
    }
  };

  React.useEffect(() => {
    getBanks();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", banks);
    }, 2000);
  }, []);

  return (
    <BanksContext.Provider
      value={{
        banks,
        setBanks,
        loadBanks,
        setLoadBanks,
      }}
    >
      {children}
    </BanksContext.Provider>
  );
};

export { BanksContext, BanksProvider };
