import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";

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

    // Проверяем, находимся ли мы на странице конкретного тура
    if (pathParts.length >= 3 && pathParts[1] === 'tours' && pathParts[2]) {
      const currentSlug = pathParts[2];
      
      try {
        // Импортируем API функцию для получения туров
        const { getToursData } = await import('../api/index');
        const toursData = await getToursData(newLang);
        const tours = toursData.data || toursData || [];
        
        // Ищем соответствующий тур на новом языке
        const cleanSlug = currentSlug.replace(/-ru$|-(en|eng)$/, '');
        const targetTour = tours.find(tour => {
          const tourCleanSlug = tour.slug.replace(/-ru$|-(en|eng)$/, '');
          return tourCleanSlug === cleanSlug;
        });

        if (targetTour) {
          // Найден соответствующий тур - переходим к нему
          navigate(`/${newLang}/tours/${targetTour.slug}`, { replace: true });
          return;
        }
      } catch (error) {
        console.error('Error finding tour for new language:', error);
      }
      
      // Если не нашли тур, переходим на список туров
      navigate(`/${newLang}/tours`, { replace: true });
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
