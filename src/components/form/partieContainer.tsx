import { useState } from "react";
import Question from "./question";
import Rating from "./rating";

const PartieContainer: React.FC = () => {
  const [rateList, setRateList] = useState<
    Array<{ id: number; value: number }>
  >([]);

  const handleRatingChange = (id: number, value: number) => {
    const index = rateList.findIndex((rate) => rate.id === id);
    if (index > -1) {
      const newRateList = [...rateList];
      newRateList[index].value = value;
      setRateList(newRateList);
    } else {
      setRateList([...rateList, { id, value }]);
    }
  };

  const averageRating =
    rateList.reduce((acc, curr) => acc + curr.value, 0) /
    (rateList.length || 1);

  const createIdGenerator = () => {
    let currentId = 1;
    return () => {
      currentId += 1;
      return currentId;
    };
  };

  // Utilisation de la fonction
  const uniqueIdQuestionGenerator = createIdGenerator();
  const uniqueIdRatingGenerator = createIdGenerator();

  return (
    <div>
      {/*--------------------------- 1ere Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 p-3 h-fit mt-4">
        <div className="bold text-blue-1 text-center">
          1ère phase: Qualification de vos besoins et proposition d'une solution
        </div>
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Compréhension de vos besoins par notre service commercial"
          partieID={1}
        />
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Seconde question du questionnaire de satisfaction ?"
          partieID={1}
        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis concernant le suivi de validation?"
          partieID={1}
          onChange={(value: number) => handleRatingChange(1, value)}

        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis sur la deuxième question?"
          partieID={1}
          onChange={(value: number) => handleRatingChange(2, value)}
        />
      </div>

      {/*--------------------------- 2eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 p-3 h-fit mt-4">
        <div className="bold text-blue-1 text-center">
          2ème phase: Informations sur le suivi de la livraison
        </div>
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Compréhension de vos besoins par notre service commercial"
          partieID={2}
        />
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Seconde question du questionnaire de satisfaction ?"
          partieID={2}
        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis concernant le suivi de validation?"
          partieID={2}
          onChange={(value: number) => handleRatingChange(3, value)}
        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis sur la deuxième question?"
          partieID={2}
          onChange={(value: number) => handleRatingChange(4, value)}
        />
      </div>

      {/*--------------------------- 3eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 p-3 h-fit mt-4">
        <div className="bold text-blue-1">
          1ère phase: Qualification de vos besoins et proposition d'une solution
        </div>
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Compréhension de vos besoins par notre service commercial"
          partieID={3}
        />
        <Question
          id={uniqueIdQuestionGenerator()}
          title="Seconde question du questionnaire de satisfaction ?"
          partieID={3}
        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis concernant le suivi de validation?"
          partieID={3}
          onChange={(value: number) => handleRatingChange(5, value)}
        />
        <Rating
          id={uniqueIdRatingGenerator()}
          title="Quel est votre avis sur la deuxième question?"
          partieID={3}
          onChange={(value: number) => handleRatingChange(6, value)}
        />
      </div>




      <p className="text-sm">
        Total Moyen des Ratings: {averageRating.toFixed(1)}
      </p>{" "}
    </div>
  );
};

export default PartieContainer;
