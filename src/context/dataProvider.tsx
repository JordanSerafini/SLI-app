import { useState, ReactNode } from "react";
import dataContext, { DataContextType } from "./dataContext"; 

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [itemList, setItemList] = useState<DataContextType['itemList']>([]);
  const [clientList, setClientList] = useState<DataContextType['clientList']>([]);

  const contextValue = {
    itemList,
    setItemList,
    clientList,
    setClientList,
  };

  return (
    <dataContext.Provider value={contextValue}>
      {children}
    </dataContext.Provider>
  );
};
