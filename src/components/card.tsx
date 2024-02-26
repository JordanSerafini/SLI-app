
function card({id, caption, img, css, onDetailClick }: {id: number, caption: string, img: string, css: string,onDetailClick : (id: number) => void}) {

  return (
   
      <div className={`card glass ${css}  h-10/10`}>
        <figure className="h-4/10">
          <img
            src={img}
            alt="car!"
            className="w-full object-cover rounded-t-lg"
          />
        </figure>
        <div className="card-body h-4.5/10">
          <h2 className=" card-title text-base">{caption}</h2>
          <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => onDetailClick(id)}>Détail</button>
          </div>
        </div>
      </div>
      
  );
}

export default card;
