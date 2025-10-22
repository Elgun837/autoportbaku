# Skeleton Loading Implementation

## Обзор

Реализована система skeleton loading для основных компонентов сайта:
- `Header.jsx` - навигационный хедер с логотипом и меню
- `Slide.jsx` - главный слайд на домашней странице
- `Page_big_banner.jsx` - большой баннер для страниц
- `Page_small_banner.jsx` - маленький баннер для страниц

Это улучшает пользовательский опыт за счет показа анимированных заглушек во время загрузки контента и данных из API.

## Установленные зависимости

- `react-loading-skeleton` - библиотека для создания skeleton loading эффектов

## Структура файлов

```
src/
├── components/
│   ├── Header.jsx                   # Навигационный хедер
│   ├── SkeletonHeader.jsx          # Skeleton версия хедера
│   ├── Slide.jsx                    # Основной компонент слайда
│   ├── SkeletonSlide.jsx           # Skeleton версия слайда
│   ├── Page_big_banner.jsx         # Большой баннер
│   ├── SkeletonPageBigBanner.jsx   # Skeleton большого баннера
│   ├── Page_small_banner.jsx       # Маленький баннер
│   ├── SkeletonPageSmallBanner.jsx # Skeleton маленького баннера
│   └── SkeletonDemo.jsx            # Демо компонент для тестирования
├── hooks/
│   ├── useImageLoading.js          # Хук для управления загрузкой изображений
│   └── useHeaderData.js            # Хук для управления данными хедера
├── config/
│   └── skeletonConfig.js           # Конфигурация skeleton loading
├── utils/
│   └── skeletonUtils.js            # Утилиты для skeleton компонентов
└── assets/styles/
    ├── Header.scss                 # Стили хедера включая skeleton
    ├── Slide.scss                  # Стили слайда включая skeleton
    └── Page_banners.scss           # Стили баннеров включая skeleton
```

## Основные компоненты

### 1. Skeleton компоненты
- **SkeletonHeader.jsx** - для навигационного хедера с логотипом, меню и языковым переключателем
- **SkeletonSlide.jsx** - для главного слайда с формой
- **SkeletonPageBigBanner.jsx** - для больших баннеров страниц
- **SkeletonPageSmallBanner.jsx** - для маленьких баннеров страниц

Каждый skeleton компонент:
- Отображает skeleton элементы в точном соответствии с оригинальной структурой
- Поддерживает responsive поведение
- Включает специальные стили для home/внутренних страниц
- Сохраняет все классы и структуру CSS

### 2. useHeaderData.js
Кастомный хук для управления данными хедера:
- Загрузка туров и сервисов из API
- Контроль состояния загрузки с минимальным временем показа skeleton
- Возможность отключения skeleton loading
- Обработка ошибок API запросов

### 3. useImageLoading.js
Кастомный хук для управления состоянием загрузки изображений:
- Предварительная загрузка изображений
- Контроль минимального времени показа skeleton
- Fallback timeout для медленных соединений
- Обработка ошибок загрузки

### 4. skeletonConfig.js
Централизованная конфигурация с настройками для разных типов компонентов:
- **header**: Быстрая загрузка (500-1500ms), настройки для логотипа и навигации
- **slide**: Средняя загрузка (1000-3000ms), настройки для формы и текста
- **big**: Большой баннер (800-2500ms, titleHeight: 72px)  
- **small**: Маленький баннер (700-2000ms, titleHeight: 50px)

## Как это работает

### Header Skeleton Loading:
1. При загрузке хедера показывается `SkeletonHeader`
2. В фоне происходит загрузка данных туров и сервисов через API
3. Skeleton отображается минимум 500ms для плавности UX
4. После загрузки данных происходит переход к реальному хедеру с fade-in анимацией

### Banner Skeleton Loading:
1. При загрузке любого баннера показывается соответствующий skeleton
2. В фоне происходит предварительная загрузка изображения
3. Каждый тип баннера имеет свои настройки времени и размеров
4. После загрузки происходит плавный переход к основному контенту

## Настройка

Все настройки можно изменить в файле `src/config/skeletonConfig.js`:

```javascript
export const SKELETON_CONFIG = {
  colors: {
    baseColor: '#d5dce6',        // Базовый цвет skeleton
    highlightColor: '#f8fafc',   // Цвет подсветки
  },
  header: {
    logoWidth: '310px',
    logoHeight: '60px',
    minLoadingTime: 500,         // Настройки для хедера
    maxLoadingTime: 1500,
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

## Использование хуков

### useHeaderData для компонентов с API данными:
```jsx
import useHeaderData from '../hooks/useHeaderData';

function MyHeaderComponent() {
  const { isLoading, tours, services } = useHeaderData(lang);
  
  if (isLoading) {
    return <MySkeletonHeader />;
  }
  
  return <MyHeaderContent tours={tours} services={services} />;
}
```

### useImageLoading для компонентов с изображениями:
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

### ✅ Header.jsx
- Skeleton для логотипа (310x60px)
- Skeleton для навигационных ссылок (Home, About, Services, Tours, Contact)
- Skeleton для выпадающих стрелок в dropdown меню
- Skeleton для переключателя языка
- Skeleton для мобильной кнопки меню
- Адаптивное поведение для desktop/mobile
- Специальные стили для home/внутренних страниц

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

## Особенности реализации

### Адаптивность:
- Desktop версии показывают полную навигацию
- Mobile версии показывают только логотип и кнопку меню
- Skeleton элементы адаптируются под размер экрана

### Производительность:
- Минимальное время показа для предотвращения мерцания
- Предварительная загрузка изображений
- Оптимизированные API запросы
- Fallback таймауты для медленных соединений

### UX улучшения:
- Skeleton элементы точно повторяют структуру оригинала
- Плавные fade-in анимации при переходах
- Разные цвета для home/внутренних страниц
- Shimmer эффекты для более живого вида

## Преимущества

- ✅ Улучшенный UX за счет показа skeleton вместо белого экрана
- ✅ Плавные переходы между состояниями загрузки
- ✅ Предотвращение скачков макета (layout shift)
- ✅ Настраиваемая система через конфигурационный файл
- ✅ Переиспользуемые компоненты и хуки
- ✅ Обработка ошибок загрузки изображений и API
- ✅ Адаптивные настройки для разных типов компонентов
- ✅ Централизованное управление конфигурацией
- ✅ Поддержка как загрузки изображений, так и API данных

## Тестирование

Для тестирования skeleton loading:
1. Запустите dev сервер: `npm run dev`
2. Откройте браузер на `http://localhost:5174`
3. Используйте компонент `SkeletonDemo.jsx` для интерактивного тестирования
4. Откройте Developer Tools → Network → поставьте "Slow 3G" для имитации медленного соединения
5. Обновите страницу, чтобы увидеть skeleton loading в действии
6. Перейдите на разные страницы для тестирования разных типов компонентов