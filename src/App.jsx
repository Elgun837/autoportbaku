import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { useEffect, Suspense, lazy } from "react";
import 'animate.css';
import { AnalyticsProvider } from "./components/Analytics";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LazyAOS from "./components/LazyAOS";

// Core Web Vitals оптимизация
import WebVitalsMonitor from "./components/WebVitalsMonitor";
import LCPOptimizer from "./components/LCPOptimizer";
import CLSOptimizer from "./components/CLSOptimizer";
import FIDOptimizer from "./components/FIDOptimizer";

// Основная страница загружается сразу (критический путь)
import HomePage from "./pages/HomePage";

// Остальные страницы загружаются по требованию (lazy loading)
const Tours = lazy(() => import("./pages/Tours"));
const TourDetail = lazy(() => import("./pages/TourDetail"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Contacts = lazy(() => import("./pages/Contacts"));
const Faq = lazy(() => import("./pages/Faq"));
const About = lazy(() => import("./pages/About"));

import { translations } from "./translations";
import { TourProvider } from "./context/TourContext";
import { ServiceProvider } from "./context/ServiceContext";
import { SettingsProvider } from "./context/SettingsContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import PageLoader from "./components/PageLoader";
import ResourceOptimizer from "./components/ResourceOptimizer";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();
  if (!lang) return null;

  const slugs = translations[lang].routes;

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes key={lang}>
        <Route path="/" element={<Navigate to={`/${lang}`} />} />
        <Route path={`/:lang`} element={<HomePage />} />
        <Route path={`/:lang/${slugs.about}`} element={<About />} />
        <Route
          path={`/:lang/${slugs.services}/:slug`}
          element={<ServiceDetail />}
        />
        <Route path={`/:lang/${slugs.tours}`} element={<Tours />} />
        <Route path={`/:lang/${slugs.tours}/:slug`} element={<TourDetail />} />
        <Route path={`/:lang/${slugs.faq}`} element={<Faq />} />
        <Route path={`/:lang/${slugs.contacts}`} element={<Contacts />} />
        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AnalyticsProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LanguageProvider>
            <SettingsProvider>
              <CurrencyProvider>
                <TourProvider>
                  <ServiceProvider>
                    {/* Performance и Web Vitals оптимизация */}
                    <WebVitalsMonitor />
                    <LCPOptimizer />
                    <CLSOptimizer />
                    <FIDOptimizer />
                    
                    <LazyAOS />
                    <ResourceOptimizer criticalRoutes={['/tours', '/contacts', '/about']} />
                    <Header />
                    <AppRoutes />
                    <Footer />
                  </ServiceProvider>
                </TourProvider>
              </CurrencyProvider>
            </SettingsProvider>
          </LanguageProvider>
        </Router>
      </QueryClientProvider>
    </AnalyticsProvider>
  );
}
