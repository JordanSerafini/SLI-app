
function card({id, caption, img, css, onDetailClick }: {id: string, caption: string, img: string, css: string,onDetailClick : (id: string) => void}) {

  return (
   
      <div className={`card ${css} `}  onClick={() => onDetailClick(id)}>
        { img &&
        <figure className="h-4/10">
          <img
            src={img}
            alt="Image manquante"
            className="w-full object-cover rounded-t-lg"
          />
        </figure>
        }
        <div className="card-body overflow-auto">
          <h2 className=" card-title text-sm">{caption}</h2>
          <div className="card-actions justify-end">
          </div>
        </div>
      </div>
      
  );
}

export default card;
