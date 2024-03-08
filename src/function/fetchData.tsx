import axios from "axios";
import url from "../axios/url";
import { Dispatch, SetStateAction } from "react";
import { Article, Client, appEvent } from '../context/dataContext';

export type FetchDataContextParams = {
  setItemList?: Dispatch<SetStateAction<Article[]>>;
  setClientList?: Dispatch<SetStateAction<Client[]>>;
  setEventList?: Dispatch<SetStateAction<appEvent[]>>;
};

export async function fetchItems(setItemList: Dispatch<SetStateAction<Article[]>>) {
  try {
    const response = await axios.get(`${url.main}/articlePG`);
    setItemList(response.data.rows);
  } catch (error) {
    console.error('Error fetching items: ', error);
  }
}

export async function fetchClients(setClientList: Dispatch<SetStateAction<Client[]>>) {
  try {
    const response = await fetch(`${url.main}/customerPG`);
    const data = await response.json();
    setClientList(data.rows);

  } catch (error) {
    console.error('Error fetching clients: ', error);
  }
}

export async function fetchEvents(setEventList: Dispatch<SetStateAction<appEvent[]>>) {
  try {
    const response = await fetch(`${url.main}/event`);
    const data = await response.json();
    setEventList(data.rows);

  } catch (error) {
    console.error('Error fetching events: ', error);
  }
}
