import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useCanonicalUrl, useAlternateUrls } from '../hooks/useCanonicalUrl';

const SEOHead = ({ 
  title,
  description,
  keywords,
  ogImage = "/og-image.jpg",
  canonicalUrl, // Если не передан, будет автоматически сгенерирован
  basePath, // Для кастомного пути (например, для деталей товара)
  routeKey, // Ключ маршрута из переводов для статических страниц ('about', 'services', etc.)
  structuredData,
  breadcrumbs,
  pageType = 'homePage' // homePage, toursPage, servicesPage, aboutPage, contactsPage, faqPage
}) => {
  const { lang, t } = useLanguage();
  const { settings, loading } = useSettings();
  
  // Автоматическая генерация canonical URL
  const autoCanonicalUrl = useCanonicalUrl(basePath, routeKey);
  const alternateUrls = useAlternateUrls(basePath, routeKey);

  // Используем переводы как fallback значения
  const finalTitle = title || t(`seo.${pageType}.title`) || t('seo.defaultTitle');
  const finalDescription = description || t(`seo.${pageType}.description`) || t('seo.defaultDescription');
  const finalKeywords = keywords || t(`seo.${pageType}.keywords`) || t('seo.defaultKeywords');
  const finalCanonicalUrl = canonicalUrl || autoCanonicalUrl;
  
  
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
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1');
    updateMetaTag('Content-Language', 'ru', 'http-equiv');
    
    // Author and Creator meta tags
    updateMetaTag('author', 'Amiroff Creative Agency');
    updateMetaTag('creator', 'Amiroff Creative Agency - https://amiroff.az');
    updateMetaTag('publisher', 'Amiroff Creative Agency');
    updateMetaTag('designer', 'Amiroff Creative Agency');
    updateMetaTag('developer', 'Amiroff Creative Agency');
    updateMetaTag('generator', 'React + Vite - Created by Amiroff Creative Agency');

    // Open Graph теги
    updateMetaTag('og:title', finalTitle, 'property');
    updateMetaTag('og:description', finalDescription, 'property');
    updateMetaTag('og:image', ogImage, 'property');
    updateMetaTag('og:url', finalCanonicalUrl, 'property');
    updateMetaTag('og:type', 'website', 'property');
    updateMetaTag('og:site_name', 'AutoPortBaku', 'property');
    updateMetaTag('og:locale', lang === 'ru' ? 'ru_RU' : lang === 'en' ? 'en_US' : 'az_AZ', 'property');

    // Twitter Card теги
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', finalTitle);
    updateMetaTag('twitter:description', finalDescription);
    updateMetaTag('twitter:image', ogImage);

    // Canonical URL
    if (finalCanonicalUrl) {
      updateLinkTag('canonical', finalCanonicalUrl);
    }
    
    // Hreflang теги для многоязычности
    // Сначала удаляем все существующие hreflang теги
    const existingHreflangs = document.querySelectorAll('link[hreflang]');
    existingHreflangs.forEach(link => link.remove());
    
    // Добавляем новые hreflang теги
    alternateUrls.forEach(({ lang: hrefLang, url }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hrefLang);
      link.setAttribute('href', url);
      document.head.appendChild(link);
    });

    // Базовая структурированная разметка для компании с данными из API
    const socialLinks = [];
    if (settings?.facebook) socialLinks.push(settings.facebook);
    if (settings?.instagram) socialLinks.push(settings.instagram);
    if (settings?.tiktok) socialLinks.push(settings.tiktok);
    
    // Fallback социальные сети
    if (socialLinks.length === 0) {
      socialLinks.push(
        "https://www.facebook.com/autoportbaku",
        "https://www.instagram.com/autoportbaku"
      );
    }

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AutoPortBaku",
      "description": finalDescription,
      "url": "https://autoportbaku.com",
      "logo": "https://autoportbaku.com/logo_big.svg",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": settings?.phone || settings?.telephone || "+994-50-481-00-81",       
        "contactType": "customer service",
        "availableLanguage": ["ru", "az", "en"]
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": settings?.address || "Azure Business Center, 15 Nobel Avenue",
        "addressCountry": "AZ",
        "addressLocality": "Baku",
        "postalCode": "AZ1000"
      },
      "sameAs": socialLinks
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
  }, [finalTitle, finalDescription, finalKeywords, ogImage, finalCanonicalUrl, structuredData, breadcrumbs, lang, settings, loading, alternateUrls]);

  return null; // Компонент не рендерит ничего видимого
};

export default SEOHead;