import { useState, useContext } from "react";

import dataContext from "../context/dataContext";
import Card from "../components/card";

function ArticlesList() {
  const { itemList } = useContext(dataContext);
  const [cardSelected, setCardSelected] = useState({}); 
  // -------------------------------------------------------------------------------- Pagination -----------------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // Calculer les indices des premiers et derniers éléments de la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Extraire les éléments à afficher pour la page actuelle
  const currentItems = itemList.slice(indexOfFirstItem, indexOfLastItem);

  // Calculer le nombre total de pages
  const totalPages = Math.ceil(itemList.length / itemsPerPage);

  // Changer la page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Générer les numéros de page pour la pagination
  let pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 3 && i <= currentPage + 3)
    ) {
      pageNumbers.push(i);
    }
  }

  // Optimisation pour afficher les numéros de page (les 3 précédents et les 3 suivants)
  pageNumbers = pageNumbers.filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      (number >= currentPage - 3 && number <= currentPage + 3)
  );

  // ---------------------------------------------------------------------- Card detail ----------------------------------------------------------------------
  const handleDetailClick = (id: number) => {
    setCardSelected(id);
    
  };

  const selectedCard = itemList.find((card) => card.id === cardSelected);

  // ---------------------------------------------------------------------- Affichage ----------------------------------------------------------------------

  return (
    <>
      <div className="h-screen w-9.5/10 flex flex-col self-center justify-start">
        {/* Zone pour afficher des détails de l'article sélectionné */}
        {selectedCard? (
        <div className="h-5/10">
            {/* Affiche les détails de la carte ici */}
            <h2>{selectedCard.caption}</h2>
            <img className="h-20" src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt={selectedCard.caption} />
            <p>{selectedCard.descComClear}</p>
            {/* Ajoute d'autres détails que tu souhaites montrer */}
          </div>
        ) : (
          <div className="h-5/10">
            <h2>Selectionnez un article pour voir les détails</h2>
          </div>
        )
      }

        {/* Carousel */}
        <div className="h-3/10 gap-8 carousel rounded-box ">
          {currentItems.map((card) => (
            <Card
              id={card.id}
              css="carousel-item w-8/10 h-10/10"
              key={card.id}
              caption={card.caption}
              img="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="h-1/10 pagination flex justify-center space-x-2 mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              } rounded-full w-10 h-10 border-2 border-gray-300`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default ArticlesList;
