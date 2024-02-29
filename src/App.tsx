import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./context/dataProvider";



import Home from "./pages/home";
import BottomNav from "./components/nav/bottomNav";
import Planing from "./pages/planing";
import ArticlesList from "./pages/articlesList";
import ClientsList from "./pages/clientsList";
import Error from "./pages/error";
import DevisPage from "./pages/devisPage";
import ArticleForm from "./pages/articleForm";
import Charts from "./components/charts/charts";

function App() {
  return (
    <>
      <DataProvider>
        <div className="h-screen w-screen bg-gray-1 flex flex-col regular ">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/planing" element={<Planing />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/clients" element={<ClientsList />} />
            <Route path="/error" element={<Error />} />
            <Route path="/devis" element={<DevisPage />} />
            <Route path="/addArticle" element={<ArticleForm />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
          <BottomNav />
        </Router>
        </div>
      </DataProvider>
    </>
  );
}

export default App;
