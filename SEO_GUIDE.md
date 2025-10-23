# SEO Руководство для AutoPortBaku

## Обзор созданных компонентов

Я создал полный набор SEO компонентов для вашего React проекта, которые помогут улучшить видимость в поисковых системах и настроить аналитику.

## Структура файлов

```
src/
  components/
    SEOHead.jsx           // Основной компонент для meta-тегов
    SEOComponents.jsx     // Специализированные SEO компоненты для разных страниц
    RichSnippets.jsx      // Rich Snippets и структурированные данные
    Analytics.jsx         // Аналитические сервисы (GA, Yandex, Facebook)
  utils/
    SEOUtils.jsx         // Полезные хуки и утилиты для SEO
  examples/
    SEOUsageExample.jsx  // Примеры использования
```

## 1. Основные SEO компоненты

### SEOHead - Базовый компонент

```jsx
import SEOHead from '../components/SEOHead';

<SEOHead
  title="Заголовок страницы"
  description="Описание страницы"
  keywords="ключевые, слова"
  ogImage="/images/og-image.jpg"
  canonicalUrl="https://autoportbaku.com/current-page"
  structuredData={schemaObject}
  breadcrumbs={breadcrumbsArray}
/>
```

### Специализированные компоненты

```jsx
import { 
  ToursPageSEO, 
  TourDetailSEO, 
  ServicesPageSEO,
  AboutPageSEO,
  ContactsPageSEO 
} from '../components/SEOComponents';

// Для страницы туров
<ToursPageSEO tours={toursData} />

// Для детальной страницы тура
<TourDetailSEO tour={tourData} />
```

## 2. Rich Snippets (Расширенные сниппеты)

### LocalBusinessSchema - Для Google My Business

```jsx
import { LocalBusinessSchema } from '../components/RichSnippets';

// Добавить на главную страницу
<LocalBusinessSchema />
```

### FAQ Schema

```jsx
import { FAQPageSEO } from '../components/RichSnippets';

const faqs = [
  {
    question: "Как заказать трансфер?",
    answer: "Вы можете заказать трансфер через наш сайт или по телефону +994-50-123-45-67"
  }
];

<FAQPageSEO faqs={faqs} />
```

### Отзывы с микроразметкой

```jsx
import { ReviewsSchema } from '../components/RichSnippets';

const reviews = [
  {
    authorName: "Алексей Петров",
    rating: 5,
    text: "Отличный сервис!",
    date: "2024-01-15"
  }
];

<ReviewsSchema reviews={reviews} />
```

## 3. Аналитика и отслеживание

### Настройка всей аналитики сразу

```jsx
import { AnalyticsProvider } from '../components/Analytics';

<AnalyticsProvider
  gtmId="GTM-XXXXXXX"
  gaId="G-XXXXXXXXXX"
  fbPixelId="XXXXXXXXXXXXXXXX"
  yandexId="XXXXXXXX"
  hotjarId="XXXXXXX"
>
  <App />
</AnalyticsProvider>
```

### Отдельные сервисы

```jsx
import { 
  GoogleAnalytics, 
  YandexMetrica, 
  FacebookPixel 
} from '../components/Analytics';

<GoogleAnalytics measurementId="G-XXXXXXXXXX" />
<YandexMetrica counterId="XXXXXXXX" />
<FacebookPixel pixelId="XXXXXXXXXXXXXXXX" />
```

## 4. Полезные хуки и утилиты

### Отслеживание событий

```jsx
import { EventTracking } from '../utils/SEOUtils';

<EventTracking 
  eventName="button_click" 
  eventData={{ button_name: 'book_tour' }}
>
  <button>Забронировать тур</button>
</EventTracking>
```

### Отслеживание просмотров страниц

```jsx
import { usePageView } from '../utils/SEOUtils';

const TourPage = () => {
  usePageView('/tours/baku-city-tour');
  
  return <div>Контент страницы</div>;
};
```

### A/B тестирование

```jsx
import { ABTestComponent } from '../utils/SEOUtils';

<ABTestComponent 
  testName="hero_button_color" 
  variants={['blue', 'red', 'green']}
>
  {(variant) => (
    <button className={`btn-${variant}`}>
      Заказать сейчас
    </button>
  )}
</ABTestComponent>
```

## 5. Примеры использования в страницах

### Главная страница

```jsx
import SEOHead from '../components/SEOHead';
import { LocalBusinessSchema, WebSiteSchema } from '../components/RichSnippets';

const HomePage = () => (
  <div>
    <SEOHead
      title="AutoPortBaku - Премиум транспортные услуги"
      description="Надежные трансферы, экскурсии и аренда автомобилей в Баку"
      keywords="автопорт баку, трансфер аэропорт, экскурсии азербайджан"
    />
    <LocalBusinessSchema />
    <WebSiteSchema />
    
    {/* Контент страницы */}
  </div>
);
```

### Страница тура

```jsx
import { TourDetailSEO } from '../components/SEOComponents';

const TourDetailPage = ({ tour }) => (
  <div>
    <TourDetailSEO tour={tour} />
    
    {/* Контент страницы */}
  </div>
);
```

## 6. Настройка App.jsx

Обновите ваш главный файл App.jsx:

```jsx
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AnalyticsProvider } from './components/Analytics';

function App() {
  return (
    <HelmetProvider>
      <AnalyticsProvider
        gtmId="GTM-XXXXXXX"
        gaId="G-XXXXXXXXXX"
        fbPixelId="XXXXXXXXXXXXXXXX"
        yandexId="XXXXXXXX"
      >
        {/* Ваши компоненты */}
      </AnalyticsProvider>
    </HelmetProvider>
  );
}

export default App;
```

## 7. Настройка для разных сред

Создайте файл `.env` в корне проекта:

```env
# Продакшн
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
VITE_FB_PIXEL_ID=XXXXXXXXXXXXXXXX
VITE_YANDEX_METRICA_ID=XXXXXXXX
VITE_HOTJAR_ID=XXXXXXX

# Google Search Console
VITE_GOOGLE_SITE_VERIFICATION=your-verification-code
VITE_YANDEX_VERIFICATION=your-verification-code
VITE_BING_VERIFICATION=your-verification-code
```

## 8. Что это даст для SEO:

### В поиске Google:
- **Rich Snippets**: Звездочки рейтинга, цены, FAQ
- **Knowledge Panel**: Информация о компании справа
- **Breadcrumbs**: Хлебные крошки в результатах поиска
- **Site Links**: Дополнительные ссылки под основным результатом

### Социальные сети:
- Красивые превью при публикации ссылок
- Правильные изображения и описания

### Аналитика:
- Отслеживание всех действий пользователей
- Конверсии и цели
- Тепловые карты (Hotjar)
- Детальная статистика

## 9. Следующие шаги:

1. Замените placeholder ID на реальные в Analytics компонентах
2. Добавьте реальные данные вашей компании в LocalBusinessSchema
3. Создайте качественные изображения для Open Graph (og:image)
4. Настройте Google Search Console и Yandex.Webmaster
5. Добавьте файл sitemap.xml
6. Создайте robots.txt

## 10. Дополнительные рекомендации:

- Используйте `<SEOHead>` на каждой странице с уникальными title и description
- Обновляйте структурированные данные при изменении контента
- Следите за скоростью загрузки страниц
- Регулярно проверяйте сайт в Google Search Console
- Добавьте SSL сертификат (https)

Все эти компоненты готовы к использованию и помогут значительно улучшить SEO вашего сайта!