import { createContext, useContext, useEffect, useState } from "react";
import { getServiceData } from "../api";
import { useLanguage } from "./LanguageContext";

export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const { lang } = useLanguage();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lang) return;

    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await getServiceData(lang);
       

        // Array olub-olmadığını yoxla
        let servicesData = [];
        if (Array.isArray(response)) {
          servicesData = response;
        } else if (Array.isArray(response?.data)) {
          servicesData = response.data;
        } else {
          servicesData = [];
        }

        setServices(servicesData);
      } catch (error) {
        console.error("ServiceContext → fetchServices error:", error);
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [lang]);

  return (
    <ServiceContext.Provider value={{ services, loading }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => useContext(ServiceContext);
