import SEOHead from './SEOHead';
import { useLanguage } from '../context/LanguageContext';

// Компонент для страницы туров с богатыми структурированными данными
const ToursPageSEO = ({ tours }) => {
  const { t } = useLanguage();
  // Структурированные данные для туров
  const toursSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t('schema.tours.name'),
    "description": t('schema.tours.description'),
    "numberOfItems": tours?.length || 0,
    "itemListElement": tours?.map((tour, index) => ({
      "@type": "TouristTrip",
      "position": index + 1,
      "name": tour.name,
      "description": tour.description,
      "image": tour.image,
      "url": `https://autoportbaku.com/tours/${tour.id}`,
      "offers": {
        "@type": "Offer",
        "price": tour.price,
        "priceCurrency": "AZN",
        "availability": "https://schema.org/InStock"
      },
      "touristType": "Everyone",
      "duration": tour.duration
    })) || []
  };

  const breadcrumbs = [
    { name: "Главная", url: "https://autoportbaku.com" },
    { name: "Туры", url: "https://autoportbaku.com/tours" }
  ];

  return (
    <SEOHead
      pageType="toursPage"
      structuredData={toursSchema}
      breadcrumbs={breadcrumbs}
    />
  );
};

// Компонент для детальной страницы тура
const TourDetailSEO = ({ tour }) => {
  const { t } = useLanguage();
  const tourSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour?.name,
    "description": tour?.description,
    "image": tour?.images || [],
    "url": `https://autoportbaku.com/tours/${tour?.id}`,
    "provider": {
      "@type": "Organization",
      "name": "AutoPortBaku",
      "url": "https://autoportbaku.com"
    },
    "offers": {
      "@type": "Offer",
      "price": tour?.price,
      "priceCurrency": "AZN",
      "availability": "https://schema.org/InStock",
      "validFrom": new Date().toISOString()
    },
    "duration": tour?.duration,
    "touristType": "Everyone",
    "itinerary": tour?.itinerary?.map(item => ({
      "@type": "TouristDestination",
      "name": item.location,
      "description": item.description
    })) || []
  };

  const breadcrumbs = [
    { name: t('breadcrumbs.home') || "Главная", url: "https://autoportbaku.com" },
    { name: t('breadcrumbs.tours') || "Туры", url: "https://autoportbaku.com/tours" },
    { name: tour?.name, url: `https://autoportbaku.com/tours/${tour?.id}` }
  ];

  return (
    <SEOHead
      title={`${tour?.name} - Туры AutoPortBaku`}
      description={tour?.description}
      keywords={`${tour?.name}, тур азербайджан, экскурсия ${tour?.location}`}
      ogImage={tour?.image}
      structuredData={tourSchema}
      breadcrumbs={breadcrumbs}
    />
  );
};

// Компонент для страницы услуг
const ServicesPageSEO = ({ services }) => {
  const { t } = useLanguage();
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": t('schema.services.name'),
    "description": t('schema.services.description'),
    "provider": {
      "@type": "Organization",
      "name": "AutoPortBaku",
      "url": "https://autoportbaku.com"
    },
    "serviceType": "Transportation Service",
    "areaServed": {
      "@type": "Country",
      "name": "Azerbaijan"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": t('schema.services.offerCatalogName'),
      "itemListElement": services?.map(service => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description
        }
      })) || []
    }
  };

  const breadcrumbs = [
    { name: t('breadcrumbs.home') || "Главная", url: "https://autoportbaku.com" },
    { name: t('breadcrumbs.services') || "Услуги", url: "https://autoportbaku.com/services" }
  ];

  return (
    <SEOHead
      pageType="servicesPage"
      structuredData={servicesSchema}
      breadcrumbs={breadcrumbs}
    />
  );
};

// Компонент для страницы О нас
const AboutPageSEO = () => {
  const { t } = useLanguage();
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('schema.about.name'),
    "description": t('schema.about.description'),
    "mainEntity": {
      "@type": "Organization",
      "name": "AutoPortBaku",
      "foundingDate": "2015",
      "description": t('schema.about.organizationDescription')
    }
  };

  const breadcrumbs = [
    { name: t('breadcrumbs.home') || "Главная", url: "https://autoportbaku.com" },
    { name: t('breadcrumbs.about') || "О нас", url: "https://autoportbaku.com/about" }
  ];

  return (
    <SEOHead
      pageType="aboutPage"
      structuredData={aboutSchema}
      breadcrumbs={breadcrumbs}
    />
  );
};

// Компонент для контактной страницы
const ContactsPageSEO = () => {
  const { t } = useLanguage();
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('schema.contacts.name'),
    "description": t('schema.contacts.description'),
    "mainEntity": {
      "@type": "Organization",
      "name": "AutoPortBaku",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+994-50-123-45-67",
          "contactType": "customer service",
          "availableLanguage": ["ru", "az", "en"],
          "hoursAvailable": "Mo-Su 00:00-24:00"
        }
      ]
    }
  };

  const breadcrumbs = [
    { name: t('breadcrumbs.home') || "Главная", url: "https://autoportbaku.com" },
    { name: t('breadcrumbs.contacts') || "Контакты", url: "https://autoportbaku.com/contacts" }
  ];

  return (
    <SEOHead
      pageType="contactsPage"
      structuredData={contactSchema}
      breadcrumbs={breadcrumbs}
    />
  );
};

export {
  ToursPageSEO,
  TourDetailSEO,
  ServicesPageSEO,
  AboutPageSEO,
  ContactsPageSEO
};