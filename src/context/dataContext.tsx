import { createContext, Dispatch, SetStateAction } from "react";

interface Article {
  id: number;
  caption: string;
  salepriceVatExcluded: number;
  salepricevatincluded: string;
  realStock: number;
  descComClear: string;
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

// Définis un type pour le contexte qui utilisera les interfaces Article et Client.
export type DataContextType = {
  itemList: Article[];
  setItemList: Dispatch<SetStateAction<Article[]>>;
  clientList: Client[];
  setClientList: Dispatch<SetStateAction<Client[]>>;
};

// Exporte le contexte avec la valeur initiale correspondant au type ci-dessus.
const dataContext = createContext<DataContextType>({
  itemList: [],
  setItemList: () => {},
  clientList: [],
  setClientList: () => {},
});

export default dataContext;
