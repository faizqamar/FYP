import React from "react";

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

const OrdersContext = React.createContext("");

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = React.useState([]);
  const [ordersLoading, setOrdersLoading] = React.useState(false);

  const getOrders = async () => {
    setOrdersLoading(true);
    try {
      const colRef = collection(db, "orders");
      const snapshot = await getDocs(colRef);
      var myData = [];
      //store the data in an array myData
      snapshot.forEach((doc) => {
        myData.push({ ...doc.data() });
      });
      setOrders(myData);
      setOrdersLoading(false);
    } catch (error) {
      console.log(error);
      setOrdersLoading(false);
    }
  };

  React.useEffect(() => {
    getOrders();
    setTimeout(() => {
      console.log("ALLLLLLLLl", orders);
    }, 2000);
  }, []);

  return (
    <OrdersContext.Provider
      value={{ orders, setOrders, ordersLoading, setOrdersLoading }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };
