import { useEffect } from 'react';

/**
 * Компонент для отложенной загрузки некритических стилей
 * Загружает gallery и animation стили только когда они нужны
 */
export default function DeferredStyles() {
  useEffect(() => {
    const loadNonCriticalCSS = () => {
      // Функция для создания preload link
      const createPreloadLink = (href, id) => {
        // Проверяем, не загружен ли уже
        if (document.getElementById(id)) return;

        const link = document.createElement('link');
        link.id = id;
        link.rel = 'preload';
        link.as = 'style';
        link.href = href;
        
        link.onload = function() {
          this.onload = null;
          this.rel = 'stylesheet';
        };

        document.head.appendChild(link);

        // Fallback для браузеров без поддержки preload
        const noscript = document.createElement('noscript');
        const fallbackLink = document.createElement('link');
        fallbackLink.rel = 'stylesheet';
        fallbackLink.href = href;
        noscript.appendChild(fallbackLink);
        document.head.appendChild(noscript);
      };

      // Определяем путь к CSS файлам из манифеста
      // В production Vite создает файлы с хешами
      const manifest = document.querySelector('link[rel="modulepreload"]');
      
      // Загружаем некритические стили
      // Эти файлы будут созданы Vite при сборке
      const deferredStyles = [
        // gallery и animation CSS будут загружены позже
        // Пути будут определены после build
      ];

      // Используем requestIdleCallback для загрузки в свободное время
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          deferredStyles.forEach(({ href, id }) => createPreloadLink(href, id));
        }, { timeout: 2000 });
      } else {
        // Fallback для браузеров без поддержки requestIdleCallback
        setTimeout(() => {
          deferredStyles.forEach(({ href, id }) => createPreloadLink(href, id));
        }, 1000);
      }
    };

    // Загружаем после полной загрузки страницы
    if (document.readyState === 'complete') {
      loadNonCriticalCSS();
    } else {
      window.addEventListener('load', loadNonCriticalCSS);
      return () => window.removeEventListener('load', loadNonCriticalCSS);
    }
  }, []);

  return null;
}
