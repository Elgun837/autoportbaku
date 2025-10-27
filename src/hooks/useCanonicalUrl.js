import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SITE_CONFIG } from '../config/seoConfig';
import { translations } from '../translations';

/**
 * Хук для генерации canonical URL
 * @param {string} basePath - базовый путь без языка (например, '/services/airport-transfer')
 * @param {string} routeKey - ключ маршрута из переводов для статических страниц ('about', 'services', etc.)
 * @returns {string} - полный canonical URL
 */
export const useCanonicalUrl = (basePath = null, routeKey = null) => {
  const location = useLocation();
  const { lang, t } = useLanguage();
  
  const canonicalUrl = useMemo(() => {
    // Используем конфигурацию
    const { baseUrl, defaultLanguage } = SITE_CONFIG;
    
    let currentPath;
    
    if (routeKey) {
      // Для статических страниц используем переводы
      const translatedRoute = t(`routes.${routeKey}`);
      // Если перевод не найден, используем routeKey как fallback
      currentPath = `/${translatedRoute || routeKey}`;
    } else if (basePath) {
      // Для динамических страниц используем переданный basePath
      currentPath = basePath;
    } else {
      // Fallback - текущий путь без языкового префикса
      currentPath = location.pathname.replace(/^\/(ru|en|az)/, '');
    }
    
    // Формируем canonical URL
    if (lang === defaultLanguage) {
      // Для основного языка canonical без префикса
      return `${baseUrl}${currentPath || '/'}`;
    } else {
      // Для других языков добавляем префикс языка
      return `${baseUrl}/${lang}${currentPath || '/'}`;
    }
  }, [basePath, routeKey, location.pathname, lang, t]);

  return canonicalUrl;
};

/**
 * Хук для генерации alternate URLs (hreflang)
 * @param {string} basePath - базовый путь без языка
 * @param {string} routeKey - ключ маршрута из переводов для статических страниц
 * @returns {Array} - массив объектов с alternate URLs
 */
export const useAlternateUrls = (basePath = null, routeKey = null) => {
  const location = useLocation();
  
  const alternateUrls = useMemo(() => {
    const { baseUrl, defaultLanguage, supportedLanguages } = SITE_CONFIG;
    
    const urls = supportedLanguages.map(language => {
      let currentPath;
      
      if (routeKey) {
        // Для статических страниц получаем переведенный путь для каждого языка
        const translatedRoute = translations[language]?.routes?.[routeKey] || routeKey;
        currentPath = `/${translatedRoute}`;
      } else if (basePath) {
        // Для динамических страниц используем базовый путь
        currentPath = basePath;
      } else {
        // Fallback
        currentPath = location.pathname.replace(/^\/(ru|en|az)/, '');
      }
      
      return {
        lang: language,
        url: language === defaultLanguage 
          ? `${baseUrl}${currentPath || '/'}` // Основной язык без префикса
          : `${baseUrl}/${language}${currentPath || '/'}`
      };
    });
    
    // Добавляем x-default для поисковых систем (всегда на основном языке)
    const defaultPath = routeKey 
      ? `/${translations[defaultLanguage]?.routes?.[routeKey] || routeKey}`
      : (basePath || location.pathname.replace(/^\/(ru|en|az)/, ''));
      
    urls.push({
      lang: 'x-default',
      url: `${baseUrl}${defaultPath || '/'}`
    });
    
    return urls;
  }, [basePath, routeKey, location.pathname]);

  return alternateUrls;
};