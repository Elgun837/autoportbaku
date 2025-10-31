import { useEffect } from 'react';

/**
 * Компонент для отложенной загрузки некритических стилей
 * Загружает стили после того, как страница полностью загрузилась
 */
export default function DeferredStyles() {
  useEffect(() => {
    // Загружаем некритические стили после полной загрузки страницы
    const loadDeferredStyles = () => {
      // Список некритических стилей для отложенной загрузки
      const deferredStylesheets = [
        // Добавьте сюда пути к некритическим стилям, если они есть
        // Например: '/assets/css/non-critical.css'
      ];

      deferredStylesheets.forEach((href) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.media = 'print'; // Сначала загружаем как print
        link.onload = function() {
          this.media = 'all'; // После загрузки делаем активным
        };
        document.head.appendChild(link);
      });
    };

    // Загружаем стили после события load
    if (document.readyState === 'complete') {
      loadDeferredStyles();
    } else {
      window.addEventListener('load', loadDeferredStyles);
      return () => window.removeEventListener('load', loadDeferredStyles);
    }
  }, []);

  return null;
}
