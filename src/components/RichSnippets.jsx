import { useEffect } from 'react';

// Компонент для FAQ страницы с разметкой FAQ Schema
const FAQPageSEO = ({ faqs }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !faqs) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": "Часто задаваемые вопросы - AutoPortBaku",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    // Удаляем предыдущий script, если есть
    const existingScript = document.querySelector('script[data-id="faq-schema"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', 'faq-schema');
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-id="faq-schema"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);

  return null;
};

// Локальный бизнес для Google My Business
const LocalBusinessSchema = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "AutoPortBaku",
      "description": "Премиум транспортные услуги в Баку и по всему Азербайджану",
      "url": "https://autoportbaku.com",
      "telephone": "+994-50-123-45-67",
      "email": "info@autoportbaku.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ваш адрес",
        "addressLocality": "Baku",
        "addressCountry": "AZ",
        "postalCode": "AZ1000"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "40.4093",
        "longitude": "49.8671"
      },
      "openingHours": "Mo-Su 00:00-24:00",
      "priceRange": "$$",
      "servedCuisine": null,
      "acceptsReservations": true,
      "currenciesAccepted": "AZN, USD, EUR",
      "paymentAccepted": "Cash, Credit Card, Bank Transfer",
      "sameAs": [
        "https://www.facebook.com/autoportbaku",
        "https://www.instagram.com/autoportbaku",
        "https://t.me/autoportbaku"
      ],
      "hasMap": "https://maps.google.com/?q=AutoPortBaku",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Удаляем предыдущий script, если есть
    const existingScript = document.querySelector('script[data-id="local-business-schema"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', 'local-business-schema');
    script.textContent = JSON.stringify(localBusinessSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-id="local-business-schema"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

// Схема для отзывов
const ReviewsSchema = ({ reviews }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !reviews) return;

    reviews.forEach((review, index) => {
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
          "bestRating": "5",
          "worstRating": "1"
        },
        "itemReviewed": {
          "@type": "Organization",
          "name": "AutoPortBaku"
        }
      };

      // Удаляем предыдущий script с таким же индексом
      const existingScript = document.querySelector(`script[data-id="review-schema-${index}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-id', `review-schema-${index}`);
      script.textContent = JSON.stringify(reviewSchema);
      document.head.appendChild(script);
    });

    return () => {
      reviews.forEach((_, index) => {
        const scriptToRemove = document.querySelector(`script[data-id="review-schema-${index}"]`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      });
    };
  }, [reviews]);

  return null;
};

// Схема для автомобилей (Vehicle Schema)
const VehicleSchema = ({ vehicles }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !vehicles) return;

    const vehicleSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Автопарк AutoPortBaku",
      "description": "Современный автопарк для комфортных поездок",
      "itemListElement": vehicles.map((vehicle, index) => ({
        "@type": "Vehicle",
        "position": index + 1,
        "name": vehicle.model,
        "manufacturer": vehicle.brand,
        "vehicleConfiguration": vehicle.type,
        "numberOfSeats": vehicle.seats,
        "fuelType": vehicle.fuelType || "Gasoline",
        "image": vehicle.image,
        "offers": {
          "@type": "Offer",
          "price": vehicle.pricePerDay,
          "priceCurrency": "AZN",
          "availability": "https://schema.org/InStock"
        }
      }))
    };

    // Удаляем предыдущий script, если есть
    const existingScript = document.querySelector('script[data-id="vehicle-schema"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', 'vehicle-schema');
    script.textContent = JSON.stringify(vehicleSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-id="vehicle-schema"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [vehicles]);

  return null;
};

// WebSite Schema для поиска на сайте
const WebSiteSchema = () => {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "AutoPortBaku",
      "url": "https://autoportbaku.com",
      "description": "Премиум транспортные услуги в Азербайджане",
      "publisher": {
        "@type": "Organization",
        "name": "AutoPortBaku"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://autoportbaku.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "inLanguage": ["ru", "az", "en"]
    };

    // Удаляем предыдущий script, если есть
    const existingScript = document.querySelector('script[data-id="website-schema"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', 'website-schema');
    script.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector('script[data-id="website-schema"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

// Rich Snippets для цен и услуг
const PriceRangeSchema = ({ services }) => {
  useEffect(() => {
    if (typeof document === 'undefined' || !services) return;

    services.forEach((service, index) => {
      const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
          "@type": "Organization",
          "name": "AutoPortBaku"
        },
        "offers": {
          "@type": "Offer",
          "price": service.price,
          "priceCurrency": "AZN",
          "availability": "https://schema.org/InStock",
          "validThrough": "2025-12-31"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Azerbaijan"
        }
      };

      // Удаляем предыдущий script с таким же индексом
      const existingScript = document.querySelector(`script[data-id="service-schema-${index}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-id', `service-schema-${index}`);
      script.textContent = JSON.stringify(serviceSchema);
      document.head.appendChild(script);
    });

    return () => {
      services.forEach((_, index) => {
        const scriptToRemove = document.querySelector(`script[data-id="service-schema-${index}"]`);
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      });
    };
  }, [services]);

  return null;
};

export {
  FAQPageSEO,
  LocalBusinessSchema,
  ReviewsSchema,
  VehicleSchema,
  WebSiteSchema,
  PriceRangeSchema
};