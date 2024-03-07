import { useState } from "react";
import Question from "./question";
import Rating from "./rating";
import Textarea from "./textarea";

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
  const uniqueIdTextAreaGenerator = createIdGenerator();

  return (
    <div className="flex flex-col items-center gap-6">
      {/*--------------------------- 1ere Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 h-fit mt-4">
        <div className="bold text-white  text-center bg-blue-1 w-full p-4 rounded-t-lg">
          1ère phase: Qualification de vos besoins et proposition d'une solution
        </div>
        <div className="p-2 flex flex-col gap-4 text-blue-1">
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
          <Textarea id={uniqueIdTextAreaGenerator()} partieID={1} />
        </div>
      </div>
      {/*--------------------------- 2eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 h-fit">
        <div className="bold text-white  text-center bg-blue-1 w-full p-4 rounded-t-lg">
          2ème phase: Informations sur le suivi de la livraison
        </div>
        <div className="p-2 flex flex-col gap-4 text-blue-1">
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Délai du traitement de votre commande par notre service commercial"
            partieID={2}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Qualité des renseignements communiqués lors de la prise de rendez-vous"
            partieID={2}
          />
          {/*
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
        */}
          <Textarea id={uniqueIdTextAreaGenerator()} partieID={2} />
        </div>
      </div>
      {/*--------------------------- 3eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 h-fit">
        <div className="bold text-white  text-center bg-blue-1 w-full p-4 rounded-t-lg">
          3ème phase:Installation de la solution
        </div>
        <div className="p-2 flex flex-col gap-4 text-blue-1">
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Satisfaction sur le délai de livraison"
            partieID={3}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Installation terminée?"
            partieID={3}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="Satisfaction sur la qualité de l'installation"
            partieID={3}
            onChange={(value: number) => handleRatingChange(3, value)}
          />
          <Textarea id={uniqueIdTextAreaGenerator()} partieID={3} />
        </div>
      </div>
      {/*--------------------------- 4eme Partie ----------------------------------------*/}
      <div className="w-9.5/10 bg-white rounded-xl flex flex-col gap-4 h-fit">
        <div className="bold text-white  text-center bg-blue-1 w-full p-4 rounded-t-lg">
          4ème phase: Finalité du projet
        </div>
        <div className="p-2 flex flex-col gap-4 text-blue-1">
          <Rating
            id={uniqueIdQuestionGenerator()}
            title="Satisfaction sur le délai de livraison"
            onChange={(value: number) => handleRatingChange(4, value)}
            partieID={4}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Note finale de 'Soluton logique'"
            partieID={4}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="D'une manière générale, solution logique a-t-elle répondu à vos attentes?"
            partieID={4}
            onChange={(value: number) => handleRatingChange(5, value)}
          />

          <Question
            id={uniqueIdQuestionGenerator()}
            title="Recommanderiez vous solution logique à votre entourage?"
            partieID={4}
          />
          <Textarea
            id={uniqueIdQuestionGenerator()}
            title="Quelles sont vos suggestions pour améliorer nos services?"
            partieID={4}
          />
        </div>
      </div>
      <p className="text-sm">
        Total Moyen des Ratings: {averageRating.toFixed(1)}
      </p>{" "}
    </div>
  );
};

export default PartieContainer;
