import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


function BottomNav() {

  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  // Mettre à jour le chemin actif lorsque l'emplacement change
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleNavigation = (path: string) => {
    navigate(path);
    setActivePath(path); 
  };

  return (
    <>
      <div className="btm-nav">


        <button className={`border-r-1 bg-primary-new text-black ${activePath === "/" ? "active bg-accent text-white border-t-2 border-gray-1" : ""}`} onClick={() => handleNavigation("/")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#0f056b"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span className="btm-nav-label">Home</span>
        </button>


        <button className={`border-r-1 bg-primary-new text-black ${activePath === "/planing" ? "active bg-accent text-white border-t-2 border-gray-1" : ""}`}  onClick={() => handleNavigation("/planing")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#DD3C1B"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="btm-nav-label">Planing</span>
        </button>


        <button className={`border-r-1 bg-primary-new text-black  ${activePath === "/clients" ? "active bg-accent text-white border-t-2 border-gray-1" : ""}`}  onClick={() => handleNavigation("/clients")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#875809"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">Clients</span>
        </button>
        
        <button className={`border-r-1 bg-primary-new text-black ${activePath === "/articles" ? "active bg-accent text-white border-t-2 border-gray-1" : ""}`}  onClick={() => handleNavigation("/articles")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#002c1b"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <span className="btm-nav-label">Articles</span>
        </button>
      </div>
    </>
  );
}

export default BottomNav;
