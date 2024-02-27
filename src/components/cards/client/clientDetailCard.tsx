import { Client } from "../../../context/dataContext";

import telLogo from "../../../assets/telLogo.png";
import mailLogo from "../../../assets/mailLogo.png";

interface DetailClientProps {
  selectedClient: Client;
}

const clientDetailCard: React.FC<DetailClientProps> = ({ selectedClient }) => {
  console.log(selectedClient);

  //const adress = `${selectedClient.maininvoicingaddress_address1} ${selectedClient.maininvoicingaddress_address2} ${selectedClient.maininvoicingaddress_address3} ${selectedClient.maininvoicingaddress_zipCode} ${selectedClient.maininvoicingaddress_city} ${selectedClient.maininvoicingaddress_state}`;
  const Name = `${selectedClient.maininvoicingcontact_name} ${selectedClient.maininvoicingcontact_firstname}`;

  return (
    <div className="min-h-64 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col justify-evenly gap-">
      {/* ------------------------------------------------- Nom et ID ------------------------------------------------- */}
      <div className="flex flex-row gap-4 justify-between bold">
        <div>{Name}</div>
        <div className="">{selectedClient.name} </div>
      </div>

      {/* ------------------------------------------------- Tel et Mail ------------------------------------------------- */}

      <div className="flex flex-row gap-4 justify-evenly">
        <div className="flex gap-2">
          {selectedClient.maindeliverycontact_cellphone && (
            <>
              <a href={`tel:${selectedClient.maindeliverycontact_cellphone}`}>
                <img src={telLogo} alt="Téléphone" className="h-4" />
              </a>
              <a
                href={`tel:${selectedClient.maindeliverycontact_cellphone}`}
                className="no-underline text-black"
              >
                <div>{selectedClient.maindeliverycontact_cellphone}</div>
              </a>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {selectedClient.maininvoicingcontact_phone && (
            <>
              <a href={`tel:${selectedClient.maininvoicingcontact_phone}`}>
                <img src={telLogo} alt="Téléphone" className="h-4" />
              </a>
              <a
                href={`tel:${selectedClient.maininvoicingcontact_phone}`}
                className="no-underline text-black"
              >
                <div>{selectedClient.maininvoicingcontact_phone}</div>
              </a>
            </>
          )}
        </div>
        <div>
          {selectedClient.maininvoicingcontact_email && (
            <a
              href={`mailto:${selectedClient.maininvoicingcontact_email}?subject=Sujet de l'email&body=Corps de l'email`}
            >
              <img src={mailLogo} alt="Email" className="h-8" />
            </a>
          )}
        </div>
      </div>

      {/* ------------------------------------------------- Notes ------------------------------------------------- */}
      <div className="max-h-16 overflow-auto">
        Notes: {selectedClient.notesclear}
      </div>
    </div>
  );
};

export default clientDetailCard;
