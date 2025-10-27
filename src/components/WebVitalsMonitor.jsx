import { useEffect, useRef } from 'react';
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

// Компонент для мониторинга Core Web Vitals
const WebVitalsMonitor = ({ enabled = process.env.NODE_ENV === 'development' }) => {
  const vitalsRef = useRef({});

  useEffect(() => {
    if (!enabled) return;

    console.log('🚀 Web Vitals мониторинг запущен');

    // Функция для отправки метрик
    const sendToAnalytics = (metric) => {
      const { name, value, rating, delta } = metric;
      
      // Сохраняем в референс для доступа из девтулсов
      vitalsRef.current[name] = {
        value: Math.round(value),
        rating,
        delta: Math.round(delta),
        timestamp: Date.now()
      };

      // Логирование в консоль
      const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} ${name}: ${Math.round(value)}ms (${rating})`);

      // Отправка в аналитику (например, Google Analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', name, {
          event_category: 'Web Vitals',
          event_label: rating,
          value: Math.round(value),
          non_interaction: true,
        });
      }

      // Можно добавить отправку на собственный сервер аналитики
      if (process.env.NODE_ENV === 'production') {
        fetch('/api/analytics/web-vitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            value: Math.round(value),
            rating,
            url: window.location.pathname,
            userAgent: navigator.userAgent,
            timestamp: Date.now()
          })
        }).catch(() => {}); // Тихо игнорируем ошибки аналитики
      }
    };

    // Подписываемся на все метрики Web Vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics); // INP заменил FID в Core Web Vitals
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);

    // Добавляем глобальную функцию для доступа из консоли
    window.getWebVitals = () => {
      console.table(vitalsRef.current);
      return vitalsRef.current;
    };

    console.log('💡 Используйте window.getWebVitals() для просмотра текущих метрик');

  }, [enabled]);

  // Компонент невидимый
  return null;
};

export default WebVitalsMonitor;