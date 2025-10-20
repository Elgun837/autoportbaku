import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";
import { getToursData, getServiceData } from "../api/index";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState(null);

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
  const changeLang = (newLang) => {
    if (!lang || newLang === lang) return;

    const pathParts = location.pathname.split("/").filter(Boolean);
    const currentLang = pathParts[0];

    if (!currentLang || !translations[currentLang]) return;

    // ✅ Use routes instead of slugs
    const currentRoutes = translations[currentLang].routes || {};
    const newRoutes = translations[newLang]?.routes || {};

    // Həmin slug hansı açara uyğun gəlir
    const slugKey = Object.keys(currentRoutes).find(
      (key) => currentRoutes[key] === pathParts[1]
    );

    // dil hissəsini dəyiş
    pathParts[0] = newLang;

    // slug varsa yeni dildə dəyiş
    if (slugKey && newRoutes[slugKey]) {
      pathParts[1] = newRoutes[slugKey];
    }

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
