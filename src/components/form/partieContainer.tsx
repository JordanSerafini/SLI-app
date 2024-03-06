import { useState } from "react";
import Question from "./question";
import Rating from "./rating";

const PartieContainer: React.FC = () => {
  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (value: number) => {
    setRatingValue(value); // Mettre à jour la valeur d'évaluation dans l'état
    // Vous pouvez également effectuer d'autres actions ici, comme envoyer la valeur à un serveur
  };

  return (
    <div>
      {/*--------------------------- 1ere Partie --- nom - numero - date  ------------------------*/}
      {/*--------------------------- 2eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-6 p-2 h-fit">
        <Question
          title="Quel est votre avis concernatn le suivi de validation?"
          numero="1"
          partieID={1}
        />
        <Question
          title="Seconde question du questionnaire de satifsaction ?"
          numero="1"
          partieID={1}
        />
        <Rating
          title="Quel est votre avis concernatn le suivi de validation?"
          onChange={handleRatingChange}
        />
        <p>valeur: {ratingValue}</p>
      </div>
    </div>
  );
};

export default PartieContainer;
