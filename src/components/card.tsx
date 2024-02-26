
function card({id, caption, img, css, onDetailClick }: {id: number, caption: string, img: string, css: string,onDetailClick : (id: number) => void}) {

  return (
   
      <div className={`card ${css}`}>
        <figure className="">
          <img
            src={img}
            alt="Image manquante"
            className="w-full object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body ">
          <h2 className=" card-title text-base">{caption}</h2>
          <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => onDetailClick(id)}>Détail</button>
          </div>
        </div>
      </div>
      
  );
}

export default card;
