import React, { useState } from "react";
import { Client } from "../../../context/dataContext";

import telLogo from "../../../assets/telLogo.png";
import mailLogo from "../../../assets/mailLogo.png";
import LeafletMap from "./leafletMap";
import mapLogo from "../../../assets/mapLogo.png";

interface DetailClientProps {
  selectedClient: Client;
}

const ClientDetailCard: React.FC<DetailClientProps> = ({ selectedClient }) => {
  const [showMap, setShowMap] = useState(false);

  const handleMapClick = () => {
    setShowMap(!showMap);
  };

  

  const buildAddress = () => {
    const parts = [
      selectedClient.maininvoicingaddress_address1,
      selectedClient.maininvoicingaddress_address2,
      selectedClient.maininvoicingaddress_address3,
      selectedClient.maininvoicingaddress_zipCode,
      selectedClient.maininvoicingaddress_city,
      selectedClient.maininvoicingaddress_state,
    ];
    return parts.filter(part => part).join(' ');
  };

  const address = buildAddress();
  const name = `${selectedClient.maininvoicingcontact_name} ${selectedClient.maininvoicingcontact_firstname}`;

  return (
    <div className="w-full h-9/10 bg-white self-center mt-4 mb-6 rounded-2xl flex flex-col justify-evenly items-center">
      {!showMap ? (
        <>
          {/* Détails du client */}
          <div className="flex flex-row gap-4 justify-between font-bold">
            <div>{name}</div>
            <div>{selectedClient.name}</div>
          </div>

          {/* Téléphone et Email */}
          <div className="flex flex-row gap-4 justify-evenly">
            {/* Téléphone */}
            <div className="flex gap-2">
              {/* Conditionnellement rendu si le numéro est disponible */}
              {selectedClient.maindeliverycontact_cellphone && (
                <>
                  <a href={`tel:${selectedClient.maindeliverycontact_cellphone}`}>
                    <img src={telLogo} alt="Téléphone" className="h-4" />
                  </a>
                  <a href={`tel:${selectedClient.maindeliverycontact_cellphone}`} className="no-underline text-black">
                    {selectedClient.maindeliverycontact_cellphone}
                  </a>
                </>
              )}
            </div>

            {/* Email */}
            <div>
              {selectedClient.maininvoicingcontact_email && (
                <a href={`mailto:${selectedClient.maininvoicingcontact_email}`}>
                  <img src={mailLogo} alt="Email" className="h-8" />
                </a>
              )}
            </div>
          </div>

          {/* Notes */}
          {selectedClient.notesclear && (
          <div className="overflow-auto p-2 text-sm h-4/10">
            Notes: {selectedClient.notesclear}
          </div>
          )}
          {/* Adresse et Bouton pour afficher la carte */}
          {address && (
          <div className="flex flex-row text-xs items-center justify- gap-8 mx-4">
            <p>{address}</p>
          <img src={mapLogo} alt="Montrer la carte" onClick={handleMapClick} className="h-8 w-8 cursor-pointer ml-auto" />
          </div>
          )}
        </>
      ) : (
        <div className="w-10/10 h-10/10 flex flex-col gap-2">
          {/* Carte */}
          <LeafletMap address={address} />
          <img src={mapLogo} alt="Retour aux détails" onClick={handleMapClick} className="self-end z-50 h-8 w-8 cursor-pointer" />

        </div>
      )}
    </div>
  );
};

export default ClientDetailCard;
