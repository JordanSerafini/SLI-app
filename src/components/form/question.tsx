import { useState } from "react";
interface QuestionProps {
  id: number;
  title: string;
  partieID: number;
  onQuestionChange: (id: number, title: string, partieID: number, response: string) => void;
}


function Question({
  id,
  title,
  partieID,
  onQuestionChange,
}: QuestionProps & {
  onQuestionChange: (id: number,title:string, partieID: number, response: string) => void;
}) {
  const [response, setResponse] = useState("");

  const handleResponseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResponse(event.target.value);
    onQuestionChange(id, title, partieID, event.target.value); 
  };

  return (
    <div>
      <div className="text-xs sm:text-base flex flex-col gap-2 justify-center items-center w-10/10 text-center">
        <div className="flex flex-row gap-2">
          <h3>{title}</h3>
        </div>
        <input
          type="text"
          placeholder="Répondre ici ..."
          value={response}
          onChange={handleResponseChange}
          className="border-1 border-blue-2 p-2 rounded-3xl w-9/10"
        />
      </div>
    </div>
  );
}

export default Question;
