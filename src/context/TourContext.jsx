import { createContext, useContext, useEffect, useState } from "react";
import { getToursData } from "../api";
import { useLanguage } from "./LanguageContext";

export const TourContext = createContext();

export const TourProvider = ({ children }) => {
  const { lang } = useLanguage();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lang) return;

    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await getToursData(lang);
       

        // Array olub-olmadığını yoxla
        let toursData = [];
        if (Array.isArray(response)) {
          toursData = response;
        } else if (Array.isArray(response?.data)) {
          toursData = response.data;
        } else {
          toursData = [];
        }

        setTours(toursData);
      } catch (error) {
        console.error("TourContext → fetchTours error:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [lang]);

  return (
    <TourContext.Provider value={{ tours, loading }}>
      {children}
    </TourContext.Provider>
  );
};

export const useTours = () => useContext(TourContext);
