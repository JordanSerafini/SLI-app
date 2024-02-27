import {Client} from "../../../context/dataContext"

interface DetailClientProps {
  selectedClient: Client; 
  }

const clientDetailCard: React.FC<DetailClientProps> = ({ selectedClient }) => {

  console.log(selectedClient)

  return (
    <div className="min-h-64 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col justify-evenly gap-">
      
    </div>
  )
}

export default clientDetailCard