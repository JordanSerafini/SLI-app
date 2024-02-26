import { useState, ReactNode } from "react";
import dataContext, { DataContextType } from "./dataContext"; 

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [itemList, setItemList] = useState<DataContextType['itemList']>([]);
  const [clientList, setClientList] = useState<DataContextType['clientList']>([]);
  const [eventList, setEventList] = useState<DataContextType['eventList']>([]);

  const contextValue = {
    itemList,
    setItemList,
    clientList,
    setClientList,
    eventList,
    setEventList,
  };
  

  return (
    <dataContext.Provider value={contextValue}>
      {children}
    </dataContext.Provider>
  );
};
