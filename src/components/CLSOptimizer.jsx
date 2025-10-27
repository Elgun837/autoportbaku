import React, { useEffect } from 'react';

// Компонент для предотвращения Cumulative Layout Shift
const CLSOptimizer = () => {
  useEffect(() => {
    // Функция для установки размеров изображений
    const setImageDimensions = () => {
      const images = document.querySelectorAll('img:not([width]):not([height])');
      
      images.forEach((img) => {
        // Используем intersection observer для ленивых изображений
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const image = entry.target;
              
              // Устанавливаем базовые размеры для предотвращения shift
              if (!image.style.aspectRatio && !image.width && !image.height) {
                // Определяем соотношение сторон по src или data-атрибутам
                const src = image.src || image.dataset.src;
                
                if (src) {
                  // Общие соотношения для разных типов изображений
                  if (src.includes('banner') || src.includes('hero')) {
                    image.style.aspectRatio = '16/9';
                  } else if (src.includes('card') || src.includes('thumb')) {
                    image.style.aspectRatio = '4/3';
                  } else if (src.includes('avatar') || src.includes('profile')) {
                    image.style.aspectRatio = '1/1';
                  } else {
                    image.style.aspectRatio = '16/9'; // По умолчанию
                  }
                }
              }
              
              observer.unobserve(image);
            }
          });
        });
        
        observer.observe(img);
      });
    };

    // Функция для резервирования места под динамический контент
    const reserveSpaceForDynamicContent = () => {
      // Резервируем место для форм
      const forms = document.querySelectorAll('form:not([data-cls-optimized])');
      forms.forEach(form => {
        form.style.minHeight = '200px'; // Минимальная высота для форм
        form.dataset.clsOptimized = 'true';
      });

      // Резервируем место для карточек товаров/услуг
      const cards = document.querySelectorAll('.card, .service-card, .tour-card:not([data-cls-optimized])');
      cards.forEach(card => {
        card.style.minHeight = '300px';
        card.dataset.clsOptimized = 'true';
      });

      // Резервируем место для галереи
      const galleries = document.querySelectorAll('.gallery, .swiper:not([data-cls-optimized])');
      galleries.forEach(gallery => {
        gallery.style.minHeight = '400px';
        gallery.dataset.clsOptimized = 'true';
      });
    };

    // Функция для оптимизации шрифтов
    const optimizeFonts = () => {
      // Добавляем font-display: swap для всех шрифтов
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-display: swap;
        }
        
        /* Предотвращаем FOIT (Flash of Invisible Text) */
        .font-loading {
          font-display: swap;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        /* Стабильные размеры для текстовых блоков */
        h1, h2, h3, h4, h5, h6 {
          line-height: 1.2;
          margin: 0 0 1rem 0;
        }
        
        p {
          line-height: 1.6;
          margin: 0 0 1rem 0;
        }
      `;
      document.head.appendChild(style);
    };

    // Функция для стабилизации размеров контейнеров
    const stabilizeContainers = () => {
      // Контейнеры с динамическим контентом
      const dynamicContainers = document.querySelectorAll(
        '.loading, [data-loading], .async-content, .lazy-content'
      );
      
      dynamicContainers.forEach(container => {
        if (!container.style.minHeight) {
          // Устанавливаем минимальную высоту на основе типа контейнера
          const classList = container.className;
          
          if (classList.includes('header')) {
            container.style.minHeight = '80px';
          } else if (classList.includes('footer')) {
            container.style.minHeight = '200px';
          } else if (classList.includes('sidebar')) {
            container.style.minHeight = '300px';
          } else {
            container.style.minHeight = '100px';
          }
        }
      });
    };

    // Функция для оптимизации анимаций
    const optimizeAnimations = () => {
      // Добавляем contain для анимированных элементов
      const animatedElements = document.querySelectorAll(
        '[data-aos], .animated, .swiper-slide, .fade-in, .slide-in'
      );
      
      animatedElements.forEach(el => {
        el.style.contain = 'layout style paint';
        el.style.willChange = 'transform, opacity';
      });

      // Оптимизируем AOS анимации
      if (window.AOS) {
        window.AOS.init({
          once: true, // Анимация только один раз
          mirror: false, // Не повторяем при скролле назад
          anchorPlacement: 'top-bottom',
          offset: 50,
          duration: 600,
          easing: 'ease-out-cubic'
        });
      }
    };

    // Функция для мониторинга CLS
    const monitorCLS = () => {
      if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          let clsValue = 0;
          
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          
          if (clsValue > 0.1) { // Порог для "плохого" CLS
            console.warn(`⚠️ CLS detected: ${clsValue.toFixed(4)}`, {
              timestamp: Date.now(),
              url: window.location.pathname
            });
          }
        });
        
        observer.observe({ entryTypes: ['layout-shift'] });
      }
    };

    // Запускаем все оптимизации
    const runOptimizations = () => {
      setImageDimensions();
      reserveSpaceForDynamicContent();
      optimizeFonts();
      stabilizeContainers();
      optimizeAnimations();
      monitorCLS();
    };

    // Запускаем сразу и после загрузки DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
      runOptimizations();
    }

    // Повторно запускаем после полной загрузки
    window.addEventListener('load', () => {
      setTimeout(runOptimizations, 100);
    });

    // Добавляем CSS для предотвращения layout shift
    const preventShiftCSS = `
      /* Предотвращение layout shift */
      img {
        display: block;
        max-width: 100%;
        height: auto;
      }
      
      /* Стабильные размеры для media элементов */
      video, iframe, embed {
        max-width: 100%;
        height: auto;
      }
      
      /* Резервирование места для lazy-loading контента */
      .lazy-image::before {
        content: '';
        display: block;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 aspect ratio */
        background: #f0f0f0;
      }
      
      /* Стабильные размеры для кнопок и форм */
      button, input, textarea, select {
        min-height: 44px; /* Accessibility minimum */
      }
      
      /* Предотвращение shift при hover */
      a, button {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      
      a:hover, button:hover {
        transform: translateY(-1px);
      }
      
      /* Стабильные размеры для текста */
      .text-skeleton {
        background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: loading 1.5s infinite;
      }
      
      @keyframes loading {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `;

    const style = document.createElement('style');
    style.id = 'cls-optimization';
    style.textContent = preventShiftCSS;
    document.head.appendChild(style);

    // Cleanup
    return () => {
      const style = document.getElementById('cls-optimization');
      if (style) {
        style.remove();
      }
    };

  }, []);

  return null; // Невидимый компонент
};

export default CLSOptimizer;