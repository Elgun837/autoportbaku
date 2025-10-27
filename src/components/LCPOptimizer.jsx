import React, { useEffect, useState } from 'react';

// Компонент для оптимизации LCP через preloading критических ресурсов
const LCPOptimizer = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Preload критических шрифтов
    const preloadFont = (href, type = 'font/woff2') => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = type;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    };

    // Preload критических изображений
    const preloadImage = (href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'image';
      document.head.appendChild(link);
    };

    // Preload критических CSS
    const preloadCSS = (href) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'style';
      link.onload = () => {
        link.rel = 'stylesheet';
      };
      document.head.appendChild(link);
    };

    // Определяем критические ресурсы для текущей страницы
    const currentPath = window.location.pathname;
    
    // Всегда preload основные шрифты
    preloadFont('/src/assets/fonts/Bitter-Regular.woff2');
    preloadFont('/src/assets/fonts/Bitter-Medium.woff2');
    
    // Preload изображений в зависимости от страницы
    if (currentPath === '/' || currentPath === '/index.html') {
      // Главная страница - preload hero изображения
      preloadImage('/src/assets/images/hero-bg.webp');
      preloadImage('/src/assets/images/cars/car-hero.webp');
    } else if (currentPath.includes('/about')) {
      // Страница О нас
      preloadImage('/src/assets/images/about_us/banner_imge_about.webp');
    } else if (currentPath.includes('/tours')) {
      // Страница туров
      preloadImage('/src/assets/images/tours.webp');
    } else if (currentPath.includes('/contacts')) {
      // Страница контактов
      preloadImage('/src/assets/images/contacts.webp');
    }

    // Оптимизация LCP через подсказки браузеру
    const optimizeLCP = () => {
      // Устанавливаем размеры изображений для предотвращения layout shift
      const images = document.querySelectorAll('img[data-lcp-candidate]');
      images.forEach(img => {
        if (!img.width || !img.height) {
          // Устанавливаем соотношение сторон для предотвращения CLS
          img.style.aspectRatio = '16/9'; // Можно настроить для каждого изображения
        }
      });

      // Принудительный composite layer для анимированных элементов
      const animatedElements = document.querySelectorAll('[data-aos], .swiper-slide, .animated');
      animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
    };

    // Запускаем оптимизацию после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', optimizeLCP);
    } else {
      optimizeLCP();
    }

    // Resource hints для улучшения производительности
    const addResourceHints = () => {
      // DNS prefetch для внешних ресурсов
      const dnsPrefetch = [
        'https://fonts.googleapis.com',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com'
      ];

      dnsPrefetch.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Preconnect для критических внешних ресурсов
      const preconnect = [
        'https://fonts.gstatic.com'
      ];

      preconnect.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    addResourceHints();

    // Оптимизация загрузки видео для уменьшения влияния на LCP
    const optimizeVideo = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Отложенная загрузка видео
        video.preload = 'none';
        
        // Загружаем видео только при взаимодействии или когда оно в области видимости
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              video.preload = 'metadata';
              observer.unobserve(video);
            }
          });
        });
        
        observer.observe(video);
      });
    };

    // Запускаем оптимизацию видео
    setTimeout(optimizeVideo, 100);

  }, []);

  // Критический CSS инлайн
  useEffect(() => {
    if (!isClient) return;

    // Добавляем критический CSS для выше-the-fold контента
    const criticalCSS = `
      /* Критические стили для быстрого рендеринга */
      .hero-section, .page-banner, .main-header {
        contain: layout style paint;
      }
      
      /* Оптимизация шрифтов */
      .font-display-swap {
        font-display: swap;
      }
      
      /* Предотвращение layout shift */
      img, video {
        max-width: 100%;
        height: auto;
      }
      
      /* Оптимизация анимаций */
      .will-change-transform {
        will-change: transform;
      }
      
      /* Скрытие некритического контента до загрузки */
      .below-fold {
        content-visibility: auto;
        contain-intrinsic-size: 200px;
      }
    `;

    const style = document.createElement('style');
    style.id = 'lcp-optimization';
    style.textContent = criticalCSS;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById('lcp-optimization');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isClient]);

  return null; // Компонент невидимый
};

export default LCPOptimizer;