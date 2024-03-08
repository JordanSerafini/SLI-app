import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DisconnectButton from "../components/buttons/disconnectBtn";
import url from "../axios/url";
import BottomNav from "../components/nav/bottomNav";

function Home() {
  const [email, setEmail] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${url.main}/sendForm`, { email });
      console.log("E-mail envoyé avec succès a", email);
      setToastMessage("E-mail envoyé avec succès !");
      setShowToast(true);
    } catch (error) {
      console.log("Erreur lors de l'envoi de l'e-mail :", error);
      setToastMessage("Erreur lors de l'envoi de l'e-mail");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDevisClick = () => {
    navigate("/devis");
  };

  const handleArticleClick = () => {
    navigate("/addArticle");
  };

  const handleChartsClick = () => {
    navigate("/charts");
  };

  const handleTestClick = () => {
    navigate("/test");
  };

  const handleFormPageClick = () => {
    navigate("/form-satisfaction");
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center gap-4">
      <div onClick={handleDevisClick}>Accéder Devis page</div>
      <div onClick={handleArticleClick}>Accéder Article form page</div>
      <div onClick={handleChartsClick}>Accéder Charts page</div>
      <div onClick={handleTestClick}>Accéder Test page</div>
      <div onClick={handleFormPageClick}>Accéder Form page</div>

      <div className="h-5/10 w-9.5/10  bg-white rounded-lg pt-8">
        <form
          onSubmit={handleSubmit}
          className=" w-10/10 flex flex-row justify-between "
        >
          <label htmlFor="email" className="p-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-1 border-blue-1 p-2 rounded-3xl w-8/10 focus:border-blue-1 custom-input"
            required
          />
          <button type="submit" className="bg-blue-1 p-2 rounded-2xl">
            Envoyer
          </button>
        </form>
      </div>
      <DisconnectButton />
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-bg-2 p-2 rounded-lg">
          <p>{toastMessage}</p>
        </div>
      )}
      {isLoading && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-bg-2 bg-opacity-50 flex justify-center items-center">
          <p>Chargement...</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

export default Home;
