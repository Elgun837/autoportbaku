import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Contacts from "./pages/Contacts";
import Faq from "./pages/Faq";
import About from "./pages/About";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} />} />
      <Route path="/:lang" element={<HomePage />} />
      <Route path="/:lang/about-us" element={<About />} />
      <Route path="/:lang/tours" element={<Tours />} />
      <Route path="/:lang/tours/:slug" element={<TourDetail />} />
      <Route path="/:lang/faq" element={<Faq />} />
      <Route path="/:lang/contacts" element={<Contacts />} />
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
