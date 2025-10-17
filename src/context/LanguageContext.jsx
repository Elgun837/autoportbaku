import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";
import { getToursData, getServiceData } from "../api/index";
import { getLocalizedPath } from "../utils/routes";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState("en");

  // ✅ URL-dən dili oxu (ilk açılışda)
  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (["en", "ru"].includes(pathLang)) {
      setLang(pathLang);
    } else {
      // Əgər URL-də dil yoxdursa, avtomatik əlavə et
      navigate(`/en${location.pathname}`, { replace: true });
    }
  }, []);

  // ✅ Dili dəyişəndə URL-ni yenilə
  const changeLang = async (newLang) => {
    setLang(newLang);
    const pathParts = location.pathname.split("/").filter(Boolean);

    // Проверяем, находимся ли мы на странице конкретного тура (tours или turi)
    if (pathParts.length >= 3 && (pathParts[1] === 'tours' || pathParts[1] === 'turi') && pathParts[2]) {
      const currentSlug = pathParts[2];
      
      try {
        // Получаем туры для нового языка
        const toursData = await getToursData(newLang);
        const tours = toursData.data || toursData || [];
        
        // Ищем соответствующий тур на новом языке
        const cleanSlug = currentSlug.replace(/-ru$|-(en|eng)$/, '');
        const targetTour = tours.find(tour => {
          const tourCleanSlug = tour.slug.replace(/-ru$|-(en|eng)$/, '');
          return tourCleanSlug === cleanSlug;
        });

        if (targetTour) {
          // Найден соответствующий тур - переходим к нему с правильным локализованным путем
          const newPath = getLocalizedPath(newLang, 'tours', targetTour.slug);
          navigate(newPath, { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error finding tour for new language:', error);
      }
      
      // Если не нашли тур, переходим на список туров с правильным локализованным путем
      const newPath = getLocalizedPath(newLang, 'tours');
      navigate(newPath, { replace: true });
      return;
    }

    // Проверяем, находимся ли мы на странице конкретного сервиса
    if (pathParts.length >= 3 && (pathParts[1] === 'services' || pathParts[1] === 'servisy') && pathParts[2]) {
      const currentSlug = pathParts[2];
      
      try {
        // Получаем сервисы для нового языка
        const servicesData = await getServiceData(newLang);
        const services = Array.isArray(servicesData) ? servicesData : (servicesData.data || []);
        
        // Ищем соответствующий сервис на новом языке
        const cleanSlug = currentSlug.replace(/-ru$|-(en|eng)$/, '');
        const targetService = services.find(service => {
          const serviceCleanSlug = service.slug.replace(/-ru$|-(en|eng)$/, '');
          return serviceCleanSlug === cleanSlug;
        });

        if (targetService) {
          // Найден соответствующий сервис - переходим к нему с правильным локализованным путем
          const newPath = getLocalizedPath(newLang, 'services', targetService.slug);
          navigate(newPath, { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error finding service for new language:', error);
      }
      
      // Если не нашли сервис, переходим на список сервисов
      const newPath = getLocalizedPath(newLang, 'services');
      navigate(newPath, { replace: true });
      return;
    }

    // Для остальных страниц - стандартная логика
    if (["en", "ru"].includes(pathParts[0])) {
      pathParts[0] = newLang; // mövcud dili dəyiş
    } else {
      pathParts.unshift(newLang); // yoxdursa, əlavə et
    }

    navigate(`/${pathParts.join("/")}${location.search}`, { replace: true });
  };

  // 🔤 Tərcümə funksiyası
  const t = (keyPath, options = {}) => {
    const keys = keyPath.split(".");
    let value = translations[lang];
    for (let key of keys) {
      value = value?.[key];
      if (!value) return keyPath;
    }

    if (options.returnObjects && typeof value === "object") {
      return value;
    }

    return value;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
