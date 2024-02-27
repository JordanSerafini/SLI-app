import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataProvider";



import Home from "./pages/home";
import BottomNav from "./components/nav/bottomNav";
import Planing from "./pages/planing";
import ArticlesList from "./pages/articlesList";
import ClientsList from "./pages/clientsList";
import Error from "./pages/error";

function App() {
  return (
    <>
      <DataProvider>
        <div className="h-screen w-screen bg-bg-3 flex flex-col regular">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/planing" element={<Planing />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/error" element={<Error />} />
          </Routes>
          <BottomNav />
        </Router>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
