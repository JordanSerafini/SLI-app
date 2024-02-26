import { useContext, useEffect, useCallback } from "react"
import dataContext from "../context/dataContext"
import axios from "axios"

import url from "../axios/url"

function Home() {

  const { setItemList } = useContext(dataContext)  

  const fetchData = useCallback(async () => {
    try {
      const itemResponse = await axios.get(`${url.heroku}/articlePG`);
      setItemList(itemResponse.data.rows);
    }
    catch (error) {
      console.error(error)
    }
  }, [setItemList]) 

  useEffect(() => {
    fetchData()
  }, [setItemList, fetchData])


  return (
    <div>Home</div>
  )
}

export default Home