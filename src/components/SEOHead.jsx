import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const SEOHead = ({ 
  title,
  description,
  keywords,
  ogImage = "/src/assets/images/og-image.jpg",
  canonicalUrl,
  structuredData,
  breadcrumbs,
  pageType = 'homePage' // homePage, toursPage, servicesPage, aboutPage, contactsPage
}) => {
  const { lang, t } = useLanguage();
  
  // Используем переводы как fallback значения
  const finalTitle = title || t(`seo.${pageType}.title`) || t('seo.defaultTitle');
  const finalDescription = description || t(`seo.${pageType}.description`) || t('seo.defaultDescription');
  const finalKeywords = keywords || t(`seo.${pageType}.keywords`) || t('seo.defaultKeywords');
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : '');
  
  
  // Функция для обновления или создания meta тега
  const updateMetaTag = (name, content, attribute = 'name') => {
    if (typeof document === 'undefined') return;
    
    let element = document.querySelector(`meta[${attribute}="${name}"]`);
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, name);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    }
  };

  // Функция для обновления или создания link тега
  const updateLinkTag = (rel, href) => {
    if (typeof document === 'undefined') return;
    
    let element = document.querySelector(`link[rel="${rel}"]`);
    if (element) {
      element.setAttribute('href', href);
    } else {
      element = document.createElement('link');
      element.setAttribute('rel', rel);
      element.setAttribute('href', href);
      document.head.appendChild(element);
    }
  };

  // Функция для добавления JSON-LD структурированных данных
  const addStructuredData = (data, id) => {
    if (typeof document === 'undefined') return;
    
    // Удаляем предыдущий script с таким же id, если есть
    const existingScript = document.querySelector(`script[data-id="${id}"]`);
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-id', id);
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Обновляем title
    document.title = finalTitle;

    // Обновляем основные meta теги
    updateMetaTag('description', finalDescription);
    updateMetaTag('keywords', finalKeywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    updateMetaTag('Content-Language', 'ru', 'http-equiv');

    // Open Graph теги
    updateMetaTag('og:title', finalTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', currentUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'AutoPortBaku', 'property');
    updateMetaTag('og:locale', lang === 'ru' ? 'ru_RU' : lang === 'en' ? 'en_US' : 'az_AZ', 'property');

    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (currentUrl) {
      updateLinkTag('canonical', currentUrl);
    }

    // Базовая структурированная разметка для компании
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AutoPortBaku",
      "description": description,
      "url": "https://autoportbaku.com",
      "logo": "https://autoportbaku.com/images/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+994-50-481-00-81",
        "contactType": "customer service",
        "availableLanguage": ["ru", "az", "en"]
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "AZ",
        "addressLocality": "Baku"
      },
      "sameAs": [
        "https://www.facebook.com/autoportbaku",
        "https://www.instagram.com/autoportbaku"
      ]
    };

    // Добавляем структурированные данные
    addStructuredData(organizationSchema, 'organization');

    // Схема хлебных крошек
    if (breadcrumbs) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      addStructuredData(breadcrumbSchema, 'breadcrumbs');
    }

    // Дополнительные структурированные данные
    if (structuredData) {
      addStructuredData(structuredData, 'custom');
    }

    // Cleanup function для удаления созданных элементов при размонтировании
    return () => {
      // Очистка происходит автоматически при обновлении значений
    };
  }, [finalTitle, finalDescription, finalKeywords, ogImage, currentUrl, structuredData, breadcrumbs, lang]);

  return null; // Компонент не рендерит ничего видимого
};

export default SEOHead;