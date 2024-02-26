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

//----------------------------------------------------------- Calculer les indices des premiers et derniers éléments de la page actuelle pour les éléments filtrés
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(filteredItems.length / itemsPerPage);


  // --------------------------------------------------------------------------------Changer la page --------------------------------------------------------------------------------
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // -------------------------------------------------------------------------------- Générer les numéros de page pour la pagination --------------------------------------------------------------------------------
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

  //---------------------------------------------------------- Optimisation pour afficher les numéros de page (les 3 précédents et les 3 suivants)
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
            <img className="h-20" src={selectedCard.image_url} alt={selectedCard.caption} />
            <p>{selectedCard.descComClear}</p>
            <p>Prix: {selectedCard.salepricevatincluded}</p>
          </div>
        ) : (
          <div className="h-5/10">
            <h2>Selectionnez un article pour voir les détails</h2>
          </div>
        )
      }


        {/* Carousel de CARDS*/}
        <div className="gap-8 carousel rounded-box ">
          {currentItems.map((card, index) => (
            <Card
              id={card.id}
              css="carousel-item w-8/10 bg-white text-text border-2 border-secondary "
              key={`${index}_${card.id}`}
              caption={card.caption}
              img={card.image_url}
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
              } rounded-full w-10 h-10 border-1 border-primary `}
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
