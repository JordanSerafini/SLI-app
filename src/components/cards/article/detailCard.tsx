import descriptionLogo from "../../../assets/descriptionLogo.png";
import warningBlueLogo from "../../../assets/warningBlueLogo.png";
import euroLogo from "../../../assets/euroLogo.png";
import warningLogo from "../../../assets/warningLogo.png";

import {Article} from "../../../context/dataContext";

interface DetailCardProps {
    selectedCard: Article; 
  }


const DetailCard: React.FC<DetailCardProps> = ({ selectedCard }) => {

 
  

    return (
    <>
          <div className="h-5/10 w-10/10 bg-white self-center m-4 mb-6 rounded-2xl p-2 flex flex-col justify-evenly gap-">
            {/* Affiche les détails de la carte ici */}
            {selectedCard.caption && (
              <h2 className="text-center bold border-b-1 border-secondary h-3/10 libre-baskerville-italic tracking-wider">
                {selectedCard.caption} 
              </h2>
            )}

            {/* ---------------------------------- Description et note ------------------------------------------ */}
            <div className="flex flex-col gap-2 pt-2">
              {selectedCard.descomclear && (
                <div className="flex flex-row gap-4 items-center border-b-1 border-secondary pb-4">
                  <img
                    src={descriptionLogo}
                    alt="description"
                    className="h-7"
                  />
                  <p className="max-h-16 overflow-auto text-sm">
                    {selectedCard.descomclear}
                  </p>
                </div>
              )}
              {selectedCard.notesclear !== null && (
                <div className="flex flex-row gap-4 items-center text-sm">
                  <img src={warningBlueLogo} alt="!" className="h-7" />
                  <div className="max-h-16 overflow-auto">
                    {selectedCard.notesclear}
                  </div>
                </div>
              )}
            </div>

            {/* ---------------------------------- Prix et stock ------------------------------------------ */}

            <div className="flex flex-row justify-between items-center p-2 mt-8">
              {selectedCard.salepricevatincluded && (
                <div className="flex flex-row items-center gap-2">
                  <img src={euroLogo} alt="Prix" className="h-4" />
                  <span className="bold text-secondary-dark">
                    {selectedCard.salepricevatincluded}
                  </span>
                </div>
              )}
              {selectedCard.realstock &&
                String(selectedCard.realstock) !== "0" && (
                  <div
                    className={`badge badge-neutral badge-outline flex flex-row gap-2 items-center ${
                      Number(selectedCard.realstock) >= 1 &&
                      Number(selectedCard.realstock) <= 4
                        ? "badge-info"
                        : "badge-orange-500"
                    }`}
                  >
                    En stock :{" "}
                    <span className="bold">{selectedCard.realstock}</span>
                  </div>
                )}
              {selectedCard.realstock &&
                Number(selectedCard.realstock) === 0 && (
                  <div className="badge badge-warning badge-outline flex flex-row gap-2 items-center">
                    <img src={warningLogo} alt="!" className="h-4" />
                    <p>Pas de stock</p>
                  </div>
                )}
            </div>

            {/* ----------------------------------  ------------------------------------------ */}
          </div>
    </>
  )
}

export default DetailCard