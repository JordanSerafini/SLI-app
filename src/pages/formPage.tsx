import React, { useEffect, useState } from "react";
import PartieContainer from "../components/form/partieContainer";
import url from "../axios/url";

function FormPage() {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [tokenDta, setTokenData] = useState<{
    email: string;
    exp: number;
    iat: number;
  } | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      const validateTokenUrl = `${url.main}/verifyToken?token=${token}`;

      fetch(validateTokenUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Réponse serveur invalide");
          }
          return response.json();
        })
        .then((data) => {
          setIsValidToken(true);
          setTokenData(data.decoded);
          console.log("Token valide :", data.decoded);
        })
        .catch((error) => {
          console.error("Erreur lors de la validation du token :", error);
          setIsValidToken(false);
        });
    } else {
      console.error("Token manquant dans l'URL");
      setIsValidToken(false);
    }
  }, []);

  return (
    <div className="bg-bg-lightgray mb-20 h-screen w-screen flex flex-col items-center overflow-auto">
      {isValidToken === null ? (
        <p>Vérification du token en cours...</p>
      ) : isValidToken ? (
        <PartieContainer/>
      ) : (
        <p>
          Token invalide ou expiré. Veuillez vérifier votre lien ou contacter
          l'administrateur.
        </p>
      )}
    </div>
  );
}

export default FormPage;
