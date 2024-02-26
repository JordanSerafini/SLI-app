import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched"; 
import EventOfTheDay from "../services/EventOfTheDay";

function planing() {
  const isLoading = IsDataFetched();
  
  if (isLoading) {
    return <CircleLoader />; 
  }
  return (
    <div>planing
      <EventOfTheDay />
    </div>
  )
}

export default planing