
import CircleLoader from "../components/loader/circleLoader";
import { IsDataFetched } from "../hooks/isDataFetched"; 


function clientsList() {
  const isLoading = IsDataFetched();


  if (isLoading) {
    return <CircleLoader />; 
  }
  return (
    <div>clientsList</div>
  )
}

export default clientsList