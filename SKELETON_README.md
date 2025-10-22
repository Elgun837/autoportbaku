# Skeleton Loading Implementation

## Обзор

Реализована система skeleton loading для компонентов баннеров на сайте:
- `Slide.jsx` - главный слайд на домашней странице
- `Page_big_banner.jsx` - большой баннер для страниц
- `Page_small_banner.jsx` - маленький баннер для страниц

Это улучшает пользовательский опыт за счет показа анимированных заглушек во время загрузки контента.

## Установленные зависимости

- `react-loading-skeleton` - библиотека для создания skeleton loading эффектов

## Структура файлов

```
src/
├── components/
│   ├── Slide.jsx                    # Основной компонент слайда
│   ├── SkeletonSlide.jsx           # Skeleton версия слайда
│   ├── Page_big_banner.jsx         # Большой баннер
│   ├── SkeletonPageBigBanner.jsx   # Skeleton большого баннера
│   ├── Page_small_banner.jsx       # Маленький баннер
│   └── SkeletonPageSmallBanner.jsx # Skeleton маленького баннера
├── hooks/
│   └── useImageLoading.js          # Хук для управления загрузкой изображений
├── config/
│   └── skeletonConfig.js           # Конфигурация skeleton loading
├── utils/
│   └── skeletonUtils.js            # Утилиты для skeleton компонентов
└── assets/styles/
    ├── Slide.scss                  # Стили слайда включая skeleton
    └── Page_banners.scss           # Стили баннеров включая skeleton
```

## Основные компоненты

### 1. Skeleton компоненты
- **SkeletonSlide.jsx** - для главного слайда с формой
- **SkeletonPageBigBanner.jsx** - для больших баннеров страниц
- **SkeletonPageSmallBanner.jsx** - для маленьких баннеров страниц

Каждый skeleton компонент:
- Отображает skeleton для фонового изображения
- Показывает skeleton для заголовка и подзаголовка
- Сохраняет оригинальную структуру компонента
- Включает skeleton для декоративных элементов

### 2. useImageLoading.js
Кастомный хук для управления состоянием загрузки:
- Предварительная загрузка изображений
- Контроль минимального времени показа skeleton
- Fallback timeout для медленных соединений
- Обработка ошибок загрузки

### 3. skeletonConfig.js
Централизованная конфигурация с настройками для разных типов баннеров:
- **slide**: Главный слайд (minLoadingTime: 1000ms, titleHeight: 60px)
- **big**: Большой баннер (minLoadingTime: 800ms, titleHeight: 72px)  
- **small**: Маленький баннер (minLoadingTime: 700ms, titleHeight: 50px)

### 4. skeletonUtils.js
Утилиты для работы с skeleton компонентами:
- `getBannerSkeletonConfig()` - получение настроек по типу баннера
- `createSkeletonStyles()` - создание стилей для skeleton элементов
- `detectBannerType()` - автоматическое определение типа баннера

## Как это работает

1. При загрузке любого баннера компонента показывается соответствующий skeleton
2. В фоне происходит предварительная загрузка изображения через `useImageLoading`
3. Каждый тип баннера имеет свои настройки времени и размеров из конфигурации
4. После загрузки изображения и выполнения минимального времени показа skeleton происходит плавный переход к основному контенту
5. Основной контент появляется с fade-in анимацией

## Настройка

Все настройки можно изменить в файле `src/config/skeletonConfig.js`:

```javascript
export const SKELETON_CONFIG = {
  colors: {
    baseColor: '#e2e8f0',        // Базовый цвет skeleton
    highlightColor: '#f8fafc',   // Цвет подсветки
  },
  bannerTypes: {
    slide: {
      titleHeight: 60,
      minLoadingTime: 1000,      // Настройки для главного слайда
    },
    big: {
      titleHeight: 72,
      minLoadingTime: 800,       // Настройки для большого баннера
    },
    small: {
      titleHeight: 50,
      minLoadingTime: 700,       // Настройки для маленького баннера
    }
  }
  // ... другие настройки
};
```

## Использование в других компонентах

Хук `useImageLoading` можно использовать в любых компонентах:

```jsx
import useImageLoading from '../hooks/useImageLoading';
import { SKELETON_CONFIG } from '../config/skeletonConfig';

function MyComponent() {
  const config = SKELETON_CONFIG.bannerTypes.big;
  const { isLoading, imageLoaded } = useImageLoading(
    '/path/to/image.jpg',
    config.minLoadingTime,
    config.maxLoadingTime
  );
  
  if (isLoading) {
    return <MySkeleton />;
  }
  
  return <MyContent />;
}
```

## Реализованные компоненты

### ✅ Slide.jsx
- Skeleton для фонового изображения
- Skeleton для заголовка и подзаголовка  
- Skeleton для многошаговой формы
- Плавные переходы и анимации

### ✅ Page_big_banner.jsx
- Skeleton для фонового изображения
- Skeleton для крупного заголовка (72px)
- Skeleton для подзаголовка (28px)
- Быстрая загрузка (800ms мин.)

### ✅ Page_small_banner.jsx  
- Skeleton для фонового изображения
- Skeleton для заголовка (50px)
- Skeleton для подзаголовка (20px)
- Очень быстрая загрузка (700ms мин.)

## Преимущества

- ✅ Улучшенный UX за счет показа skeleton вместо белого экрана
- ✅ Плавные переходы между состояниями загрузки
- ✅ Предотвращение скачков макета (layout shift)
- ✅ Настраиваемая система через конфигурационный файл
- ✅ Переиспользуемые компоненты и хуки
- ✅ Обработка ошибок загрузки изображений
- ✅ Адаптивные настройки для разных типов баннеров
- ✅ Централизованное управление конфигурацией

## Тестирование

Для тестирования skeleton loading:
1. Запустите dev сервер: `npm run dev`
2. Откройте браузер на `http://localhost:5174`
3. Обновите страницу или используйте медленное соединение в Developer Tools
4. Перейдите на разные страницы для тестирования разных типов баннеров