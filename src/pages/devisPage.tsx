import { SetStateAction, useContext, useState } from "react";
import dataContext from "../context/dataContext";
import { Article } from "../context/dataContext";

function DevisPage() {
  const { itemList, devis, setDevis, setDevisList } = useContext(dataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticleId, setSelectedArticleId] = useState("");
  const [devisName, setDevisName] = useState("");

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSelectedArticleId(event.target.value);
  };

  const handleSearchChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(event.target.value);
  };

  const filteredItems = itemList.filter((article) =>
    article.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDevisNameChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setDevisName(event.target.value); // Mettre à jour le nom du devis
  };

  const addArticleToDevis = () => {
    const selectedArticle = itemList.find(
      (article) => article.id === selectedArticleId
    );
    if (selectedArticle) {
      setDevis((prevDevis) => ({
        ...prevDevis,
        articles: [...prevDevis.articles, selectedArticle],
      }));
    }
  };

  const removeArticleFromDevis = (articleId: string) => {
    setDevis((prevDevis) => ({
      ...prevDevis,
      articles: prevDevis.articles.filter((article) => article.id !== articleId),
    }));
  };

  const validateDevis = () => {
    if (devis.articles.length > 0 && devisName.trim() !== "") {
      const newDevis = { ...devis, id: Date.now().toString(), name: devisName };
      setDevisList((prevDevisList) => [...prevDevisList, newDevis]);
      setDevis({ id: "", name: "", articles: [] });
      setDevisName("");
    } else {
      // Gérer erreur si le devis est vide ou erroné etc
    }
  };

  return (
    <div className="flex flex-col h-screen w-10/10  items-center p-2">
      {/* -------------------------------------- Entete top nom et validation -----------------------------------*/}
      
      <div className="flex flex-row gap-2">
        <input
          type="text"
          placeholder="Nom du devis"
          value={devisName}
          onChange={handleDevisNameChange}
          className="mb-4 p-2 border-2 border-secondary rounded-md"
        />
        <button onClick={validateDevis} className="btn btn- btn-primary">
          Valider
        </button>
      </div>

      {/* -------------------------------------- Map des articles du devis -----------------------------------*/}

      {devis.articles && devis.articles.length > 0 ? (
        <div className="w-9.5/10 h-6/10 bg-white border-1 border-secondary-dark rounded-xl p-2">
          <ul>
            {devis.articles.map((article: Article, index: number) => (
              <li key={index} className="border-b-1 border-secondary-dark p-2">
                {article.caption} - Quantité: 1 - Prix HT:{" "}
                {article.salepricevatincluded}€
                <span
                  className="ml-2 cursor-pointer text-red-500"
                  onClick={() => removeArticleFromDevis(article.id)}
                >
                  X
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="w-9.5/10 h-6/10 bg-white border-1 border-secondary-dark rounded-xl p-2">
          <p>Aucun article sélectionné</p>
        </div>
      )}

            {/* -------------------------------------- Input recherche  -----------------------------------*/}

      <div className="w-10/10 items-center flex flex-col gap-2 mt-2">
        <input
          type="text"
          placeholder="Recherchez un article..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-9/10 h-10 border-2 border-secondary rounded-md"
        />
        <select
          id="article-select"
          value={selectedArticleId}
          onChange={handleSelectChange}
          className="w-9/10 h-10 border-2 border-secondary rounded-md"
        >
          <option value="">--Sélectionnez un article--</option>
          {filteredItems.map((article: Article, index: number) => (
            <option key={index} value={article.id}>
              {article.caption} - {article.salepricevatincluded}€ (HT)
            </option>
          ))}
        </select>
        <button
          onClick={addArticleToDevis}
          className="btn btn-outline bg-white btn-primary tracking-widest"
        >
          Ajouter l'article
        </button>
      </div>
    </div>
  );
}

export default DevisPage;
