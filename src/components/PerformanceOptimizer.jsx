import React, { useEffect } from 'react';

// Комплексный компонент для оптимизации производительности
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Функция для настройки Service Worker
    const setupServiceWorker = () => {
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(registration => {
              console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
            });
        });
      }
    };

    // Функция для оптимизации ресурсов
    const optimizeResources = () => {
      // DNS prefetch для внешних доменов
      const externalDomains = [
        'https://fonts.googleapis.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ];

      externalDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = domain;
        document.head.appendChild(link);
      });

      // Preconnect для критических ресурсов
      const preconnectDomains = [
        'https://fonts.gstatic.com'
      ];

      preconnectDomains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Функция для оптимизации изображений
    const optimizeImages = () => {
      // Ленивая загрузка изображений
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              
              // Загружаем изображение
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
              
              if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
                img.removeAttribute('data-srcset');
              }
              
              img.classList.remove('lazy');
              observer.unobserve(img);
            }
          });
        }, {
          rootMargin: '50px 0px',
          threshold: 0.01
        });

        // Находим все ленивые изображения
        const lazyImages = document.querySelectorAll('img[data-src], img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
      }

      // Оптимизация формата изображений
      const images = document.querySelectorAll('img:not([data-optimized])');
      images.forEach(img => {
        // Добавляем поддержку WebP
        if (supportsWebP()) {
          const src = img.src || img.dataset.src;
          if (src && !src.includes('.webp')) {
            const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            
            // Проверяем существование WebP версии
            const testImg = new Image();
            testImg.onload = () => {
              if (img.dataset.src) {
                img.dataset.src = webpSrc;
              } else {
                img.src = webpSrc;
              }
            };
            testImg.src = webpSrc;
          }
        }
        
        img.setAttribute('data-optimized', 'true');
      });
    };

    // Проверка поддержки WebP
    const supportsWebP = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    // Функция для оптимизации шрифтов
    const optimizeFonts = () => {
      // Добавляем font-display: swap
      const fontLinks = document.querySelectorAll('link[href*="fonts"]');
      fontLinks.forEach(link => {
        if (!link.getAttribute('data-optimized')) {
          // Добавляем параметр display=swap для Google Fonts
          if (link.href.includes('fonts.googleapis.com')) {
            const url = new URL(link.href);
            url.searchParams.set('display', 'swap');
            link.href = url.toString();
          }
          link.setAttribute('data-optimized', 'true');
        }
      });

      // Локальные шрифты с font-display: swap
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    };

    // Функция для оптимизации CSS
    const optimizeCSS = () => {
      // Удаляем неиспользуемые CSS правила (критические стили остаются)
      const unusedSelectors = [
        '.unused-class',
        '.old-component',
        '.deprecated'
      ];

      unusedSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          // Можно отметить как неиспользуемый для будущей очистки
          console.log(`Unused selector: ${selector}`);
        }
      });

      // Инлайн критических стилей
      const criticalCSS = `
        /* Критические стили для первой отрисовки */
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .header { position: sticky; top: 0; z-index: 1000; }
        .loading { 
          display: flex; 
          justify-content: center; 
          align-items: center; 
          min-height: 200px; 
        }
        .lazy-image {
          background: #f0f0f0;
          display: block;
          min-height: 200px;
        }
      `;

      const criticalStyle = document.createElement('style');
      criticalStyle.id = 'critical-css';
      criticalStyle.textContent = criticalCSS;
      document.head.insertBefore(criticalStyle, document.head.firstChild);
    };

    // Функция для оптимизации JavaScript
    const optimizeJavaScript = () => {
      // Предварительная загрузка критических модулей
      const criticalModules = [
        '/src/components/Header.jsx',
        '/src/components/Footer.jsx',
        '/src/pages/HomePage.jsx'
      ];

      criticalModules.forEach(module => {
        const link = document.createElement('link');
        link.rel = 'modulepreload';
        link.href = module;
        document.head.appendChild(link);
      });

      // Ленивая загрузка аналитики
      const loadAnalytics = () => {
        // Google Analytics
        if (!window.gtag) {
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
          document.head.appendChild(script);

          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        }
      };

      // Загружаем аналитику после первого взаимодействия
      const events = ['scroll', 'click', 'touchstart', 'keydown'];
      const loadOnce = () => {
        loadAnalytics();
        events.forEach(event => {
          document.removeEventListener(event, loadOnce);
        });
      };

      events.forEach(event => {
        document.addEventListener(event, loadOnce, { 
          passive: true, 
          once: true 
        });
      });
    };

    // Функция для мониторинга производительности
    const monitorPerformance = () => {
      // Navigation Timing API
      if ('performance' in window && 'getEntriesByType' in performance) {
        window.addEventListener('load', () => {
          setTimeout(() => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const timing = {
              dns: navigation.domainLookupEnd - navigation.domainLookupStart,
              tcp: navigation.connectEnd - navigation.connectStart,
              ttfb: navigation.responseStart - navigation.requestStart,
              download: navigation.responseEnd - navigation.responseStart,
              domProcessing: navigation.domContentLoadedEventEnd - navigation.responseEnd,
              total: navigation.loadEventEnd - navigation.navigationStart
            };

            console.log('⚡ Performance Timing:', timing);

            // Отправляем метрики в аналитику
            if (window.gtag) {
              Object.entries(timing).forEach(([key, value]) => {
                gtag('event', 'timing_complete', {
                  name: key,
                  value: Math.round(value)
                });
              });
            }
          }, 1000);
        });
      }

      // Resource Timing API
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const slowResources = entries.filter(entry => entry.duration > 1000);
          
          if (slowResources.length > 0) {
            console.warn('🐌 Slow resources detected:', slowResources);
          }
        });

        observer.observe({ entryTypes: ['resource'] });
      }
    };

    // Функция для оптимизации памяти
    const optimizeMemory = () => {
      // Очистка неиспользуемых объектов
      const cleanup = () => {
        // Очищаем кэш изображений
        const images = document.querySelectorAll('img');
        images.forEach(img => {
          if (!img.isConnected) {
            img.src = '';
            img.removeAttribute('src');
          }
        });

        // Очищаем неактивные слушатели
        if (window.gc) {
          window.gc();
        }
      };

      // Очистка каждые 5 минут
      setInterval(cleanup, 5 * 60 * 1000);

      // Очистка при скрытии страницы
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          cleanup();
        }
      });
    };

    // Запускаем все оптимизации
    const runOptimizations = () => {
      setupServiceWorker();
      optimizeResources();
      optimizeImages();
      optimizeFonts();
      optimizeCSS();
      optimizeJavaScript();
      monitorPerformance();
      optimizeMemory();
    };

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
      runOptimizations();
    }

    // Cleanup
    return () => {
      // Очищаем созданные элементы при размонтировании
      const criticalStyle = document.getElementById('critical-css');
      if (criticalStyle) {
        criticalStyle.remove();
      }
    };

  }, []);

  return null; // Невидимый компонент
};

export default PerformanceOptimizer;