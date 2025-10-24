import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Критический CSS генератор для AutoPortBaku
 * Извлекает только самые важные стили для первого экрана
 */

// Критические селекторы для каждого типа страницы
const CRITICAL_SELECTORS = {
  // Базовые стили для всех страниц
  base: [
    'html', 'body', '*', '*::before', '*::after',
    '.container', '.row', '.col', 
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'button', 'input',
    // Заголовок (всегда виден)
    '.header', '.header *',
    '.navbar', '.navbar *',
    '.logo', '.logo *',
    '.nav-menu', '.nav-menu *',
    // Основные layout элементы
    '.main-content',
    '.page-wrapper',
    // Лоадеры и скелетоны
    '.skeleton', '.skeleton *',
    '.loading', '.loading *',
    // Анимации AOS (первый экран)
    '[data-aos]',
    // Критические утилиты
    '.visually-hidden',
    '.sr-only',
    // Основные цвета и типография
    '.text-primary', '.text-secondary',
    '.bg-primary', '.bg-secondary'
  ],
  
  // Домашняя страница
  homepage: [
    '.hero', '.hero *',
    '.page-big-banner', '.page-big-banner *',
    '.banner-content', '.banner-content *',
    '.banner-title', '.banner-subtitle',
    '.banner-image', '.banner-background',
    '.slide', '.slide *',
    '.swiper-wrapper', '.swiper-slide',
    // Первые секции
    '.services-preview', '.services-preview *',
    '.why-us', '.why-us *',
    '.mission', '.mission *'
  ],
  
  // Страницы с малым баннером
  pages: [
    '.page-small-banner', '.page-small-banner *',
    '.page-title', '.page-subtitle',
    '.breadcrumbs', '.breadcrumbs *'
  ],
  
  // Формы
  forms: [
    '.form', '.form *',
    '.form-group', '.form-control',
    '.btn', '.btn-primary', '.btn-secondary',
    '.multi-step-form', '.multi-step-form *'
  ]
};

// Критические CSS правила (инлайн стили)
const CRITICAL_CSS_RULES = `

  
  /* Предзагрузка изображений */
  .lazy-image {
    background-color: #f5f5f5;
    transition: opacity 0.3s ease;
  }
  
  .lazy-image.loaded {
    opacity: 1;
  }
`;

/**
 * Извлекает критический CSS из файлов стилей
 */
function extractCriticalCSS(cssFiles, pageType = 'base') {
  const criticalSelectors = [
    ...CRITICAL_SELECTORS.base,
    ...(CRITICAL_SELECTORS[pageType] || [])
  ];
  
  let criticalCSS = CRITICAL_CSS_RULES;
  
  cssFiles.forEach(filePath => {
    if (!existsSync(filePath)) return;
    
    const cssContent = readFileSync(filePath, 'utf8');
    
    // Простой парсер CSS для извлечения критических правил
    criticalSelectors.forEach(selector => {
      const regex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*{[^}]*}`, 'g');
      const matches = cssContent.match(regex);
      
      if (matches) {
        matches.forEach(match => {
          if (!criticalCSS.includes(match)) {
            criticalCSS += `\n${match}`;
          }
        });
      }
    });
  });
  
  return criticalCSS;
}

/**
 * Минифицирует CSS
 */
function minifyCSS(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Удаляем комментарии
    .replace(/\s+/g, ' ') // Заменяем множественные пробелы
    .replace(/;\s*}/g, '}') // Удаляем последние точки с запятой
    .replace(/\s*{\s*/g, '{') // Убираем пробелы вокруг скобок
    .replace(/;\s*/g, ';') // Убираем пробелы после точек с запятой
    .trim();
}

/**
 * Генерирует критический CSS для конкретной страницы
 */
export function generateCriticalCSS(pageType = 'base') {
  const cssFiles = [
    join(__dirname, '../src/assets/styles/Base.scss'),
    join(__dirname, '../src/assets/styles/Typography.scss'),
    join(__dirname, '../src/assets/styles/Reset.scss'),
    join(__dirname, '../resources/css/Base.css'),
    join(__dirname, '../resources/css/Typography.css'),
    join(__dirname, '../resources/css/Header.css'),
  ];
  
  // Добавляем специфичные файлы для типа страницы
  if (pageType === 'homepage') {
    cssFiles.push(
      join(__dirname, '../src/assets/styles/Slide.scss'),
      join(__dirname, '../resources/css/Slide.css'),
      join(__dirname, '../resources/css/Page_banners.css')
    );
  }
  
  const criticalCSS = extractCriticalCSS(cssFiles, pageType);
  const minifiedCSS = minifyCSS(criticalCSS);
  
  return minifiedCSS;
}

/**
 * Создает хеш для версионирования CSS (браузерная версия)
 */
export function createCSSHash(css) {
  // Простая хеш-функция для браузера
  let hash = 0;
  if (css.length === 0) return hash.toString(16).substring(0, 8);
  
  for (let i = 0; i < css.length; i++) {
    const char = css.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Конвертируем в 32-битное число
  }
  
  return Math.abs(hash).toString(16).substring(0, 8);
}

export default {
  generateCriticalCSS,
  createCSSHash,
  CRITICAL_SELECTORS
};