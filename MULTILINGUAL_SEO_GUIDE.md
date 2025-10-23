# 🌐 Мультиязычные SEO компоненты - AutoPortBaku

## ✅ Обновлено для мультиязычности!

Все SEO компоненты теперь поддерживают переводы и автоматически адаптируются под выбранный язык.

## 🚀 Ключевые возможности

### 1. Автоматические переводы
- **Title, Description, Keywords** - автоматически берутся из файла переводов
- **Open Graph locale** - автоматически устанавливается в зависимости от языка
- **Хлебные крошки** - переводятся автоматически

### 2. Поддержка языков
- 🇷🇺 **Русский** (ru) - основной язык 
- 🇬🇧 **Английский** (en) - для международных клиентов
- 🇦🇿 **Азербайджанский** (az) - местный язык (можно добавить)

## 📝 Как использовать

### Базовое использование (рекомендуется):

```jsx
import SEOHead from '../components/SEOHead';

// Для главной страницы
<SEOHead pageType="homePage" />

// Для страницы туров
<SEOHead pageType="toursPage" />

// Для страницы услуг
<SEOHead pageType="servicesPage" />

// Для страницы О нас
<SEOHead pageType="aboutPage" />

// Для страницы контактов
<SEOHead pageType="contactsPage" />
```

### Кастомизация (если нужно):

```jsx
<SEOHead
  pageType="homePage"
  title="Кастомный заголовок"  // Переопределяет перевод
  description="Кастомное описание"
  ogImage="/custom-image.jpg"
/>
```

## 🗂 Структура переводов

В файле `src/translations.js` добавлена секция `seo`:

```javascript
export const translations = {
  en: {
    seo: {
      defaultTitle: "AutoPortBaku - Premium Transportation Services",
      defaultDescription: "...",
      defaultKeywords: "...",
      homePage: {
        title: "AutoPortBaku - Premium Transportation Services in Azerbaijan",
        description: "...",
        keywords: "..."
      },
      toursPage: { /* ... */ },
      servicesPage: { /* ... */ },
      aboutPage: { /* ... */ },
      contactsPage: { /* ... */ }
    },
    breadcrumbs: {
      home: "Home",
      tours: "Tours",
      services: "Services", 
      about: "About",
      contacts: "Contacts"
    }
  },
  ru: {
    seo: {
      defaultTitle: "АвтоПорт Баку - Премиум транспортные услуги",
      // ... аналогично для русского
    },
    breadcrumbs: {
      home: "Главная",
      tours: "Туры",
      services: "Услуги",
      about: "О нас", 
      contacts: "Контакты"
    }
  }
};
```

## 🎯 Автоматические функции

### Open Graph Locale
```jsx
// Автоматически устанавливается:
// ru -> og:locale="ru_RU" 
// en -> og:locale="en_US"
// az -> og:locale="az_AZ"
```

### Хлебные крошки
```jsx
// Автоматически переводятся:
const breadcrumbs = [
  { name: t('breadcrumbs.home'), url: "https://autoportbaku.com" },
  { name: t('breadcrumbs.tours'), url: "https://autoportbaku.com/tours" }
];
```

## 🛠 Обновленные компоненты

### SEOHead.jsx
- ✅ Поддерживает `pageType` параметр
- ✅ Автоматически берет переводы из context
- ✅ Fallback на дефолтные значения
- ✅ Динамический og:locale

### SEOComponents.jsx
- ✅ ToursPageSEO, ServicesPageSEO, AboutPageSEO, ContactsPageSEO
- ✅ Автоматические переводы хлебных крошек
- ✅ TourDetailSEO - поддерживает динамические title/description

### Использование в страницах:

```jsx
// HomePage.jsx
import SEOHead from '../components/SEOHead';

export default function HomePage() {
  return (
    <div>
      <SEOHead pageType="homePage" />
      {/* остальной контент */}
    </div>
  );
}

// ToursPage.jsx  
import { ToursPageSEO } from '../components/SEOComponents';

export default function ToursPage() {
  return (
    <div>
      <ToursPageSEO tours={toursData} />
      {/* остальной контент */}
    </div>
  );
}
```

## 🌟 Преимущества

1. **SEO для всех языков** - каждый язык имеет оптимизированные meta-теги
2. **Автоматизация** - не нужно помнить про переводы в каждом компоненте  
3. **Единый источник истины** - все SEO тексты в одном файле переводов
4. **Гибкость** - можно переопределить любой параметр при необходимости
5. **Локализация** - правильные og:locale для социальных сетей

## 🎉 Результат

Теперь ваш сайт AutoPortBaku будет:
- 🔍 **Лучше ранжироваться** в поисковых системах на всех языках
- 🌐 **Корректно отображаться** в социальных сетях
- 📱 **Правильно индексироваться** поисковыми роботами
- 🎯 **Привлекать целевую аудиторию** на разных языках

Просто используйте `<SEOHead pageType="pageName" />` и все остальное произойдет автоматически! 🚀