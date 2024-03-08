import { useState } from "react";
import { useNavigate } from "react-router-dom";
import url from "../axios/url";
import sliLogo from "../assets/logoSLI.png";
import MiddleToast from "../components/toast/middleToast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const loginUrl = `${url.heroku}/login`;
    const requestData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Erreur de connexion au serveur.");
    }
  };

  return (
    <div className="bg-bg-2 h-screen w-screen flex flex-col items-center justify-center">
      <div className="h-9.5/10 w-9/10 bg-white rounded-lg p-2 flex flex-col justify-evenly">
        <div>
          <img src={sliLogo} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-2"
        >
          <label htmlFor="email" className="">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border-1 border-blue-2 p-2 rounded-3xl w-9/10 focus:border-blue-2 custom-input"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border-1 border-blue-2 p-2 rounded-3xl w-9/10 focus:border-blue-2 custom-input"
          />
          <button type="submit">Login</button>
        </form>
        <MiddleToast message={error} show={!!error} />
      </div>
    </div>
  );
};

export default LoginPage;
