import {  useEffect, useState, useContext } from "react";

import dataContext from "../context/dataContext";
import fetchData from "../function/fetchData";
import Toast from "../components/toast/toastTop"; 



function Home() {
  const { itemList, setItemList, clientList, setClientList, eventList, setEventList } = useContext(dataContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // ----------------------------------------------- TOAST ----------------------------------------------- //
  useEffect(() => {
    let toastTimeout: number | undefined;
    if (showToast) {
      toastTimeout = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(toastTimeout); 
  }, [showToast]);

  // ----------------------------------------------- FETCH DATA ----------------------------------------------- //

  useEffect(() => {
    fetchData(setItemList, setClientList, setEventList);
  }, [setItemList, setClientList, setEventList]);

  

  return (
    <div>
      Home
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
}

export default Home;
