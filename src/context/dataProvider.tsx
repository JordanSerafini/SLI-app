import { useState, ReactNode } from "react";
import dataContext, { DataContextType, Devis } from "./dataContext"; 

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [itemList, setItemList] = useState<DataContextType['itemList']>([]);
  const [clientList, setClientList] = useState<DataContextType['clientList']>([]);
  const [eventList, setEventList] = useState<DataContextType['eventList']>([]);
  const [devis, setDevis] = useState<Devis>({ id: '', name: '', articles: [] });
  const [devisList, setDevisList] = useState<DataContextType['devisList']>([]);


  const contextValue = {
    itemList,
    setItemList,
    clientList,
    setClientList,
    eventList,
    setEventList,
    devis,
    setDevis,
    devisList,
    setDevisList,
  };

  return (
    <dataContext.Provider value={contextValue}>
      {children}
    </dataContext.Provider>
  );
};
