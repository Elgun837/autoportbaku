// Пример использования SEO компонентов в ваших страницах

import React from 'react';
import SEOHead from '../components/SEOHead';
import { ToursPageSEO } from '../components/SEOComponents';
import { LocalBusinessSchema, WebSiteSchema } from '../components/RichSnippets';
import { AnalyticsProvider } from '../components/Analytics';

// Главная страница с полным SEO
const HomePage = () => {
  const homePageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "AutoPortBaku - Премиум транспортные услуги в Азербайджане",
    "description": "Надежные трансферы, экскурсии и аренда автомобилей в Баку и по всему Азербайджану. Профессиональные водители, комфортный автопарк.",
    "url": "https://autoportbaku.com",
    "mainEntity": {
      "@type": "Organization",
      "name": "AutoPortBaku"
    },
    "significantLink": [
      "https://autoportbaku.com/tours",
      "https://autoportbaku.com/services", 
      "https://autoportbaku.com/contacts"
    ],
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".hero-title", ".hero-description"]
    }
  };

  return (
    <div>
      <SEOHead
        title="AutoPortBaku - Премиум транспортные услуги в Азербайджане"
        description="Надежные трансферы из аэропорта, экскурсии по достопримечательностям и аренда автомобилей в Баку. Профессиональные водители, современный автопарк."
        keywords="автопорт баку, трансфер аэропорт баку, экскурсии азербайджан, аренда авто баку"
        structuredData={homePageSchema}
        ogImage="https://autoportbaku.com/images/homepage-og.jpg"
      />
      
      {/* Схемы для главной страницы */}
      <LocalBusinessSchema />
      <WebSiteSchema />
      
      <div className="hero-section">
        <h1 className="hero-title">AutoPortBaku - Ваш надежный партнер в Азербайджане</h1>
        <p className="hero-description">
          Премиум транспортные услуги: трансферы, экскурсии, аренда автомобилей
        </p>
      </div>
      
      {/* Остальной контент страницы */}
    </div>
  );
};

// Компонент App с настройкой аналитики
const App = () => {
  return (
    <AnalyticsProvider
      gtmId="GTM-XXXXXXX"  // Замените на ваш GTM ID
      gaId="G-XXXXXXXXXX"   // Замените на ваш GA4 ID
      fbPixelId="XXXXXXXXXXXXXXXX"  // Замените на ваш Facebook Pixel ID
      yandexId="XXXXXXXX"   // Замените на ваш Yandex Metrica ID
      hotjarId="XXXXXXX"    // Замените на ваш Hotjar ID
    >
      <div className="App">
        <HomePage />
        {/* Другие компоненты */}
      </div>
    </AnalyticsProvider>
  );
};

export default App;