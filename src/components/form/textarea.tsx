interface TextareaProps {
  title?: string;
  id: number;
  partieID: number;
}

function textarea({ title, id, partieID }: TextareaProps) {
  return (
    <div className="flex flex-col gap-2 text-xs text-center">
      {title ? <h3>{title}</h3> : <h3 className="text-center">Remarques supplémentaires:</h3>}
      <textarea className="border-1 border-blue-1 focus:border-blue-500 p-2 rounded-xl w-10/10 h-20"></textarea>
    </div>
  );
}

export default textarea;
