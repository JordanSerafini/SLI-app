import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched"; 
import EventOfTheDay from "../services/EventOfTheDay";
import BottomNav from "../components/nav/bottomNav";

function planing() {
  const isLoading = IsDataFetched();
  
  if (isLoading) {
    return <CircleLoader />; 
  }
  return (
    <div className="">
      <EventOfTheDay />
      <BottomNav />
    </div>
  )
}

export default planing