import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import url from '../axios/url';



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const verifyToken = async () => {
    try {
      const response = await fetch(`${url.heroku}/verifyToken`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error('Unauthorized');
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du token :', error);
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  useEffect(() => {
    verifyToken();
  }, [navigate]); 

  return children;
}

export default ProtectedRoute;
