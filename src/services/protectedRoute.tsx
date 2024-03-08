import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import url from '../axios/url';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        //console.log('Token :', token);
        if (!token) {
          throw new Error('Token non trouvé');
        }
        const response = await fetch(`${url.main}/validateTokenHeader`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
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
  
    verifyToken();
  }, [navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
