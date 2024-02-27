import {
  useState,
  useContext,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { IsDataFetched } from "../hooks/isDataFetched";

import dataContext from "../context/dataContext";
import Card from "../components/card";
import debounce from "../services/debounce";
import CircleLoader from "../components/loader/circleLoader";
import euroLogo from "../assets/euroLogo.png";

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

  //---------------------------------------------------------- Optimisation pour afficher les numéros de page (les 3 précédents et les 3 suivants)  ----------------------------------------------------------
  pageNumbers = pageNumbers.filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      (number >= currentPage - 3 && number <= currentPage + 3)
  );

  // ---------------------------------------------------------------------- Card detail ----------------------------------------------------------------------
  const handleDetailClick = (id: string) => {
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

  const handleSearchChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchTerm(event.target.value);
    },
    [debouncedSetSearchTerm]
  );

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
      <div className="h-full w-9/10 flex flex-col  self-center  ">
        {/*  ---------------------------------------------------------------------- Zone pour afficher des détails de l'article sélectionné  ----------------------------------------------------------------------*/}
        {selectedCard ? (
          <div className="h-5/10 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col justify-evenly gap-2">
            {/* Affiche les détails de la carte ici */}
            {selectedCard.caption && (
              <h2 className="text-center bold border-b-1 border-secondary h-3/10 ">
                {selectedCard.caption}
              </h2>
            )}

            {/* ---------------------------------- Description et note ------------------------------------------ */}
            <div className="flex flex-col gap-2 h-/10">
              {!selectedCard.descComClear ? (
                <p>Pas de description</p>
              ) : (
                <p className="max-h-10 overflow-hidden">
                  {selectedCard.descComClear}
                </p>
              )}
              {!selectedCard.notesclear ? (
                <p>Pas de notes</p>
              ) : (
                <div className="flex flex-row gap-2">
                  <h3>notes: </h3>
                  <div className="max-h-10 overflow-auto">
                    {selectedCard.notesclear}
                  </div>
                </div>
              )}
            </div>

                        {/* ---------------------------------- Prix et stock ------------------------------------------ */}

            <div className="flex flex-row justify-between p-2">
              {selectedCard.salepricevatincluded && (
                <div className="flex flex-row items-center gap-2">
                  <img src={euroLogo} alt="Prix" className="h-4" />
                  <span className="bold text-accent">
                    {selectedCard.salepricevatincluded}
                  </span>
                </div>
              )}
              {selectedCard.realstock &&
                String(selectedCard.realstock) !== "0" && (
                  <div className="badge badge-neutral badge-outline flex flex-row gap-2 items-center">
                    En stock !{" "}
                    <span className="bold">{selectedCard.realstock}</span>
                  </div>
                )}
              {selectedCard.realstock &&
                Number(selectedCard.realstock) === 0 && (
                  <div className="badge badge-warning badge-outline flex flex-row gap-2 items-center">
                    Pas de stock
                  </div>
                )}
            </div>

                        {/* ----------------------------------  ------------------------------------------ */}

            
          </div>
        ) : (
          <div className="h-5/10 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col gap-2">
            <h2>Selectionnez un article pour voir les détails</h2>
          </div>
        )}

        {/*  ---------------------------------------------------------------------- Carousel de CARDS  ---------------------------------------------------------------------- */}
        <div className="gap-8 carousel rounded-box pb-4">
          {currentItems.map((card, index) => (
            <Card
              id={card.id}
              css="carousel-item w-8/10 md:w-3/10 bg-bgMain text-text shadow-effect "
              key={`${index}_${card.id}`}
              caption={card.caption}
              img={card.image_url}
              onDetailClick={(id: string) => handleDetailClick(id)}
            />
          ))}
        </div>

        {/* ----------------------------------------------------------------------  Pagination  ---------------------------------------------------------------------- */}
        <div className="pagination flex justify-center space-x-2 mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-bgMain text-accent"
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
          className="self-center mt-4 input w-full max-w-xs bg-bgMain border-1 border-primary focus:border-secondary focus: mb-24"
        />
      </div>
    </>
  );
}

export default ArticlesList;
