function card({ id, caption, img, css, familyid, onDetailClick }: { id: string, caption: string, img: string, familyid: string, css: string, onDetailClick: (id: string) => void }) {
  let familyBadge;

  switch (familyid) {
    case "MAT":
      familyBadge = <div className="badge badge-primary text-bgMain text-xs p-3">Matériel</div>;
      break;
    case "PREST":
      familyBadge = <div className="badge badge-primary text-xs p-3">Prestation</div>;
      break;
    case "ADMIN":
      familyBadge = <div className="badge badge-secondary text-xs p-3">ADMIN</div>;
      break;
    default:
      familyBadge = <div className=""></div>;
      break;
  }

  return (
    <div className={`card ${css}`} onClick={() => onDetailClick(id)}>
      {img && (
        <figure className="h-4/10">
          <img
            src={img}
            alt="Image manquante"
            className="w-full object-cover rounded-t-lg"
          />
        </figure>
      )}
      <div className="card-body overflow-auto">
        <h2 className="card-title text-sm">{caption}</h2>
        <div className="card-actions justify-end"></div>
        <div className="flex justify-end">{familyBadge}</div>
      </div>
    </div>
  );
}

export default card;
