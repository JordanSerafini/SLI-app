import { useState, useContext, ChangeEvent, useEffect, useCallback } from "react";
import { IsDataFetched } from "../hooks/isDataFetched"; 

import dataContext from "../context/dataContext";
import Card from "../components/card";
import debounce from "../services/debounce";
import CircleLoader from "../components/loader/circleLoader";

function ArticlesList() {
  const { itemList } = useContext(dataContext);
  const [cardSelected, setCardSelected] = useState({}); 

  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = IsDataFetched();





  // -------------------------------------------------------------------------------- Pagination -----------------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const filteredItems = itemList.filter((item) =>
  item.caption.toLowerCase().includes(searchTerm.toLowerCase())
);

// Calculer les indices des premiers et derniers éléments de la page actuelle pour les éléments filtrés
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


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


  // ---------------------------------------------------------------------- Input recherche ----------------------------------------------------------------------

// Créez un gestionnaire de recherche debounced
const debouncedSetSearchTerm = useCallback(
  debounce((...args: unknown[]) => {
    const newSearchTerm = args[0] as string;
    setSearchTerm(newSearchTerm);
    setCurrentPage(1); 
  }, 50),
  [setSearchTerm, setCurrentPage] 
);

const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
  debouncedSetSearchTerm(event.target.value);
}, [debouncedSetSearchTerm]);

useEffect(() => {
  return () => {
    debouncedSetSearchTerm.cancel(); 
  };
}, [debouncedSetSearchTerm]);

  // ---------------------------------------------------------------------- Affichage ----------------------------------------------------------------------

  if (isLoading) {
    return <CircleLoader />; 
  }

  return (
    <>
      <div className="h-screen w-9.5/10 flex flex-col self-center justify-start mb-20">
      

        {/* Zone pour afficher des détails de l'article sélectionné */}
        {selectedCard? (
        <div className="h-6/10">
            {/* Affiche les détails de la carte ici */}
            <h2>{selectedCard.caption}</h2>
            <img className="h-20" src="data:image/jpeg;base64,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" alt={selectedCard.caption} />
            <p>{selectedCard.descComClear}</p>
            <p>Prix: {selectedCard.salepricevatincluded}</p>
          </div>
        ) : (
          <div className="h-5/10">
            <h2>Selectionnez un article pour voir les détails</h2>
          </div>
        )
      }

        {/* Carousel */}
        <div className="gap-8 carousel rounded-box ">
          {currentItems.map((card, index) => (
            <Card
              id={card.id}
              css="carousel-item w-8/10"
              key={`${index}_${card.id}`}
              caption={card.caption}
              img="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              onDetailClick={handleDetailClick}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination flex justify-center space-x-2 mt-4">
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
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-4 input input-bordered w-full max-w-xs"
        />
      </div>
    </>
  );
}

export default ArticlesList;
