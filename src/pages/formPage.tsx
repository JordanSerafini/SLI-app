import { useEffect, useState } from "react";
import PartieContainer from "../components/form/partieContainer";
import url from "../axios/url";

function FormPage() {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [tokenData, setTokenData] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    console.log(token);
    const validateTokenUrl = `${url.main}/verifyToken?token=${token}`;

    if (token) {
        console.log("Envoi de la requête de validation :", validateTokenUrl);

        fetch(validateTokenUrl)
            .then((response) => {
                console.log('Statut de la réponse du serveur :', response.status);

                if (!response.ok) {
                    throw new Error("Réponse serveur invalide");
                }

                return response.json();
            })
            .then((data) => {
                console.log("Réponse serveur :", data);

                if (data.isValid) {
                    console.log("Token valide :", data.data);
                    setIsValidToken(true);
                    setTokenData(data.data);
                } else {
                    console.error("Token invalide :", data.error);
                    setIsValidToken(false);
                }
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

  useEffect(() => {
    if (isValidToken) {
      console.log("Token valide:", tokenData);
    }
  }, [isValidToken, tokenData]);


  return (
    <div className="bg-bg-lightgray mb-20 h-screen w-screen flex flex-col items-center overflow-auto">
      {isValidToken === null ? (
        <p>Vérification du token en cours...</p>
      ) : isValidToken ? (
        <PartieContainer />
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
