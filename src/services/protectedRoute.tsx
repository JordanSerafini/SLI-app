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
      } catch (error) {
        console.error('Erreur lors de la vérification du token :', error);
        navigate('/login');
      }
    };
  
    verifyToken();
  }, []);

  return <Outlet />; // 
};

export default ProtectedRoute;
