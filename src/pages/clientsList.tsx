import { ChangeEvent, useContext, useState } from "react";
import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched";
import dataContext from "../context/dataContext";
import ClientCard from "../components/cards/client/clientCard";
import ClientDetailCard from "../components/cards/client/clientDetailCard";

function ClientsList() {
  const isLoading = IsDataFetched();
  const { clientList } = useContext(dataContext);
  const [ClientSelected, setClientSelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  const filteredClients = clientList.filter(client =>
    (client.maininvoicingcontact_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.maininvoicingcontact_firstname || "").toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
      pageNumbers.push(i);
    }
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const selectedClient = clientList.find(client => client.id === ClientSelected);

  if (isLoading) {
    return <CircleLoader />;
  }

  return (
    <div className="h-9/10 w-9/10 flex flex-col self-center ">
      {/* ---------------------------------------------------------- Detail Client ----------------------------------------------------------*/}
      {selectedClient ? (
        <ClientDetailCard  selectedClient={selectedClient} />
      ) : (
        <div className="h-5/10 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col gap-2">
          <h2>Sélectionnez un client pour voir les détails</h2>
        </div>
      )}

      {/* ---------------------------------------------------------- Carrousel client ----------------------------------------------------------*/}
      <div className="flex gap-8 overflow-x-auto pb-4">
        {currentItems.map((client) => (
          <ClientCard
            key={client.id}
            id={client.id}
            name={client.name}
            css="carousel-item w-8/10 md:w-4.5/10 bg-bgMain text-text shadow-effect"
            maininvoicingcontact_name={client.maininvoicingcontact_name}
            maininvoicingcontact_firstname={client.maininvoicingcontact_firstname}
            maininvoicingcontact_phone={client.maininvoicingcontact_phone}
            maindeliverycontact_cellphone={client.maindeliverycontact_cellphone}
            onDetailClick={() => setClientSelected(client.id)} 
             />
        ))}
      </div>

      {/*---------------------------------------------------------- Pagination ----------------------------------------------------------*/}
      <div className="pagination flex justify-center space-x-2 mt-4">
        {pageNumbers.map(number => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`page-item ${currentPage === number ? "bg-blue-500 text-white" : "bg-white text-black"} rounded-full w-10 h-10`}
          >
            {number}
          </button>
        ))}
      </div>

      {/*---------------------------------------------------------- Recherche ----------------------------------------------------------*/}
      <input
        type="text"
        placeholder="Rechercher..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mt-4 p-2 border rounded"
      />
    </div>
  );
}

export default ClientsList;
