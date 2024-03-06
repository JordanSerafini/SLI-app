import {  useState } from 'react';

function Rating({ title, onChange }) {

  const handleRatingChange = (value:number) => {
    setSelectedRating(value);
  };




  return (
    <div>
        <h3>{title}</h3>
    <div className="rating rating-lg">
      <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(1)} />
      <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(2)} />
      <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(3)} />
      <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(4)} />
      <input type="radio" name="rating-8" className="mask mask-star-2 bg-orange-400" onClick={() => handleRatingChange(5)} />
    </div>
    </div>
  );
}

export default Rating;
