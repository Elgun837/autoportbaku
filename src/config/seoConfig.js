/**
 * Конфигурация для SEO и canonical URLs
 */

// Основной домен сайта (измените на ваш реальный домен)
export const SITE_CONFIG = {
  // Продакшн домен
  baseUrl: process.env.NODE_ENV === 'production' 
    ? 'https://autoportbaku.com' 
    : 'http://localhost:5173',
  
  // Основной язык сайта (для canonical URL без префикса)
  defaultLanguage: 'en',
  
  // Поддерживаемые языки
  supportedLanguages: ['ru', 'en', 'az'],
  
  // Информация о компании
  companyInfo: {
    name: 'AutoPortBaku',
    description: 'Трансферы и туры в Баку',
    phone: '+994 XX XXX XX XX',
    email: 'info@autoportbaku.com',
    address: 'Баку, Азербайджан'
  },
  
  // Социальные сети
  socialMedia: {
    facebook: 'https://www.facebook.com/autoportbaku',
    instagram: 'https://www.instagram.com/autoportbaku',
    youtube: 'https://www.youtube.com/@autoportbaku'
  }
};

/**
 * Маппинг типов страниц для SEO
 */
export const PAGE_TYPES = {
  HOME: 'homePage',
  ABOUT: 'aboutPage', 
  CONTACTS: 'contactsPage',
  TOURS: 'toursPage',
  TOUR_DETAIL: 'tourDetailPage',
  SERVICES: 'servicesPage',
  SERVICE_DETAIL: 'serviceDetailPage',
  FAQ: 'faqPage'
};

/**
 * Шаблоны для canonical URLs
 */
export const CANONICAL_TEMPLATES = {
  [PAGE_TYPES.HOME]: '/',
  [PAGE_TYPES.ABOUT]: '/about',
  [PAGE_TYPES.CONTACTS]: '/contacts',
  [PAGE_TYPES.TOURS]: '/tours',
  [PAGE_TYPES.TOUR_DETAIL]: '/tours/{slug}',
  [PAGE_TYPES.SERVICES]: '/services',
  [PAGE_TYPES.SERVICE_DETAIL]: '/services/{slug}',
  [PAGE_TYPES.FAQ]: '/faq'
};