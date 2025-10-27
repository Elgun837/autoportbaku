import React, { useEffect } from 'react';

// Компонент для оптимизации First Input Delay
const FIDOptimizer = () => {
  useEffect(() => {
    // Функция для разбивки длительных задач
    const scheduleWork = (callback) => {
      if ('scheduler' in window && 'postTask' in window.scheduler) {
        // Используем новый API планировщика
        window.scheduler.postTask(callback, { priority: 'user-blocking' });
      } else if ('requestIdleCallback' in window) {
        // Используем requestIdleCallback
        window.requestIdleCallback(callback, { timeout: 50 });
      } else {
        // Fallback на setTimeout
        setTimeout(callback, 0);
      }
    };

    // Функция для дебаунса событий
    const debounce = (func, wait) => {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    // Функция для троттлинга событий
    const throttle = (func, limit) => {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };

    // Оптимизация обработчиков событий
    const optimizeEventHandlers = () => {
      // Находим все интерактивные элементы
      const interactiveElements = document.querySelectorAll(
        'button, input, textarea, select, a[href], [tabindex], [onclick]'
      );

      interactiveElements.forEach(element => {
        // Добавляем passive listeners где возможно
        const events = ['touchstart', 'touchmove', 'wheel', 'scroll'];
        
        events.forEach(eventType => {
          const existingListeners = element.getAttribute(`data-${eventType}-optimized`);
          
          if (!existingListeners) {
            // Добавляем пассивный слушатель
            element.addEventListener(eventType, () => {}, { passive: true });
            element.setAttribute(`data-${eventType}-optimized`, 'true');
          }
        });

        // Оптимизируем click handlers
        if (element.onclick || element.dataset.onclick) {
          const originalHandler = element.onclick;
          
          element.onclick = (e) => {
            scheduleWork(() => {
              if (originalHandler) {
                originalHandler.call(element, e);
              }
            });
          };
        }
      });
    };

    // Предварительная загрузка критических ресурсов
    const preloadCriticalResources = () => {
      // Предзагружаем шрифты
      const criticalFonts = [
        '/fonts/main-font.woff2',
        '/fonts/heading-font.woff2'
      ];

      criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Предзагружаем критические изображения
      const criticalImages = document.querySelectorAll('img[data-critical]');
      criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = img.src || img.dataset.src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Ленивая инициализация компонентов
    const lazyInitializeComponents = () => {
      // Ленивая инициализация слайдеров
      const sliders = document.querySelectorAll('.swiper:not(.swiper-initialized)');
      
      const initSlider = (slider) => {
        if (window.Swiper && !slider.classList.contains('swiper-initialized')) {
          scheduleWork(() => {
            new window.Swiper(slider, {
              lazy: true,
              preloadImages: false,
              watchSlidesProgress: true,
              watchSlidesVisibility: true,
            });
          });
        }
      };

      // Инициализируем слайдеры только при скролле до них
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            initSlider(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '50px' });

      sliders.forEach(slider => observer.observe(slider));

      // Ленивая инициализация форм
      const forms = document.querySelectorAll('form:not([data-initialized])');
      forms.forEach(form => {
        const initializeForm = () => {
          scheduleWork(() => {
            // Инициализация валидации формы
            const inputs = form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
              input.addEventListener('blur', debounce((e) => {
                // Валидация при потере фокуса
                validateInput(e.target);
              }, 300));
            });

            form.setAttribute('data-initialized', 'true');
          });
        };

        // Инициализируем форму при первом фокусе
        form.addEventListener('focusin', initializeForm, { once: true });
      });
    };

    // Функция валидации инпута
    const validateInput = (input) => {
      const value = input.value.trim();
      const type = input.type;
      
      // Простая валидация без блокировки главного потока
      scheduleWork(() => {
        let isValid = true;
        let message = '';

        switch (type) {
          case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            message = isValid ? '' : 'Неверный формат email';
            break;
          case 'tel':
            isValid = /^[\+]?[0-9\s\-\(\)]{10,}$/.test(value);
            message = isValid ? '' : 'Неверный формат телефона';
            break;
          default:
            isValid = value.length > 0;
            message = isValid ? '' : 'Поле обязательно для заполнения';
        }

        // Показываем результат валидации
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
          errorElement.textContent = message;
          errorElement.style.display = message ? 'block' : 'none';
        }

        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid && value.length > 0);
      });
    };

    // Оптимизация анимаций для быстрого отклика
    const optimizeAnimations = () => {
      // Отключаем анимации на медленных устройствах
      const isSlowDevice = navigator.hardwareConcurrency < 4 || 
                          navigator.deviceMemory < 4;

      if (isSlowDevice) {
        const style = document.createElement('style');
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-delay: 0.01ms !important;
            transition-duration: 0.01ms !important;
            transition-delay: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }

      // Оптимизируем CSS анимации
      const animatedElements = document.querySelectorAll('[data-aos], .animated');
      animatedElements.forEach(el => {
        // Используем transform вместо изменения layout свойств
        el.style.willChange = 'transform, opacity';
        el.style.transform = 'translateZ(0)'; // Форсируем аппаратное ускорение
      });
    };

    // Мониторинг FID
    const monitorFID = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.processingStart && entry.startTime) {
              const fid = entry.processingStart - entry.startTime;
              
              if (fid > 100) { // Порог для "плохого" FID
                console.warn(`⚠️ High FID detected: ${fid.toFixed(2)}ms`, {
                  eventType: entry.name,
                  timestamp: entry.startTime,
                  url: window.location.pathname
                });
              }
            }
          }
        });

        observer.observe({ entryTypes: ['first-input'] });
      }
    };

    // Оптимизация загрузки JavaScript
    const optimizeJavaScript = () => {
      // Ленивая загрузка неважных скриптов
      const lazyScripts = document.querySelectorAll('script[data-lazy]');
      
      lazyScripts.forEach(script => {
        const newScript = document.createElement('script');
        newScript.src = script.dataset.src || script.src;
        newScript.async = true;
        
        // Загружаем скрипт после первого взаимодействия
        const loadScript = () => {
          document.head.appendChild(newScript);
          document.removeEventListener('click', loadScript);
          document.removeEventListener('scroll', loadScript);
          document.removeEventListener('keydown', loadScript);
        };

        document.addEventListener('click', loadScript, { once: true });
        document.addEventListener('scroll', loadScript, { once: true, passive: true });
        document.addEventListener('keydown', loadScript, { once: true });
      });
    };

    // Разбиение длительных задач
    const breakUpLongTasks = () => {
      // Перехватываем setTimeout для длительных задач
      const originalSetTimeout = window.setTimeout;
      
      window.setTimeout = function(callback, delay, ...args) {
        if (delay === 0 || delay === undefined) {
          // Разбиваем задачу на части
          return originalSetTimeout(() => {
            scheduleWork(() => callback.apply(this, args));
          }, 0);
        }
        return originalSetTimeout(callback, delay, ...args);
      };
    };

    // Запускаем все оптимизации
    const runOptimizations = () => {
      optimizeEventHandlers();
      preloadCriticalResources();
      lazyInitializeComponents();
      optimizeAnimations();
      monitorFID();
      optimizeJavaScript();
      breakUpLongTasks();
    };

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
      runOptimizations();
    }

    // Добавляем CSS для улучшения отзывчивости
    const responsiveCSS = `
      /* Улучшение отзывчивости интерфейса */
      button, a, input, textarea, select {
        touch-action: manipulation;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
      }
      
      input, textarea {
        user-select: text;
        -webkit-user-select: text;
      }
      
      /* Быстрая обратная связь для кликов */
      button:active, a:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
      
      /* Оптимизация для сенсорных устройств */
      @media (pointer: coarse) {
        button, a {
          min-height: 44px;
          min-width: 44px;
        }
      }
      
      /* Отключение hover на сенсорных устройствах */
      @media (hover: none) {
        *:hover {
          background-color: initial !important;
          color: initial !important;
        }
      }
    `;

    const style = document.createElement('style');
    style.id = 'fid-optimization';
    style.textContent = responsiveCSS;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      const style = document.getElementById('fid-optimization');
      if (style) {
        style.remove();
      }
    };

  }, []);

  return null; // Невидимый компонент
};

export default FIDOptimizer;