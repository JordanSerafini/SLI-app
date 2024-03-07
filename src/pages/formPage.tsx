import { useEffect, useState } from 'react';
import PartieContainer from "../components/form/partieContainer";
import url from '../axios/url';


function FormPage() {
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
  const [tokenData, setTokenData] = useState({});

  useEffect(() => {
    // Extrait le token de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // Définit l'URL de votre API de backend pour la validation du token
    const validateTokenUrl = `${url.heroku}/validateToken?token=${token}`;

    if (token) {
      fetch(validateTokenUrl)
        .then(response => response.json())
        .then(data => {
          setIsValidToken(data.isValid);
          if (data.isValid) {
            setTokenData(data.data);
            console.log('Token valide:',tokenData);
          } else {
            console.error('Token invalide:', data.error);
          }
        })
        .catch(error => {
          console.error('Erreur lors de la validation du token:', error);
          setIsValidToken(false);
        });
    } else {
      console.error('Token manquant dans l\'URL');
      setIsValidToken(false);
    }
  }, [tokenData]);

  return (
    <div className="bg-bg-lightgray mb-20 h-screen w-screen flex flex-col items-center overflow-auto">
      {isValidToken === null ? (
        <p>Vérification du token en cours...</p>
      ) : isValidToken ? (
        <PartieContainer />
      ) : (
        <p>Token invalide ou expiré. Veuillez vérifier votre lien ou contacter l'administrateur.</p>
      )}
    </div>
  );
}

export default FormPage;
