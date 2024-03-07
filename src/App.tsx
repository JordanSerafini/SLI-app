import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { DataProvider } from "./context/dataProvider";
import { ThemeProvider } from "./context/theme/themeContext";

import ProtectedRoute from "./services/protectedRoute";
import Home from "./pages/home";
import Planing from "./pages/planing";
import ArticlesList from "./pages/articlesList";
import ClientsList from "./pages/clientsList";
import ErrorPage from "./pages/error"; 
import DevisPage from "./pages/devisPage";
import ArticleForm from "./pages/articleForm";
import Charts from "./pages/charts";
import FormPage from "./pages/formPage";
import LoginPage from "./pages/loginPage";

function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
                <Route path="form-satisfaction" element={<FormPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="planing" element={<Planing />} />
                <Route path="articles" element={<ArticlesList />} />
                <Route path="clients" element={<ClientsList />} />
                <Route path="error" element={<ErrorPage />} />
                <Route path="devis" element={<DevisPage />} />
                <Route path="addArticle" element={<ArticleForm />} />
                <Route path="charts" element={<Charts />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </DataProvider>
  );
}

export default App;
