import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataContext from '../context/dataContext';
import { fetchItems, fetchClients, fetchEvents } from '../function/fetchData';

export function IsDataFetched() {
  const navigate = useNavigate();
  const { itemList, clientList, eventList, setClientList, setEventList, setItemList } = useContext(DataContext);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNeededData() {
      
      setLoading(true);
      try {
        if (itemList.length === 0) await fetchItems(setItemList);
        if (clientList.length === 0) await fetchClients(setClientList);
        if (eventList.length === 0) await fetchEvents(setEventList);
      } catch (error) {
        console.error('Error loading data: ', error);
        navigate('/error');
      } finally {

        setLoading(false);
      }
    }

    loadNeededData();
  }, [navigate, setClientList, setEventList, setItemList, itemList.length, clientList.length, eventList.length]);

  return isLoading;
}
