import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched"; 

function planing() {
  const isLoading = IsDataFetched();
  
  if (isLoading) {
    return <CircleLoader />; 
  }
  return (
    <div>planing</div>
  )
}

export default planing