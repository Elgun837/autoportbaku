import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { useEffect } from "react";
import { initImageFallback } from "./utils/imageUtils";
import 'animate.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnalyticsProvider } from "./components/Analytics";



import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import ServiceDetail from "./pages/ServiceDetail";
import Contacts from "./pages/Contacts";
import Faq from "./pages/Faq";
import About from "./pages/About";
import { translations } from "./translations";
import { TourProvider } from "./context/TourContext";
import { ServiceProvider } from "./context/ServiceContext";
import { SettingsProvider } from "./context/SettingsContext";

const queryClient = new QueryClient();

function AppRoutes() {
  const { lang } = useLanguage();
  if (!lang) return null;

  const slugs = translations[lang].routes;

  return (
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
  );
}

export default function App() {
  // Инициализируем систему fallback для изображений
  useEffect(() => {
    const cleanup = initImageFallback();
    return cleanup;
  }, []);

  // Инициализируем AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,         // длительность анимации в миллисекундах (уменьшил для более отзывчивости)
      delay: 0,              // задержка анимации
      easing: 'ease-in-out', // тип easing для анимации (более плавный)
      once: true,           // анимация НЕ происходит только один раз (повторяется)
      mirror: true,          // элементы анимируются при прокрутке обратно (обратная анимация)
      anchorPlacement: 'top-bottom', // определение когда элемент считается в области видимости
      offset: 100,           // отступ (в px) от исходной точки срабатывания (увеличил для раннего срабатывания)
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
    <AnalyticsProvider
      
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <LanguageProvider>
            <SettingsProvider>
              <TourProvider>
                <ServiceProvider>
                  <Header />
                  <AppRoutes />
                  <Footer />
                </ServiceProvider>
              </TourProvider>
            </SettingsProvider>
          </LanguageProvider>
        </Router>
      </QueryClientProvider>
    </AnalyticsProvider>
  );
}
