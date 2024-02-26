
function card({caption, desComClear, img, css, salepricevatincluded}: {caption: string, desComClear: string, img: string, css: string, salepricevatincluded: string}) {

  return (
    <>
      <div className={`card glass ${css}`}>
        <figure>
          <img
            src={img}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{caption}</h2>
          <p>{desComClear}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-base-100 ">Prix: {salepricevatincluded}</button>
          </div>
        </div>
      </div>
      </>
  );
}

export default card;
