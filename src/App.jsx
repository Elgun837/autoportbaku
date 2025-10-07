import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";

import Header from "./components/Header";
import HomePage from "./pages/Homepage";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${lang}`} />} />
      <Route path="/:lang" element={<HomePage />} />
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
