import {  useEffect, useState, useContext } from "react";
import { IsDataFetched } from "../hooks/isDataFetched"; 


import dataContext from "../context/dataContext";
import Toast from "../components/toast/toastTop"; 
import CircleLoader from "../components/loader/circleLoader";



function Home() {
  const { itemList, setItemList, clientList, setClientList, eventList, setEventList } = useContext(dataContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isLoading = IsDataFetched();

  // ----------------------------------------------- TOAST ----------------------------------------------- //
  useEffect(() => {
    let toastTimeout: number | undefined;
    if (showToast) {
      toastTimeout = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(toastTimeout); 
  }, [showToast]);


  if (isLoading) {
    return <CircleLoader />; 
  }

  

  return (
    <div>
      Home
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
}

export default Home;
