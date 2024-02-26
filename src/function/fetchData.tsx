// hooks/useFetchData.js

import axios from "axios";
import url from "../axios/url";

const fetchData = async (setItemList, setClientList, setEventList) => {

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

};

export default fetchData;
