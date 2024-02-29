import { ChangeEvent, useContext, useState } from "react";
import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched";
import dataContext from "../context/dataContext";
import ClientCard from "../components/cards/client/clientCard";
import ClientDetailCard from "../components/cards/client/clientDetailCard";

import searchLogo from "../assets/searchLogo.png";

function ClientsList() {
  const isLoading = IsDataFetched();
  const [showInput, setShowInput] = useState(false);
  const { clientList } = useContext(dataContext);
  const [ClientSelected, setClientSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // ---------------------------------------------------------- fitre client ----------------------------------------------------------
  const searchTermCleaned = searchTerm.toLowerCase().trim();
  const searchWords = searchTermCleaned.split(' '); // Diviser le terme de recherche en mots individuels
  
  const filteredClients = clientList.filter(client => {
      const name = (client.maininvoicingcontact_name || "").toLowerCase();
      const firstName = (client.maininvoicingcontact_firstname || "").toLowerCase();
  
      // Vérifier si tous les mots de recherche sont présents dans le nom ou le prénom du client, dans n'importe quel ordre
      const isMatch = searchWords.every(word => {
          // Vérifier si le mot de recherche est présent dans le nom ou prénom du client
          return name.includes(word) || firstName.includes(word);
      });
  
      return isMatch;
  });
  



  // ---------------------------------------------------------- Pagination ----------------------------------------------------------
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 2 && i <= currentPage + 2)
    ) {
      pageNumbers.push(i);
    }
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // ---------------------------------------------------------- Recherche ----------------------------------------------------------
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // -------------------------------------------------- Selection détail client ----------------------------------------------------------
  const selectedClient = clientList.find(
    (client) => client.id === ClientSelected
  );

  //------------------------------------
  const isSearchVisible = () => {
    setShowInput(!showInput);
  };

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="h-10/10 w-9/10 flex flex-col item self-center ">
      {/* ---------------------------------------------------------- Detail Client ----------------------------------------------------------*/}
      <div className=" h-6/10 flex items-center justify-start flex-col">
        {/* ---------------------------------------------------------- Detail Client ----------------------------------------------------------*/}
        {selectedClient ? (
          <ClientDetailCard selectedClient={selectedClient} />
        ) : (
          <div className=" w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col gap-2 ">
            <h2>Sélectionnez un client pour voir les détails</h2>
          </div>
        )}
      </div>

      {/* ---------------------------------------------------------- Carrousel client ----------------------------------------------------------*/}
      <div className="h-4/10 flex flex-col justify-start">
        <div className="flex gap-8 overflow-x-auto pb-4 h-6/10">
          {currentItems.map((client, index) => (
            <ClientCard
              key={client.id + "-" + index}
              id={client.id}
              name={client.name}
              css="carousel-item w-7/10 md:w-4.5/10 bg-bgMain text-text shadow-effect-2 border-1 border-secondary-dark"
              maininvoicingcontact_name={client.maininvoicingcontact_name}
              maininvoicingcontact_firstname={
                client.maininvoicingcontact_firstname
              }
              maininvoicingcontact_phone={client.maininvoicingcontact_phone}
              maindeliverycontact_cellphone={
                client.maindeliverycontact_cellphone
              }
              onDetailClick={() => setClientSelected(client.id)}
            />
          ))}
        </div>

        {/*---------------------------------------------------------- Pagination ----------------------------------------------------------*/}
        {showInput ? (
          <div className="flex flex-row items-center justify-center">
            <div className="pagination flex justify-center space-x-2 ">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`page-item ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  } rounded-full w-7 h-7 border-1 border-secondary-dark text-primary`}
                >
                  {number}
                </button>
              ))}
            </div>
            <img
              src={searchLogo}
              alt="search"
              className="h-8 ml-6"
              onClick={isSearchVisible}
            />
          </div>
        ) : (
          /*---------------------------------------------------------- Recherche ----------------------------------------------------------*/
          <div className="flex flex-row items-center justify-center ">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearchChange}
              className=" p-2 rounded border-1 border-secondary-dark text-"
            />
            <img
              src={searchLogo}
              alt="search"
              className="h-8 ml-6"
              onClick={isSearchVisible}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientsList;
