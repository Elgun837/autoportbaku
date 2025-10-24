# Настройка Canonical URL в проекте AutoPortBaku

## Что такое Canonical URL?

Canonical URL - это HTML элемент `<link rel="canonical">`, который указывает поисковым системам предпочтительный URL для страницы. Это критически важно для:

- **Предотвращения дублированного контента** в поисковых системах
- **Консолидации SEO-силы** на одном URL
- **Правильной индексации** многоязычных сайтов
- **Улучшения позиций** в поисковой выдаче

## Структура реализации

### 1. Конфигурация (`src/config/seoConfig.js`)

```javascript
export const SITE_CONFIG = {
  baseUrl: 'https://autoportbaku.com',
  defaultLanguage: 'ru', // Основной язык без префикса в URL
  supportedLanguages: ['ru', 'en', 'az']
};
```

### 2. Хук для генерации URL (`src/hooks/useCanonicalUrl.js`)

```javascript
// Автоматическая генерация canonical URL
const canonicalUrl = useCanonicalUrl('/services/airport-transfer');

// Генерация hreflang URLs для многоязычности
const alternateUrls = useAlternateUrls('/services/airport-transfer');
```

### 3. Компонент SEO (`src/components/SEOHead.jsx`)

Автоматически добавляет в `<head>`:
- `<link rel="canonical">` 
- `<link rel="alternate" hreflang="...">` для каждого языка
- Open Graph и Twitter meta теги

## Примеры использования

### Главная страница
```jsx
<SEOHead
  pageType="homePage"
  basePath="/"
/>
```

### Статические страницы с переводами
```jsx
// Страница "О нас"
<SEOHead
  pageType="aboutPage"
  routeKey="about"  // Использует translations.{lang}.routes.about
/>

// Страница "Контакты" 
<SEOHead
  pageType="contactsPage"
  routeKey="contacts"  // Использует translations.{lang}.routes.contacts
/>

// Страница "FAQ"
<SEOHead
  pageType="faqPage"
  routeKey="faq"  // Использует translations.{lang}.routes.faq
/>
```

**Результат для страницы "О нас":**
- Русский: `<link rel="canonical" href="https://autoportbaku.com/o-nas" />`
- Английский: `<link rel="canonical" href="https://autoportbaku.com/en/about-us" />`
- Азербайджанский: `<link rel="canonical" href="https://autoportbaku.com/az/haqqimizda" />`

### Динамические страницы (детали туров/сервисов)
```jsx
// Детали тура
<SEOHead
  pageType="toursPage"
  title={tour?.title}
  description={tour?.excerpt}
  basePath={`/tours/${tour?.slug}`}  // Используем slug объекта
  ogImage={tour?.image}
/>

// Детали сервиса
<SEOHead
  pageType="servicesPage"
  title={service?.title}
  description={service?.description}
  basePath={`/services/${service?.slug}`}  // Используем slug объекта
  ogImage={service?.image}
/>
```

**Результат для тура "baku-city-tour":**
- Русский: `<link rel="canonical" href="https://autoportbaku.com/tours/baku-city-tour" />`
- Английский: `<link rel="canonical" href="https://autoportbaku.com/en/tours/baku-city-tour" />`

## Hreflang теги

Автоматически добавляются для каждой страницы:

```html
<link rel="alternate" hreflang="ru" href="https://autoportbaku.com/about" />
<link rel="alternate" hreflang="en" href="https://autoportbaku.com/en/about" />
<link rel="alternate" hreflang="az" href="https://autoportbaku.com/az/about" />
<link rel="alternate" hreflang="x-default" href="https://autoportbaku.com/about" />
```

## Логика выбора основного языка

- **Русский (ru)** - основной язык, URL без префикса: `autoportbaku.com/tours`
- **Английский (en)** - с префиксом: `autoportbaku.com/en/tours`  
- **Азербайджанский (az)** - с префиксом: `autoportbaku.com/az/tours`
- **x-default** - указывает на русскую версию для неопределенных регионов

## Преимущества этой реализации

✅ **Автоматизация** - canonical URL генерируется автоматически  
✅ **Консистентность** - единая логика для всех страниц  
✅ **Многоязычность** - правильные hreflang теги  
✅ **SEO-оптимизация** - соответствие лучшим практикам  
✅ **Гибкость** - легко кастомизировать для конкретных страниц  

## Проверка результата

После внедрения можно проверить:

1. **В браузере**: View Source → найти `<link rel="canonical">`
2. **Google Search Console**: Coverage → Duplicate content issues
3. **SEO-инструменты**: Screaming Frog, Ahrefs, Semrush
4. **Валидаторы**: Google Rich Results Test

## Настройка домена

Измените в `src/config/seoConfig.js`:
```javascript
baseUrl: process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.com'  // ← Ваш реальный домен
  : 'http://localhost:5173'
```