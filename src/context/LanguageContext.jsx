import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";

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
    setLang(newLang);
    const pathParts = location.pathname.split("/").filter(Boolean);

    if (["en", "ru"].includes(pathParts[0])) {
      pathParts[0] = newLang; // mövcud dili dəyiş
    } 
    else {
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