import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { getAllLocalizedRoutes } from "./utils/routes";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
// import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contacts from "./pages/Contacts";
import Faq from "./pages/Faq";
import About from "./pages/About";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();
  const allRoutes = getAllLocalizedRoutes();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} />} />
      
      {/* Генерируем маршруты для всех языков */}
      {Object.keys(allRoutes).map((language) => (
        <Route key={language}>
          <Route path={allRoutes[language].home} element={<HomePage />} />
          <Route path={allRoutes[language].about} element={<About />} />
          <Route path={allRoutes[language].serviceDetail} element={<ServiceDetail />} />
          <Route path={allRoutes[language].tours} element={<Tours />} />
          <Route path={allRoutes[language].tourDetail} element={<TourDetail />} />
          <Route path={allRoutes[language].faq} element={<Faq />} />
          <Route path={allRoutes[language].contacts} element={<Contacts />} />
        </Route>
      ))}
      
      <Route path="*" element={<p>404 Not Found</p>} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <LanguageProvider>
          <Header />
          <AppRoutes />
          <Footer />
        </LanguageProvider>
      </Router>
    </QueryClientProvider>
  );
}
