import {  useEffect, useState } from "react";
import { IsDataFetched } from "../hooks/isDataFetched"; 


import Toast from "../components/toast/toastTop"; 
import CircleLoader from "../components/loader/circleLoader";



function Home() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage] = useState('');

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
