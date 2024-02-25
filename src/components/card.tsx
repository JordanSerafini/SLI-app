function card({title, description, img}) {
  return (
    <>
      <div className="card w-96 glass">
        <figure>
          <img
            src={img}
            alt="car!"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Détail</button>
          </div>
        </div>
      </div>
      </>
  );
}

export default card;
