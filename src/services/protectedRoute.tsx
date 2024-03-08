import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import url from '../axios/url';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const validateTokenHeader = async () => { // ----------------------------- dans le storage et dans le header >>> vérification si token valide, expiré ou non
      try {
        const storageToken = localStorage.getItem('token');
        //console.log('Token :', token);
        if (!storageToken) {
          throw new Error('Token non trouvé');
        }
        const response = await fetch(`${url.main}/validateTokenHeader`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageToken}`
          },
        });

        if (!response.ok) {
          throw new Error('Échec de la vérification du token');
        }


      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        navigate('/login');
      }


    };

    const verifyTokenStorage = async () => {    // vérification si token dans le storage est BLACKLISTED
      try {
        const storageToken = localStorage.getItem('token');
    
        if (!storageToken) {
          throw new Error('Token non trouvé');
        }
    
        const response = await fetch(`${url.main}/verifyTokenHeader`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storageToken}`
          },
        });
    
        if (!response.ok) {
          throw new Error('Échec de la vérification du token');
        }
    
        
    
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        navigate('/login');
      }
    }
    

    validateTokenHeader();
    verifyTokenStorage();

  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
