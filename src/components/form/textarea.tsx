import { useState } from "react";

interface TextareaProps {
  id: number;
  title?: string; 
  partieID: number;
  onTextareaChange: (id: number, partieID: number, text: string) => void;
}

function Textarea({ id, title, partieID, onTextareaChange }: TextareaProps) {
  const [text, setText] = useState('');

// Dans le composant Textarea
const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  setText(event.target.value);
  onTextareaChange(id, partieID, event.target.value); 
  
};


  return (
    <div className="flex flex-col gap-2 text-xs text-center">
      {title?  <h3>{title}</h3>
    : <p>Remarques supplémentaires</p>  
    } 
      <textarea
        value={text}
        onChange={handleTextChange}
        className="border-1 border-blue-1 focus:border-blue-500 p-2 rounded-xl w-10/10 h-20"
      ></textarea>
    </div>
  );
}

export default Textarea;
