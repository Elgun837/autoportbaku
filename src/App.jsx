import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Contacts from "./pages/Contacts";
import Faq from "./pages/faq";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} />} />
      <Route path="/:lang" element={<HomePage />} />
      <Route path="*" element={<p>404 Not Found</p>} />
      <Route path="/:lang/faq" element={<Faq />} />
      <Route path="/:lang/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <Router>
          <Header />
          <AppRoutes />
        </Router>
      </LanguageProvider>
    </QueryClientProvider>
  );
}
