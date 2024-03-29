import {
  useState,
  useContext,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import { IsDataFetched } from "../hooks/isDataFetched";

import { ThemeContext } from "../context/theme/themeContext";
import dataContext from "../context/dataContext";
import Card from "../components/cards/article/articleCard";
import DetailCard from "../components/cards/article/detailCard";
import ThemeBtn from "../components/buttons/themeBtn";

import debounce from "../services/debounce";
import CircleLoader from "../components/loader/circleLoader";
import TopToast from "../components/toast/toastTop";
import BottomNav from "../components/nav/bottomNav";

function ArticlesList() {
  const { itemList } = useContext(dataContext);
  const { theme } = useContext(ThemeContext);
  const [cardSelected, setCardSelected] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const isLoading = IsDataFetched();


  let ThemeCss: string;
  let bgColor: string;
  let inputColor: string;

  switch (theme) {
      case "main":
          ThemeCss = "shadow-effect  w-8/10 ";
          bgColor = "bg-secondary-dark";
          inputColor = "border-secondary-dark";
          break;
      case "second":
          ThemeCss = "shadow-effect-primaryNew border-1 border-primary-new w-10/10 ";
          bgColor = "bg-primary-new";
          inputColor = "border-primary-new ";
          break;
      case "third":
          ThemeCss = "border-1 border-blue-200 shadow-effect-blue w-4.5/10 text-xs";
          bgColor = "bg-blue-300";
          inputColor = "border-blue-300 ";
          break;
      default:
          ThemeCss = ""; 
          bgColor = "";
          inputColor = "";
          break;
  }


  // -------------------------------------------------------------------------------- Pagination -----------------------------------------------------------------------------------
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const filteredItems = itemList.filter((item) =>
  item.caption ? item.caption.toLowerCase().includes(searchTerm.toLowerCase()) : false
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

  // ---------------------------------------------------------------------- Toast ----------------------------------------------------------------------

  useEffect(() => {
    let toastTimeout: number | undefined;

    // Affiche un message d'alerte si le stock est faible
    if (selectedCard && selectedCard.realstock < 5) {
      const message =
        selectedCard.realstock == 0
          ? "Plus de stock pour cet article !"
          : `Attention, il ne reste que ${selectedCard.realstock} exemplaire(s)!`;

      setToastMessage(message);
      setShowToast(true);

      // Démarrer le timer pour masquer le toast après 3 secondes
      toastTimeout = setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } else {
      // Si le stock est suffisant, masquer le toast sans démarrer un timer
      setShowToast(false);
    }

    return () => {
      // Nettoyage : arrêter le timer lorsque le composant est démonté ou avant que l'effet ne s'exécute à nouveau
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [selectedCard]); // Retirer showToast des dépendances

  const toastCss =
    selectedCard && selectedCard.realstock == 0
      ? `bg-warning text-white` // Pour realstock == 0
      : `bg-orange-500 text-white`; // Pour realstock > 0 et <= 5

  // ---------------------------------------------------------------------- Affichage ----------------------------------------------------------------------

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <>
      <div className="h-10/10 w-9/10 flex flex-col self-center item-center justify-start">
        {/*  ---------------------------------------------------------------------- Zone pour afficher des détails de l'article sélectionné  ----------------------------------------------------------------------*/}

        {selectedCard ? (
          <DetailCard selectedCard={selectedCard} />
        ) : (
          <div className="h-5/10 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col gap-2">
            <h2>Sélectionnez un article pour voir les détails</h2>
          </div>
        )}

        {/*  ---------------------------------------------------------------------- Carousel de CARDS  ---------------------------------------------------------------------- */}
        <div className="h-3/10 gap-8 carousel rounded-box pb-4 regular tracking-wider">
          {currentItems.map((card, index) => (
            <Card
              id={card.id}
              css={`carousel-item md:w-4.5/10 bg-bgMain text- ${ThemeCss}`}
              key={`${index}_${card.id}`}
              caption={card.caption}
              img={card.image_url}
              onDetailClick={(id: string) => handleDetailClick(id)}
              familyid={card.familyid}
            />
          ))}
        </div>

        {/* ----------------------------------------------------------------------  Pagination  ---------------------------------------------------------------------- */}
        <div className="h-2/10 mb-14 flex flex-col">
        <div className="pagination flex justify-center space-x-2">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${
                currentPage === number
                  ? bgColor + ' text-white'
                  : "bg-bgMain text-accent"
              } rounded-full w-10 h-10 border-1 border-secondary-dark text-primary `}
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
          className={` self-center mt-4 input w-full max-w-xs bg-bgMain border-1 ${inputColor} focus:border-secondary focus:`}
        />
      </div>
      <ThemeBtn />
      <BottomNav />
      </div>
      {showToast && (
        <TopToast
          message={toastMessage}
          css={`
            ${toastCss}
          `}
        />
      )}
    </>
  );
}

export default ArticlesList;
