import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../translations";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  getServiceData,
  getToursSlug,
  getServicesSlug,
} from "../api/index";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [lang, setLang] = useState("en");

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
  // const changeLang = async (newLang) => {
  //   if (!lang || newLang === lang) return;

  //   const pathParts = location.pathname.split("/").filter(Boolean);
  //   const currentLang = pathParts[0];
  //   if (!currentLang || !translations[currentLang]) return;

  //   const currentRoutes = translations[currentLang].routes || {};
  //   const newRoutes = translations[newLang]?.routes || {};

  //   const slugKey = Object.keys(currentRoutes).find(
  //     (key) => currentRoutes[key] === pathParts[1]
  //   );

  //   // Dil hissəsini dəyiş
  //   pathParts[0] = newLang;

  //   // Statik səhifələr üçün route dəyişdir
  //   if (slugKey && newRoutes[slugKey]) {
  //     pathParts[1] = newRoutes[slugKey];
  //   }

  //   let newSlug = null;

  //   // 🔹 Dinamik səhifələr üçün (tours / services)
  //   if (pathParts[2]) {
  //     try {
  //       // Köhnə dilin datalarını və cari slug-u tap
  //       let oldData = null;
  //       let newData = null;

  //       if (slugKey === "tours") {
  //         oldData = await getToursData(lang);
  //         newData = await getToursData(newLang);
  //       } else if (slugKey === "services") {
  //         oldData = await getServiceData(lang);
  //         newData = await getServiceData(newLang);
  //       }

  //       const oldArray = Array.isArray(oldData) ? oldData : oldData?.data || [];
  //       const newArray = Array.isArray(newData) ? newData : newData?.data || [];

  //       // Hazırkı səhifənin obyektini köhnə dildə tap
  //       const currentItem = oldArray.find(
  //         (item) =>
  //           item.slug === pathParts[2] ||
  //           item.id?.toString() === pathParts[2] ||
  //           item.slug?.replace(/-(en|ru)$/i, "") ===
  //             pathParts[2].replace(/-(en|ru)$/i, "")
  //       );

  //       // Yeni dildə eyni id-li obyektin slug-ını tap
  //       if (currentItem) {
  //         const translatedItem = newArray.find(
  //           (item) =>
  //             item.id === currentItem.id ||
  //             (item.uuid && item.uuid === currentItem.uuid)
  //         );

  //         if (translatedItem) {
  //           newSlug = translatedItem.slug;
  //         }
  //       }
  //     } catch (err) {
  //       console.warn(`Failed to fetch ${slugKey}`, err);
  //     }
  //   }

  //   // 🔹 Yeni slug tapılıbsa onu dəyiş
  //   if (newSlug) {
  //     pathParts[2] = newSlug;
  //   }

  //   // 🔹 Navigate yalnız hər şey hazır olanda getsin
  //   setLang(newLang);
  //   navigate(`/${pathParts.join("/")}${location.search}`, { replace: true });
  // };

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

    // 1️⃣ Dil hissəsini dəyiş
    pathParts[0] = newLang;

    // 2️⃣ Statik səhifələr üçün slug dəyişdir
    if (slugKey && newRoutes[slugKey]) {
      pathParts[1] = newRoutes[slugKey];
    }

    let newSlug = null;

    // 3️⃣ Dinamik səhifələr üçün API-dən yeni dilə uyğun slug tap
    if (pathParts[2]) {
      try {
        let slugToUse = pathParts[2]; // default olaraq URL-dən gələn slug
        let slugData = null; // burada tanıtdıq

        // Əgər yeni dil currentLang-dən fərqlidirsə, yeni dil slug-u tap
        if (newLang !== currentLang) {
          // if (slugKey === "tours") {
          //   slugData = await getToursSlug(currentLang, pathParts[2]);
          //   console.log("slugData:", slugData);
          // } else if (slugKey === "services") {
          //   slugData = await getServicesSlug(currentLang, pathParts[2]);
          // }
          // if (slugData) {
          //   if (typeof slugData.slug === "object") {
          //     slugToUse = slugData.slug[newLang] || slugData.slug.en;
          //   } else if (typeof slugData.slug === "string") {
          //     slugToUse = slugData.slug;
          //   } else if (typeof slugData === "object" && slugData[newLang]) {
          //     // API birbaşa {en: "...", ru: "..."} formatında gəlirsə
          //     slugToUse = slugData[newLang] || slugData.en;
          //   } else if (typeof slugData === "string") {
          //     slugToUse = slugData; // sadəcə stringdirsə
          //   }
          //   console.log("slugToUse:", slugToUse);
          // }

          let slugMapping;
          if (slugKey === "tours") {
            slugMapping = await getToursSlug(currentLang, pathParts[2]);
          } else if (slugKey === "services") {
            slugMapping = await getServicesSlug(currentLang, pathParts[2]);
          }

          // Yeni dil slug-u tap
          let slugToUse = pathParts[2]; // default
          
          if (Array.isArray(slugMapping)) {
            // API array qaytarırsa
            slugMapping = slugMapping[0];
          }

          if (slugMapping) {
            if (typeof slugMapping.slug === "object") {
              slugToUse = slugMapping.slug[newLang] || slugMapping.slug.en;
            } else if (
              typeof slugMapping === "object" &&
              slugMapping[newLang]
            ) {
              slugToUse = slugMapping[newLang] || slugMapping.en;
            } else if (typeof slugMapping.slug === "string") {
              slugToUse = slugMapping.slug;
            } else if (typeof slugMapping === "string") {
              slugToUse = slugMapping;
            }
          }

          if (slugKey === "tours") {
            
            const tourDataArray = await getToursSlug(newLang, slugToUse);
            if (Array.isArray(tourDataArray) && tourDataArray.length > 0) {
              const tourData = tourDataArray[0];
              if (tourData.slug && typeof tourData.slug === "object") {
                newSlug = tourData.slug[newLang] || tourData.slug.en;
                // console.log("newSlug:", newSlug);
              } else if (typeof tourData.slug === "string") {
                newSlug = tourData.slug;
              }
            } else {
              console.warn("tourData array boşdur!");
            }
          } else if (slugKey === "services") {
            const serviceDataArray = await getServicesSlug(newLang, slugToUse);
           
            if (Array.isArray(serviceDataArray) && serviceDataArray.length > 0) {
              const serviceData = serviceDataArray[0];
              
              if (serviceData.slug && typeof serviceData.slug === "object") {
                newSlug = serviceData.slug[newLang] || tourData.slug.en;
                // console.log("newSlug:", newSlug);
              } else if (typeof serviceData.slug === "string") {
                newSlug = serviceData.slug;
              }
            } else {
              console.warn("serviceData array boşdur!");
            }
          }
        }

        // İndi slugToUse ilə API çağırışı et
      } catch (err) {
        console.warn(`Failed to fetch ${slugKey} for lang=${newLang}`, err);
      }
    }

    // 4️⃣ Əgər yeni slug tapılıbsa, onu URL-də dəyiş
    if (newSlug) pathParts[2] = newSlug;

    // 5️⃣ Navigate və lang state update
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
