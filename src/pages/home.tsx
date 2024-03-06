import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IsDataFetched } from "../hooks/isDataFetched";

import TopToast from "../components/toast/toastTop";
import CircleLoader from "../components/loader/circleLoader";

function Home() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage] = useState("");

  const isLoading = IsDataFetched();


  // ----------------------------------------------- NAVIGATION ----------------------------------------------- //

  const navigate = useNavigate();
  const handleDevisClick = () => {
    navigate("/devis");
  };

  const handleArticleClick = () => {
    navigate("/addArticle");
  };

  const handleChartsClick = () => {
    navigate("/charts");
  };

  const handleTestClick = () => {
    navigate("/test");
  };

  const handleFormClick = () => {
    navigate("/form");
  };

  // ----------------------------------------------- TOAST ----------------------------------------------- //
  useEffect(() => {
    let toastTimeout: number | undefined;
    if (showToast) {
      toastTimeout = setTimeout(() => setShowToast(false), 3000);
    }
    return () => clearTimeout(toastTimeout);
  }, [showToast]);
/*
  const testToast = () => {
    setToastMessage("Le fichier a été envoyé avec succès !");
    setShowToast(true);
  };
  console.log(testToast);
*/
  // ----------------------------------------------- Gestion evenement ----------------------------------------------- //

  // ----------------------------------------------- Return Ternaire loader ----------------------------------------------- //
  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div>
      <div onClick={handleDevisClick}>Accéder Devis page</div>

      <div onClick={handleArticleClick}>Accéder Article form page</div>

      <div onClick={handleChartsClick}>Accéder Charts page</div>

      <div onClick={handleTestClick}>Accéder Test page</div>

      <div onClick={handleFormClick}>Accéder Form page</div>


      {showToast && <TopToast message={toastMessage} css="" />}
    </div>
  );
}

export default Home;
