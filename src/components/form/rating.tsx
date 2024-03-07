function Rating({ id, title, onChange, partieID }: { id: number, title: string, partieID:number, onChange: (value: number) => void }) {

  const handleRatingChange = (value: number) => {
    onChange(value); 
  };

  return (
    <div className='w-10/10 flex flex-col items-center text-xs'>
        <h3>{title}</h3>
    <div className="rating rating-md">
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
