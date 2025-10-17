import { translations } from '../translations';

/**
 * Генерирует локализованный путь для маршрутов
 * @param {string} lang - Код языка (en, ru, az и т.д.)
 * @param {string} route - Тип маршрута (services, tours и т.д.)
 * @param {string} slug - Опциональный slug для детальных страниц
 * @returns {string} Сгенерированный путь
 */
export const getLocalizedPath = (lang, route, slug = null) => {
  const currentTranslations = translations[lang] || translations.en;
  
  let basePath = `/${lang}`;
  
  switch (route) {
    case 'home':
      return basePath;
    case 'about':
      return `${basePath}/about-us`;
    case 'services':
      const servicesSlug = currentTranslations.services?.slug || 'services';
      return slug ? `${basePath}/${servicesSlug}/${slug}` : `${basePath}/${servicesSlug}`;
    case 'tours':
      const toursSlug = currentTranslations.tours?.slug || 'tours';
      return slug ? `${basePath}/${toursSlug}/${slug}` : `${basePath}/${toursSlug}`;
    case 'faq':
      return `${basePath}/faq`;
    case 'contacts':
      return `${basePath}/contacts`;
    default:
      return basePath;
  }
};

/**
 * Получает все возможные пути для роутинга
 * @returns {Object} Объект со всеми возможными путями для всех языков
 */
export const getAllLocalizedRoutes = () => {
  const routes = {};
  
  Object.keys(translations).forEach(lang => {
    const currentTranslations = translations[lang];
    const servicesSlug = currentTranslations.services?.slug || 'services';
    const toursSlug = currentTranslations.tours?.slug || 'tours';
    
    routes[lang] = {
      home: `/${lang}`,
      about: `/${lang}/about-us`,
      services: `/${lang}/${servicesSlug}`,
      serviceDetail: `/${lang}/${servicesSlug}/:slug`,
      tours: `/${lang}/${toursSlug}`,
      tourDetail: `/${lang}/${toursSlug}/:slug`,
      faq: `/${lang}/faq`,
      contacts: `/${lang}/contacts`
    };
  });
  
  return routes;
};

/**
 * Проверяет, соответствует ли текущий путь определенному маршруту
 * @param {string} currentPath - Текущий путь
 * @param {string} lang - Код языка
 * @param {string} route - Тип маршрута
 * @returns {boolean} true если путь соответствует маршруту
 */
export const isCurrentRoute = (currentPath, lang, route) => {
  const expectedPath = getLocalizedPath(lang, route);
  return currentPath === expectedPath || currentPath.startsWith(expectedPath + '/');
};