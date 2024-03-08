import { useState } from "react";
import Question from "./question";
import Rating from "./rating";
import Textarea from "./textarea";

import url from "../../axios/url";
import { useNavigate } from "react-router-dom";

const PartieContainer: React.FC = () => {
  const navigate = useNavigate();
  const [rateList, setRateList] = useState<
    Array<{
      partieID: number;
      title: string;
      id: number;
      value: number;
    }>
  >([]);

  // État pour les réponses aux questions
  const [questionResponses, setQuestionResponses] = useState<{
    [key: string]: { response: string; title: string; partieID: number };
  }>({});
  // État pour les réponses aux zones de texte
  const [textareaResponses, setTextareaResponses] = useState<{
    [textareaId: number]: { text: string; partieID: number; title?: string };
  }>({});

  // Gestionnaire pour les changements de questions
  const handleQuestionChange = (
    id: number,
    title: string,
    partieID: number,
    response: string
  ) => {
    setQuestionResponses((prev) => ({
      ...prev,
      [`${id}_${partieID}`]: { response, title, partieID },
    }));
  };

  // Gestionnaire pour les changements de zones de texte
  const handleTextareaChange = (
    textareaId: number,
    partieID: number,
    text: string,
    title?: string
  ) => {
    setTextareaResponses((prev) => ({
      ...prev,
      [textareaId]: { text, partieID, title },
    }));
  };

  const handleRatingChange = (
    id: number,
    title: string,
    partieID: number,
    value: number
  ) => {
    // Trouver l'index de la note dans rateList
    const index = rateList.findIndex((rate) => rate.id === id);

    // Si la note est déjà présente, la mettre à jour
    if (index > -1) {
      const newRateList = [...rateList];
      newRateList[index] = { ...newRateList[index], value, title, partieID };
      setRateList(newRateList);
    } else {
      // Sinon, ajouter la nouvelle note à rateList
      setRateList([...rateList, { id, title, partieID, value }]);
    }
  };

  const handleSubmit = async () => {
    // Date du jour
    const dateDuJour = new Date().toISOString();

 

    const formData = {
      nom_client: "Client 1",
      date_creation: dateDuJour,
      commercial_id: 1,
      data: [
        {
          questions: Object.entries(questionResponses).map(
            ([key, { response, title }]) => ({
              id: parseInt(key.split("_")[0]),
              title,
              response: response,
            })
          ),
          textareas: Object.entries(textareaResponses).map(
            ([id, { title, text }]) => ({
              id: parseInt(id),
              title,
              response: text,
            })
          ),
          rates: rateList.map((rate) => ({
            id: rate.id,
            title: rate.title,
            note: rate.value,
          })),
        },
      ],
    };

    try {
      const response = await fetch(`${url.main}/createFormulaire`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Formulaire envoyé avec succès");
  
        await fetch(`${url.main}/invalidateToken`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Erreur lors de la création du formulaire:");

        alert("Erreur lors de la création du formulaire:");
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
      alert("Erreur lors de la requête:");
    }
  };

  const test= localStorage.getItem("token");

  console.log("Token:", test);

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
    <div className="flex flex-col items-center gap-6 pb-4 ">
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
            onQuestionChange={handleQuestionChange}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Seconde question du questionnaire de satisfaction ?"
            partieID={1}
            onQuestionChange={handleQuestionChange}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="Quel est votre avis concernant le suivi de validation?"
            partieID={1}
            onChange={handleRatingChange}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="Quel est votre avis sur la deuxième question?"
            partieID={1}
            onChange={handleRatingChange}
          />
          <Textarea
            id={uniqueIdTextAreaGenerator()}
            partieID={1}
            onTextareaChange={handleTextareaChange}
          />
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
            onQuestionChange={handleQuestionChange}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Qualité des renseignements communiqués lors de la prise de rendez-vous"
            partieID={2}
            onQuestionChange={handleQuestionChange}
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
          <Textarea
            id={uniqueIdTextAreaGenerator()}
            partieID={2}
            onTextareaChange={handleTextareaChange}
          />
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
            onQuestionChange={handleQuestionChange}
          />
          <Question
            id={uniqueIdQuestionGenerator()}
            title="Installation terminée?"
            partieID={3}
            onQuestionChange={handleQuestionChange}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="Satisfaction sur la qualité de l'installation"
            partieID={3}
            onChange={handleRatingChange}
          />
          <Textarea
            id={uniqueIdTextAreaGenerator()}
            partieID={3}
            onTextareaChange={handleTextareaChange}
          />
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
            onChange={handleRatingChange}
            partieID={4}
          />

          <Question
            id={uniqueIdQuestionGenerator()}
            title="Note finale de 'Soluton logique'"
            partieID={4}
            onQuestionChange={handleQuestionChange}
          />
          <Rating
            id={uniqueIdRatingGenerator()}
            title="D'une manière générale, solution logique a-t-elle répondu à vos attentes?"
            partieID={4}
            onChange={handleRatingChange}
          />

          <Question
            id={uniqueIdQuestionGenerator()}
            title="Recommanderiez vous solution logique à votre entourage?"
            partieID={4}
            onQuestionChange={handleQuestionChange}
          />
          <Textarea
            id={uniqueIdQuestionGenerator()}
            title="Quelles sont vos suggestions pour améliorer nos services?"
            partieID={4}
            onTextareaChange={handleTextareaChange}
          />
        </div>
      </div>
      <p className="text-sm">
        Total Moyen des Ratings: {averageRating.toFixed(1)}
      </p>{" "}
      <button
        onClick={handleSubmit}
        className="bg-blue-1 p-2 rounded-3xl px-8 text-white text-base tracking-widest"
      >
        Valider
      </button>
    </div>
  );
};

export default PartieContainer;
