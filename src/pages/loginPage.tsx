import { useState } from 'react';
import axios from 'axios';
import url from '../axios/url';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${url.heroku}/login`, { email, password });
      
      localStorage.setItem('token', response.data.token);

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
};

export default LoginPage;
