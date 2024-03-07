function textarea({ id, partieID }) {
  return (
    <div className="flex flex-col gap-2">
        <h3 className="text-center">Remarques supplémentaires:</h3>
      <textarea className="border-1 border-blue-1 focus:border-blue-500 p-2 rounded-xl w-10/10 h-20"></textarea>
    </div>
  );
}

export default textarea;
