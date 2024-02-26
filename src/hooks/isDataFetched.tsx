import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';
import fetchData from '../function/fetchData';

export function IsDataFetched() {
  const navigate = useNavigate();
  const { itemList, clientList, eventList, setClientList, setEventList, setItemList } = useContext(DataContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function checkDataAndFetch() {
      if (itemList.length > 0 && clientList.length > 0 && eventList.length > 0) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        await fetchData(setClientList, setEventList, setItemList);
      } catch (error) {
        console.error('Error fetching data: ', error);
        navigate('/error');
      }
      setLoading(false);
    }

    checkDataAndFetch();
  }, [itemList, clientList, eventList, navigate, setClientList, setEventList, setItemList]);

  return isLoading;
}
