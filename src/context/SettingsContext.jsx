import { createContext, useContext, useEffect, useState } from "react";
import { getSettingsData } from "../api";
import { useLanguage } from "./LanguageContext";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { lang } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lang) return;

    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await getSettingsData(lang);
       
        // Настройки обычно возвращаются как объект, а не массив
        let settingsData = null;
        if (response?.data) {
          settingsData = response.data;
        } else if (response) {
          settingsData = response;
        }

        setSettings(settingsData);
      } catch (error) {
        console.error("SettingsContext → fetchSettings error:", error);
        setSettings(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [lang]);

  return (
    <SettingsContext.Provider value={{ settings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);