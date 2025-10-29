import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../assets/styles/WhatsAppButton.scss';

const WhatsAppButtonAdvanced = ({ 
  showNotification = false, 
  notificationCount = 0,
  showOnScroll = false,
  hideOnPages = [],
  customMessage = null 
}) => {
  // Safely get language context
  let t, lang;
    // Hide when footer is visible
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(false);
          } else {
            if (window.scrollY > 300) setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);
  try {
    const languageContext = useLanguage();
    t = languageContext.t;
    lang = languageContext.lang || 'en';
  } catch (error) {
    console.warn('WhatsApp Button Advanced: Language context not available, using fallback');
    t = null;
    lang = 'en';
  }
  const [isVisible, setIsVisible] = useState(!showOnScroll);
  const [showShake, setShowShake] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const whatsappUrl = 'https://wa.link/aoss4j';
  
  // Fallback values based on language
  const getButtonText = () => {
    if (t?.common?.whatsappButton) return t.common.whatsappButton;
    return 'WhatsApp';
  };
  
  const getTooltipText = () => {
    if (t?.common?.whatsappTooltip) return t.common.whatsappTooltip;
    return lang === 'ru' ? 'Связаться с нами в WhatsApp' : 'Contact us on WhatsApp';
  };
  
  // Show button after page load with delay
  useEffect(() => {
    if (!showOnScroll) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [showOnScroll]);

  // Show button on scroll
  useEffect(() => {
    if (showOnScroll) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        setIsVisible(scrollY > 300);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showOnScroll]);

  // Optional shake effect for attention
  useEffect(() => {
    if (showNotification && notificationCount > 0) {
      const shakeTimer = setTimeout(() => {
        setShowShake(true);
        setTimeout(() => setShowShake(false), 800);
      }, 3000);
      
      return () => clearTimeout(shakeTimer);
    }
  }, [showNotification, notificationCount]);

  // Stop pulse after user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPulse(false);
    }, 10000); // Stop pulse after 10 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClick = () => {
    // Analytics tracking
    if (window.gtag) {
      window.gtag('event', 'whatsapp_click', {
        event_category: 'contact',
        event_label: 'floating_button',
        custom_parameters: {
          has_notification: showNotification,
          notification_count: notificationCount
        }
      });
    }
    
    // Custom message or default WhatsApp link
    const message = customMessage ? encodeURIComponent(customMessage) : '';
    const url = message ? `${whatsappUrl}?text=${message}` : whatsappUrl;
    
    window.open(url, '_blank', 'noopener,noreferrer');
    
    // Stop animations after click
    setShowPulse(false);
    setShowShake(false);
  };

  // Hide on specific pages
  useEffect(() => {
    const currentPath = window.location.pathname;
    const shouldHide = hideOnPages.some(page => currentPath.includes(page));
    if (shouldHide) {
      setIsVisible(false);
    }
  }, [hideOnPages]);

  if (!isVisible) return null;

  return (
    <div 
      className={`whatsapp-floating-button ${showShake ? 'animate-shake' : ''} ${showPulse ? 'animate-glow' : ''}`}
      onClick={handleClick}
      title={getTooltipText()}
      aria-label={getTooltipText()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Notification badge */}
      {showNotification && notificationCount > 0 && (
        <div className="whatsapp-notification-badge">
          {notificationCount > 99 ? '99+' : notificationCount}
        </div>
      )}
      
      <div className="whatsapp-icon">
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path 
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.520-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.051 3.488z" 
            fill="currentColor"
          />
        </svg>
      </div>
      
      <span className="whatsapp-text">{getButtonText()}</span>
      <div className="whatsapp-ripple"></div>
    </div>
  );
};

export default WhatsAppButtonAdvanced;