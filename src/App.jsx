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
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnalyticsProvider } from "./components/Analytics";
import Header from "./components/Header";
import Footer from "./components/Footer";

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

const queryClient = new QueryClient();

// Компонент загрузки для Suspense
const PageLoader = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',    
  }}>
    <div className="loading-spinner"></div>
  </div>
);

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
  // Инициализируем AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,         // длительность анимации в миллисекундах (уменьшил для более отзывчивости)
      delay: 0,              // задержка анимации
      easing: 'ease-in-out', // тип easing для анимации (более плавный)
      once: true,           // анимация НЕ происходит только один раз (повторяется)
      mirror: true,          // элементы анимируются при прокрутке обратно (обратная анимация)
      anchorPlacement: 'center-bottom', // определение когда элемент считается в области видимости (элементы появляются еще раньше)
      offset: 200,           // отступ (в px) от исходной точки срабатывания (увеличил для более раннего срабатывания)
      disable: false,        // условие отключения AOS
      startEvent: 'DOMContentLoaded', // имя события, после которого AOS будет инициализирован
      animatedClassName: 'aos-animate', // класс, применяемый к анимированному элементу
      initClassName: 'aos-init', // класс, применяемый после инициализации
      useClassNames: false,  // если true, добавит `data-aos` как классы
      disableMutationObserver: false, // отключить автоматическое обнаружение мутаций
      debounceDelay: 50, // задержка для debounce при изменении размера окна
      throttleDelay: 99, // задержка для throttle при прокрутке
    });

    // Обновляем AOS при изменении контента
    AOS.refresh();

    return () => {
      // Очистка при размонтировании не требуется для AOS
    };
  }, []);

  return (
    <AnalyticsProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <LanguageProvider>
            <SettingsProvider>
              <CurrencyProvider>
              <TourProvider>
                <ServiceProvider>
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
