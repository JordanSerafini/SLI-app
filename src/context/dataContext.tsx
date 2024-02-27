import { createContext, Dispatch, SetStateAction } from "react";

interface Article {
  id: string;
  caption: string;
  salepriceVatExcluded: number;
  salepricevatincluded: string;
  realStock: string;
  descomclear : string;
  image_url: string; 
  realstock: number;
  uniqueid: string;
  familyid: string;
  notesclear: string;
  supplierid: string;
  itemtype: string;
  itemimage: string;
  unitid: string;
  
}

interface Client {
    maininvoicingaddress_address1: string;
    maininvoicingaddress_address2: string;
    maininvoicingaddress_address3: string;
    maininvoicingaddress_zipCode: string;
    maininvoicingaddress_city: string;
    maininvoicingaddress_state: string;
    maininvoicingcontact_name: string;
    maininvoicingcontact_firstname: string;
    maininvoicingcontact_phone: string;
    maininvoicingcontact_email: string;
    notesclear: string;
}

interface Event {
  id: number;
  workingduration_editedduration: number;
  notesclear: string;
  caption: string;
  startdatetime: string;
  enddatetime: string; 
}

// Définis un type pour le contexte qui utilisera les interfaces Article et Client.
export type DataContextType = {
  itemList: Article[];
  setItemList: Dispatch<SetStateAction<Article[]>>;
  clientList: Client[];
  setClientList: Dispatch<SetStateAction<Client[]>>;
  eventList: Event[];
  setEventList: Dispatch<SetStateAction<Event[]>>;
};

// Exporte le contexte avec la valeur initiale correspondant au type ci-dessus.
const dataContext = createContext<DataContextType>({
  itemList: [],
  setItemList: () => {},
  clientList: [],
  setClientList: () => {},
  eventList: [],
  setEventList: () => {},
});

export default dataContext;
