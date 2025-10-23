// Дополнительные полезные SEO хуки и утилиты

import React, { useState, useEffect } from 'react';

// Хук для динамического изменения title страницы
export const usePageTitle = (title) => {
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = title;
    }
  }, [title]);
};

// Хук для отслеживания просмотров страниц
export const usePageView = (path) => {
  useEffect(() => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: path,
      });
    }
    
    // Yandex Metrica
    if (window.ym) {
      window.ym('COUNTER_ID', 'hit', path);
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [path]);
};

// Компонент для событий E-commerce
export const EcommerceTracking = ({ event, eventData }) => {
  useEffect(() => {
    if (event && eventData) {
      // Google Analytics 4 Enhanced Ecommerce
      if (window.gtag) {
        window.gtag('event', event, eventData);
      }
      
      // Facebook Pixel события
      if (window.fbq && event === 'purchase') {
        window.fbq('track', 'Purchase', {
          value: eventData.value,
          currency: eventData.currency || 'AZN'
        });
      }
    }
  }, [event, eventData]);
  
  return null;
};

// Компонент для отслеживания скроллинга
export const ScrollTracking = () => {
  useEffect(() => {
    let scrollDepth = 0;
    const trackScrollDepth = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > scrollDepth && scrollPercent % 25 === 0) {
        scrollDepth = scrollPercent;
        
        // Отправляем событие в GA4
        if (window.gtag) {
          window.gtag('event', 'scroll', {
            scroll_depth: scrollPercent
          });
        }
      }
    };
    
    window.addEventListener('scroll', trackScrollDepth);
    return () => window.removeEventListener('scroll', trackScrollDepth);
  }, []);
  
  return null;
};

// Компонент для отслеживания времени на странице
export const TimeOnPageTracking = () => {
  useEffect(() => {
    const startTime = Date.now();
    
    const sendTimeOnPage = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (window.gtag && timeOnPage > 10) { // Отправляем только если больше 10 секунд
        window.gtag('event', 'time_on_page', {
          value: timeOnPage,
          event_category: 'engagement'
        });
      }
    };
    
    // Отправляем при уходе со страницы
    window.addEventListener('beforeunload', sendTimeOnPage);
    
    return () => {
      window.removeEventListener('beforeunload', sendTimeOnPage);
      sendTimeOnPage(); // Отправляем при размонтировании компонента
    };
  }, []);
  
  return null;
};

// Utility для генерации хлебных крошек
export const generateBreadcrumbs = (path, baseUrl = 'https://autoportbaku.com') => {
  const pathSegments = path.split('/').filter(segment => segment);
  const breadcrumbs = [{ name: 'Главная', url: baseUrl }];
  
  let currentPath = baseUrl;
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = segment.charAt(0).toUpperCase() + segment.slice(1);
    breadcrumbs.push({ name, url: currentPath });
  });
  
  return breadcrumbs;
};

// Компонент для отзывов с микроразметкой
export const ReviewSnippet = ({ review }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !review) return;

    const reviewSchema = {
      "@context": "https://schema.org",
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.authorName
      },
      "datePublished": review.date,
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5"
      },
      "itemReviewed": {
        "@type": "Organization", 
        "name": "AutoPortBaku"
      }
    };

    // Удаляем предыдущий script, если есть
    const existingScript = document.querySelector(`script[data-id="review-${review.id}"]`);
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', `review-${review.id}`);
    script.textContent = JSON.stringify(reviewSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(`script[data-id="review-${review.id}"]`);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [review]);
  
  return (
    <div className="review-item">
      <div className="review-content">
        <div className="review-author">{review.authorName}</div>
        <div className="review-rating">
          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
        </div>
        <div className="review-text">{review.text}</div>
        <div className="review-date">{review.date}</div>
      </div>
    </div>
  );
};

// Компонент для событий на сайте
export const EventTracking = ({ eventName, eventData, children, triggerOn = 'click' }) => {
  const handleEvent = () => {
    // Google Analytics 4
    if (window.gtag) {
      window.gtag('event', eventName, eventData);
    }
    
    // Yandex Metrica
    if (window.ym) {
      window.ym('COUNTER_ID', 'reachGoal', eventName, eventData);
    }
    
    // Facebook Pixel
    if (window.fbq) {
      window.fbq('trackCustom', eventName, eventData);
    }
  };
  
  const eventProps = {
    [triggerOn === 'click' ? 'onClick' : `on${triggerOn.charAt(0).toUpperCase() + triggerOn.slice(1)}`]: handleEvent
  };
  
  return React.cloneElement(children, eventProps);
};

// Компонент для A/B тестирования
export const ABTestComponent = ({ testName, variants, children }) => {
  const [variant, setVariant] = useState(null);
  
  useEffect(() => {
    // Получаем вариант из localStorage или генерируем новый
    let savedVariant = localStorage.getItem(`ab_test_${testName}`);
    
    if (!savedVariant) {
      savedVariant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem(`ab_test_${testName}`, savedVariant);
    }
    
    setVariant(savedVariant);
    
    // Отправляем событие в аналитику
    if (window.gtag) {
      window.gtag('event', 'ab_test_view', {
        test_name: testName,
        variant: savedVariant
      });
    }
  }, [testName, variants]);
  
  if (!variant) return null;
  
  return children(variant);
};

export default {
  usePageTitle,
  usePageView,
  EcommerceTracking,
  ScrollTracking,
  TimeOnPageTracking,
  generateBreadcrumbs,
  ReviewSnippet,
  EventTracking,
  ABTestComponent
};