interface QuestionProps {
  title: string;
  numero: string;
  response?: string;
  partieID: number;
}

function Question({ title }: QuestionProps) {
  return (
    <div>
      <div className="text-xs sm:text-base flex flex-col gap-2 justify-center items-center w-10/10">
        <div className="flex flex-row gap-2">
          <h3>{title}</h3>
        </div>
        <input type="text" placeholder="Répondre ici ..." className="border-1 border-black p-2 rounded-3xl w-9/10" />
      </div>
    </div>
  );
}

export default Question;
