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

    // Statik səhifələr üçün route dəyişdir
    if (slugKey && newRoutes[slugKey]) {
      pathParts[1] = newRoutes[slugKey];
    }

    let newSlug = null;

    // 🔹 Dinamik səhifələr üçün (tours / services)
    if (pathParts[2]) {
      try {
        // Köhnə dilin datalarını və cari slug-u tap
        let oldData = null;
        let newData = null;

        if (slugKey === "tours") {
          oldData = await getToursData(lang);
          newData = await getToursData(newLang);
        } else if (slugKey === "services") {
          oldData = await getServiceData(lang);
          newData = await getServiceData(newLang);
        }

        const oldArray = Array.isArray(oldData) ? oldData : oldData?.data || [];
        const newArray = Array.isArray(newData) ? newData : newData?.data || [];

        // Hazırkı səhifənin obyektini köhnə dildə tap
        const currentItem = oldArray.find(
          (item) =>
            item.slug === pathParts[2] ||
            item.id?.toString() === pathParts[2] ||
            item.slug?.replace(/-(en|ru)$/i, "") ===
              pathParts[2].replace(/-(en|ru)$/i, "")
        );

        // Yeni dildə eyni id-li obyektin slug-ını tap
        if (currentItem) {
          const translatedItem = newArray.find(
            (item) =>
              item.id === currentItem.id ||
              (item.uuid && item.uuid === currentItem.uuid)
          );

          if (translatedItem) {
            newSlug = translatedItem.slug;
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch ${slugKey}`, err);
      }
    }

    // 🔹 Yeni slug tapılıbsa onu dəyiş
    if (newSlug) {
      pathParts[2] = newSlug;
    }

    // 🔹 Navigate yalnız hər şey hazır olanda getsin
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
