import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import url from '../axios/url';

const ProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found');
        }
        const response = await fetch(`${url.heroku}/verifyToken`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        // Si la vérification réussit, ne faites rien et laissez l'utilisateur accéder à la page.
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        navigate('/login');
      }
    };
  
    verifyToken();
  }, [navigate]);

  return <Outlet />; // Rend les composants enfants si le token est vérifié
};

export default ProtectedRoute;
