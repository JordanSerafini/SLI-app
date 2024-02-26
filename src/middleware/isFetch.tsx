import React from "react";
import { Route } from "react-router-dom";
import dataContext from "../context/dataContext";

interface IsDataProps {
  element: React.ReactElement;
}

const IsData: React.FC<IsDataProps> = ({ element, ...rest }) => {
  const { itemList, clientList } = React.useContext(dataContext);

  if (itemList.length === 0 || clientList.length === 0) {
    return (
      <div className="flex flex-row h-screen items-center justify-center gap-4">
        <div>Chargement</div>
        <span className="loading loading-spinner loading-md"></span>
        
      </div>
    );
  }



  return <Route {...rest} element={element} />;
};

export default IsData;
