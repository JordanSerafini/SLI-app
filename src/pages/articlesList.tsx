import { useState, useContext } from "react";

import dataContext from "../context/dataContext";
import Card from "../components/card";

function ArticlesList() {
  const { itemList } = useContext(dataContext);

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
    if (i === 1 || i === totalPages || (i >= currentPage - 3 && i <= currentPage + 3)) {
      pageNumbers.push(i);
    }
  }

  // Optimisation pour afficher les numéros de page (les 3 précédents et les 3 suivants)
  pageNumbers = pageNumbers.filter((number) =>
    number === 1 ||
    number === totalPages ||
    (number >= currentPage - 3 && number <= currentPage + 3)
  );


  // ---------------------------------------------------------------------- Affichage ----------------------------------------------------------------------

  return (
    <>
      <div className="h-screen w-9.5/10 flex flex-col self-center">

      <div className="h-1/10">
        détail de larticle
      </div>

        {/* Carousel */}
        <div className="gap-8 carousel rounded-box">
          {currentItems.map((card) => (
            <Card
              css="carousel-item w-8/10"
              key={card.id} 
              caption={card.caption}
              desComClear={card.descComClear}
              salePriceVatIncluded={card.salePriceVatIncluded}
              img="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination flex justify-center space-x-2 mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-item ${currentPage === number ? "bg-blue-500 text-white" : "bg-gray-200 text-black"} rounded-full w-10 h-10`}
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
