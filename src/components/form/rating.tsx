import { useState } from "react";

interface RatingProps {
  id: number;
  title: string;
  partieID: number;
  onChange: (id: number, title: string, partieID: number, value: number) => void;
}

function Rating({ id, title, onChange, partieID }: RatingProps) {
  const [starColor, setStarColor] = useState('bg-orange-400'); // Couleur par défaut (orange)


  const handleRatingChange = (value: number) => {
    let color = '';

    switch (value) {
      case 1:
        color = 'bg-red-800';
        break;
      case 2:
        color = 'bg-red-400'; 
        break;
      case 3:
        color = 'bg-orange-400'; 
        break;
      case 4:
        color = 'bg-green-4'; 
        break;
      case 5:
        color = 'bg-green-5'; 
        break;
      default:
        color = 'bg-orange-400';
    }

    setStarColor(color);
    onChange(id, title, partieID, value);
  };
  

  return (
    <div className='w-10/10 flex flex-col gap-4 items-center text-xs sm:text-base text-center'>
        <h3>{title}</h3>
    <div className="rating rating-md sm:rating-lg w-7/10 justify-evenly">
      <input type="radio" name={`rating-${id}`} className={`mask mask-star-2 ${starColor}`} onClick={() => handleRatingChange(1)} />
      <input type="radio" name={`rating-${id}`} className={`mask mask-star-2 ${starColor}`} onClick={() => handleRatingChange(2)} />
      <input type="radio" name={`rating-${id}`} className={`mask mask-star-2 ${starColor}`} onClick={() => handleRatingChange(3)} />
      <input type="radio" name={`rating-${id}`} className={`mask mask-star-2 ${starColor}`} onClick={() => handleRatingChange(4)} />
      <input type="radio" name={`rating-${id}`} className={`mask mask-star-2 ${starColor}`} onClick={() => handleRatingChange(5)} />
    </div>
    </div>
  );
}

export default Rating;
