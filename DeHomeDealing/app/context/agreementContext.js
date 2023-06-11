import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";

const AgreementsContext = React.createContext("");

const AgreementsProvider = ({ children }) => {
  const [agreements, setAgreements] = React.useState([]);
  const [loadAgreements, setLoadAgreements] = React.useState(false);

  const getAgreements = async () => {
    setLoadAgreements(true);
    try {
      const colRef = collection(db, "agreements");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      //filter myData where uid ===auth.currentUser.uid
      myData = myData.filter((item) => item.uid === auth.currentUser.uid);
      setAgreements(myData);
      setLoadAgreements(false);
    } catch (error) {
      console.log(error);
      setLoadAgreements(false);
    }
  };

  React.useEffect(() => {
    getAgreements();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", agreements);
    }, 2000);
  }, []);

  return (
    <AgreementsContext.Provider
      value={{ agreements, setAgreements, loadAgreements, setLoadAgreements }}
    >
      {children}
    </AgreementsContext.Provider>
  );
};

export { AgreementsContext, AgreementsProvider };
