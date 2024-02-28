import axios from "axios";
import url from "../axios/url";
import { Article, Client, appEvent } from '../context/dataContext';
import { Dispatch, SetStateAction } from "react";

export type FetchDataContextParams = {
  setItemList: Dispatch<SetStateAction<Article[]>>;
  setClientList: Dispatch<SetStateAction<Client[]>>;
  setEventList: Dispatch<SetStateAction<appEvent[]>>;
};

async function fetchData({ setItemList, setClientList, setEventList }: FetchDataContextParams) {
  try {
    const itemResponse = await axios.get(`${url.heroku}/articlePG`);
    setItemList(itemResponse.data.rows);
  } catch (error) {
    console.error(error);
  }

  try {
    const clientResponse = await fetch(`${url.heroku}/customerPG`);
    const data = await clientResponse.json();
    setClientList(data.rows);
  } catch (error) {
    console.error(error);
  }

  try {
    const eventResponse = await fetch(`${url.heroku}/event`);
    const data = await eventResponse.json();
    setEventList(data.rows);
  } catch (error) {
    console.error(error);
  }
}

export default fetchData;
