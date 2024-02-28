import {  useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";


import { IsDataFetched } from "../hooks/isDataFetched"; 

import TopToast from "../components/toast/toastTop"; 
import CircleLoader from "../components/loader/circleLoader";



function Home() {


  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isLoading = IsDataFetched();

// ----------------------------------------------- NAVIGATION ----------------------------------------------- //

const navigate = useNavigate();
const handleDevisClick = () => {
  navigate('/devis');
}

  // ----------------------------------------------- TOAST ----------------------------------------------- //
  useEffect(() => {
    let toastTimeout: number | undefined;
    if (showToast) {
      toastTimeout = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(toastTimeout); 
  }, [showToast]);

  const testToast = () => {
    setToastMessage('Le fichier a été envoyé avec succès !');
    setShowToast(true);
  };


  // ----------------------------------------------- Gestion evenement ----------------------------------------------- //

 

  
  // ----------------------------------------------- Return Ternaire loader ----------------------------------------------- // 
  if (isLoading) {
    return <CircleLoader />; 
  }

  

  return (
    <div onClick={testToast}>
      <div onClick={handleDevisClick}>
        Accéder Devis page
      </div>

      {showToast && <TopToast message={toastMessage} css="" />}
    </div>
  );
}

export default Home;
