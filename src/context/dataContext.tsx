import { createContext, Dispatch, SetStateAction } from "react";

export interface Article {
  id: string;
  caption: string;
  salepriceVatExcluded: number;
  salepricevatincluded: string;
  realStock: string;
  descomclear: string;
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

export interface Client {
  id: string;
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
  accounts_account: string;
  name: string;
  maindeliverycontact_cellphone: string;
  longitude: string;
  latitude: string;
}

export interface Event {
  id: number;
  workingduration_editedduration: number;
  notesclear: string;
  caption: string;
  startdatetime: string;
  enddatetime: string;
}

export interface Devis {
  id: string;
  name: string;
  articles: Article[];
}



// Définis un type pour le contexte qui utilisera les interfaces Article et Client.
export type DataContextType = {
  itemList: Article[];
  setItemList: Dispatch<SetStateAction<Article[]>>;
  clientList: Client[];
  setClientList: Dispatch<SetStateAction<Client[]>>;
  eventList: Event[];
  setEventList: Dispatch<SetStateAction<Event[]>>;
  devis: Devis; // Déjà correct
  setDevis: Dispatch<SetStateAction<Devis>>; 
  devisList: Devis[];
  setDevisList: Dispatch<SetStateAction<Devis[]>>;
};




// Exporte le contexte avec la valeur initiale correspondant au type ci-dessus.
const dataContext = createContext<DataContextType>({
  itemList: [],
  setItemList: () => {},
  clientList: [],
  setClientList: () => {},
  eventList: [],
  setEventList: () => {},
  devis: { id: '', name: '', articles: [] },
  setDevis: () => {},
  devisList: [],
  setDevisList: () => {},
});

export default dataContext;
