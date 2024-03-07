interface RatingProps {
  id: number;
  title: string;
  partieID: number;
  onChange: (id: number, title: string, partieID: number, value: number) => void;
}

function Rating({ id, title, onChange, partieID }: RatingProps) {

  const handleRatingChange = (value: number) => {
    // Passez maintenant tous les paramètres nécessaires
    onChange(id, title, partieID, value);
  };
  

  return (
    <div className='w-10/10 flex flex-col gap-4 items-center text-xs text-center'>
        <h3>{title}</h3>
    <div className="rating rating-lg w-7/10 justify-evenly">
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(1)} />
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(2)} />
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(3)} />
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(4)} />
      <input type="radio" name={`rating-${id}`} className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(5)} />
    </div>
    </div>
  );
}

export default Rating;
