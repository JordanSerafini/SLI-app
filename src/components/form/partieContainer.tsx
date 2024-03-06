import Question from "./question";
import Rating from "./rating";


const PartieContainer: React.FC = () => {
  

  return (
    // 1ere Partie --- nom - numero - date
    // 2eme Partie 
    <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-6">
      < Question title="Quel est votre avis concernatn le suivi de validation?" numero="1" partieID={1} />
      < Question title="Seconde question du questionnaire de satifsaction ?" numero="1" partieID={1} />
      < Rating />
    </div>
    
  );
}

export default PartieContainer;
