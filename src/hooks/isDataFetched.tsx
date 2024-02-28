import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';
import fetchData from '../function/fetchData';



export function IsDataFetched() {
  const navigate = useNavigate();
  const { itemList, clientList, eventList, setClientList, setEventList, setItemList } = useContext(DataContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // Cette fonction vérifie si les données ont déjà été chargées
    const dataIsLoaded = itemList.length > 0 && clientList.length > 0 && eventList.length > 0;

    // Si les données sont déjà chargées, nous n'avons pas besoin de les recharger
    if (dataIsLoaded) {
      setLoading(false);
      return;
    }

 

    async function loadInitialData() {
      try {
        await fetchData({ setClientList, setEventList, setItemList });
      } catch (error) {
        console.error('Error fetching data: ', error);
        navigate('/error');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, [navigate, setClientList, setEventList, setItemList]); 

  return isLoading;
}
