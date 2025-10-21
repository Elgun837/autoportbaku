import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";
import { getToursData, getServiceData } from "../api/index";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState(null);

  // 🔹 İlk açılışda URL-dən dili oxu
  useEffect(() => {
    const pathLang = location.pathname.split("/")[1];
    if (["en", "ru"].includes(pathLang)) {
      setLang(pathLang);
    } else {
      navigate(`/en${location.pathname}`, { replace: true });
    }
  }, []);

  // 🔹 Dili dəyişəndə URL-i yenilə
  const changeLang = async (newLang) => {
    if (!lang || newLang === lang) return;

    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentLang = pathParts[0];
    if (!currentLang || !translations[currentLang]) return;

    const currentRoutes = translations[currentLang].routes || {};
    const newRoutes = translations[newLang]?.routes || {};

    const slugKey = Object.keys(currentRoutes).find(
      (key) => currentRoutes[key] === pathParts[1]
    );

    // Dil hissəsini dəyiş
    pathParts[0] = newLang;

    // Statik səhifələr üçün slug dəyişdir
    if (slugKey && newRoutes[slugKey]) {
      pathParts[1] = newRoutes[slugKey];
    }

    let newSlug = null;

    // Dinamik səhifələr üçün API-dən slug tap
    if (pathParts[2]) {
      try {
        if (slugKey === "tours") {
          const toursData = await getToursData(newLang);
          const toursArray = Array.isArray(toursData)
            ? toursData
            : toursData?.data || [];

          const tour = toursArray.find(
            (t) =>
              t.id.toString() === pathParts[2] ||
              t.slug.replace(/-(en|ru)$/i, "") ===
                pathParts[2].replace(/-(en|ru)$/i, "")
          );
          if (tour) newSlug = tour.slug;
        } else if (slugKey === "services") {
          const servicesData = await getServiceData(newLang);
          const servicesArray = Array.isArray(servicesData)
            ? servicesData
            : servicesData?.data || [];

          const service = servicesArray.find(
            (s) =>
              s.id.toString() === pathParts[2] ||
              s.slug.replace(/-(en|ru)$/i, "") ===
                pathParts[2].replace(/-(en|ru)$/i, "")
          );
          if (service) newSlug = service.slug;
        }
      } catch (err) {
        console.warn(`Failed to fetch ${slugKey}`, err);
      }
    }

    // 🔹 Əgər yeni slug tapılıbsa, onu dəyiş
    if (newSlug) {
      pathParts[2] = newSlug;
    }

    // 🔹 Navigate yalnız slug hazır olduqda
    setLang(newLang);
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
