import React from 'react';
import SEOHead from '../components/SEOHead';

/**
 * Примеры использования canonical URL с переводами
 */
const CanonicalExamples = () => {
  return (
    <div>
      <h1>Примеры Canonical URL</h1>
      
      {/* Статические страницы с переводами */}
      <section>
        <h2>Статические страницы (используют переводы)</h2>
        
        {/* О нас */}
        <SEOHead
          pageType="aboutPage"
          routeKey="about"
        />
        {/* 
        Результат:
        RU: canonical = "https://autoportbaku.com/o-nas"
        EN: canonical = "https://autoportbaku.com/en/about-us" 
        AZ: canonical = "https://autoportbaku.com/az/haqqimizda"
        */}
        
        {/* Контакты */}
        <SEOHead
          pageType="contactsPage"
          routeKey="contacts"
        />
        {/*
        Результат:
        RU: canonical = "https://autoportbaku.com/kontakty"
        EN: canonical = "https://autoportbaku.com/en/contacts"
        AZ: canonical = "https://autoportbaku.com/az/elaqe"
        */}
      </section>

      {/* Динамические страницы */}
      <section>
        <h2>Динамические страницы (используют slug)</h2>
        
        {/* Детали тура */}
        <SEOHead
          pageType="toursPage"
          title="Тур по Баку"
          description="Увлекательный тур по столице Азербайджана"
          basePath="/tours/baku-city-tour"
          ogImage="/images/tours/baku-tour.jpg"
        />
        {/*
        Результат:
        RU: canonical = "https://autoportbaku.com/tours/baku-city-tour"
        EN: canonical = "https://autoportbaku.com/en/tours/baku-city-tour"
        AZ: canonical = "https://autoportbaku.com/az/tours/baku-city-tour"
        */}
        
        {/* Детали сервиса */}
        <SEOHead
          pageType="servicesPage"
          title="Трансфер из аэропорта"
          description="Комфортный трансфер из аэропорта Баку"
          basePath="/services/airport-transfer"
          ogImage="/images/services/airport-transfer.jpg"
        />
      </section>

      {/* Главная страница */}
      <section>
        <h2>Главная страница</h2>
        
        <SEOHead
          pageType="homePage"
          basePath="/"
        />
        {/*
        Результат:
        RU: canonical = "https://autoportbaku.com/"
        EN: canonical = "https://autoportbaku.com/en/"
        AZ: canonical = "https://autoportbaku.com/az/"
        */}
      </section>
    </div>
  );
};

export default CanonicalExamples;