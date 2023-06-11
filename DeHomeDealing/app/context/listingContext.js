import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const ListingsContext = React.createContext("");

const ListingsProvider = ({ children }) => {
  const [listings, setListings] = React.useState([]);
  const [loadListings, setLoadListings] = React.useState(false);

  const getListings = async () => {
    setLoadListings(true);
    try {
      const colRef = collection(db, "listings");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setListings(myData);
      setLoadListings(false);
    } catch (error) {
      console.log(error);
      setLoadListings(false);
    }
  };

  React.useEffect(() => {
    getListings();
    setTimeout(() => {
      console.log("ALLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLl", listings);
    }, 2000);
  }, []);

  return (
    <ListingsContext.Provider
      value={{ listings, setListings, loadListings, setLoadListings }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export { ListingsContext, ListingsProvider };
