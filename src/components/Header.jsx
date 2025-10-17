import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getToursData, getServiceData } from "../api/index";
import { getLocalizedPath } from "../utils/routes";
import LanguageSwitcher from "./LanguageSwitcher";
import "../assets/styles/Header.scss";
import logoImage from "/logo.png";


export default function Header() {
  const { lang, t } = useLanguage();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileToursDropdownOpen, setIsMobileToursDropdownOpen] = useState(false);
  const [isMobileServicesDropdownOpen, setIsMobileServicesDropdownOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const [services, setServices] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Проверяем, находимся ли мы на главной странице
  const isHomePage = location.pathname === `/${lang}` || location.pathname === '/';

  // Создаем класс для header с условным добавлением класса 'home'
  const headerClass = `header${isHomePage ? ' home' : ''}`;

  // Загрузка туров для выпадающего меню
  useEffect(() => {
    const fetchTours = async () => {
      try {
        setToursLoading(true);
        const toursData = await getToursData(lang);
        const toursArray = toursData.data || toursData || [];
        setTours(toursArray.slice(0, 5)); // Ограничиваем до 5 туров в меню
      } catch (error) {
        console.error('Error fetching tours for menu:', error);
        setTours([]);
      } finally {
        setToursLoading(false);
      }
    };

    fetchTours();
  }, [lang]);

  // Загрузка сервисов для выпадающего меню
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await getServiceData(lang);
        const servicesArray = Array.isArray(servicesData) ? servicesData : (servicesData.data || []);
        setServices(servicesArray.slice(0, 16)); 
      } catch (error) {
        console.error('Error fetching services for menu:', error);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [lang]);

  // Функция для переключения мобильного меню
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Функция для переключения мобильного выпадающего меню туров
  const toggleMobileToursDropdown = () => {
    setIsMobileToursDropdownOpen(!isMobileToursDropdownOpen);
  };

  // Функция для переключения мобильного выпадающего меню сервисов
  const toggleMobileServicesDropdown = () => {
    setIsMobileServicesDropdownOpen(!isMobileServicesDropdownOpen);
  };

  // Функция для закрытия мобильного меню при клике на ссылку
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileToursDropdownOpen(false);
    setIsMobileServicesDropdownOpen(false);
  };

  // Отключаем/включаем скролл страницы при открытии/закрытии меню
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup при размонтировании компонента
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Закрываем меню при изменении маршрута
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileToursDropdownOpen(false);
    setIsMobileServicesDropdownOpen(false);
  }, [location.pathname]);

  // Закрываем меню при нажатии Escape
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsMobileToursDropdownOpen(false);
        setIsMobileServicesDropdownOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={headerClass} >
      <div className="container">
        <div className="row">
          <div className="inner">
            <div className="logo">
              <Link to={getLocalizedPath(lang, 'home')}>
                <img src={logoImage} alt="Logo" />
              </Link>
            </div>

            <div className="right_section">
              <div className={`nav_and_lang ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <nav>
                  <Link to={getLocalizedPath(lang, 'home')} onClick={closeMobileMenu}>{t("header.home")}</Link>
                  <Link to={getLocalizedPath(lang, 'about')} onClick={closeMobileMenu}>{t("header.about")}</Link>  
                  
                  {/* Services dropdown menu */}
                  <div className="nav-item dropdown">
                    <div className="dropdown-trigger">
                      <Link to={getLocalizedPath(lang, 'services')} onClick={closeMobileMenu}>{t("header.services", "Services")}</Link>
                      <span 
                        className={`dropdown-arrow ${isMobileServicesDropdownOpen ? 'open' : ''}`}
                        onClick={toggleMobileServicesDropdown}
                      >
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    
                    <div className={`dropdown-menu ${isMobileServicesDropdownOpen ? 'mobile-open' : ''}`}>
                      {servicesLoading ? (
                        <div key="services-loading" className="dropdown-item">Loading...</div>
                      ) : services.length > 0 ? (
                        <React.Fragment key="services-list">                       
                          {services.map((service, index) => (   
                            <Link 
                              key={`service-${index}`} 
                              to={getLocalizedPath(lang, 'services', service.slug || service.id)} 
                              className="dropdown-item"
                              onClick={closeMobileMenu}
                            >
                              {service.title || `Service ${service.id}`}
                            </Link>
                          ))}
                         
                        </React.Fragment>
                      ) : (
                        <Link 
                          key="services-fallback"
                          to={getLocalizedPath(lang, 'services')} 
                          className="dropdown-item"
                          onClick={closeMobileMenu}
                        >
                          {t("header.services", "Services")}
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  {/* Tours dropdown menu */}
                  <div className="nav-item dropdown">
                    <div className="dropdown-trigger">
                      <Link to={getLocalizedPath(lang, 'tours')} onClick={closeMobileMenu}>{t("header.tours")}</Link>
                      <span 
                        className={`dropdown-arrow ${isMobileToursDropdownOpen ? 'open' : ''}`}
                        onClick={toggleMobileToursDropdown}
                      >
                        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                    
                    <div className={`dropdown-menu ${isMobileToursDropdownOpen ? 'mobile-open' : ''}`}>
                      {toursLoading ? (
                        <div key="tours-loading" className="dropdown-item">Loading...</div>
                      ) : tours.length > 0 ? (
                        <React.Fragment key="tours-list">
                          {tours.map((tour, index) => (
                            <Link 
                              key={`tour-${index}`} 
                              to={getLocalizedPath(lang, 'tours', tour.slug || tour.id)} 
                              className="dropdown-item"
                              onClick={closeMobileMenu}
                            >
                              {tour.title || `Tour ${tour.id}`}
                            </Link>
                          ))}
                          
                        </React.Fragment>
                      ) : (
                        <Link 
                          key="tours-fallback"
                          to={getLocalizedPath(lang, 'tours')} 
                          className="dropdown-item"
                          onClick={closeMobileMenu}
                        >
                          {t("header.tours")}
                        </Link>
                      )}
                    </div>
                  </div>
                  
                  <Link to={getLocalizedPath(lang, 'faq')} onClick={closeMobileMenu}>{t("header.faq")}</Link>
                  <Link to={getLocalizedPath(lang, 'contacts')} onClick={closeMobileMenu}>{t("header.contacts")}</Link>
                </nav>
                <LanguageSwitcher />
              </div>

              {/* Overlay для мобильного меню */}
              {isMobileMenuOpen && (
                <div className="mobile-overlay" onClick={closeMobileMenu}></div>
              )}

              <div className="burger_menu">
                <div className={`burger_icon ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.5 6C4.5 5.86739 4.55268 5.74021 4.64645 5.64645C4.74021 5.55268 4.86739 5.5 5 5.5H19C19.1326 5.5 19.2598 5.55268 19.3536 5.64645C19.4473 5.74021 19.5 5.86739 19.5 6C19.5 6.13261 19.4473 6.25979 19.3536 6.35355C19.2598 6.44732 19.1326 6.5 19 6.5H5C4.86739 6.5 4.74021 6.44732 4.64645 6.35355C4.55268 6.25979 4.5 6.13261 4.5 6ZM4.5 12C4.5 11.8674 4.55268 11.7402 4.64645 11.6464C4.74021 11.5527 4.86739 11.5 5 11.5H19C19.1326 11.5 19.2598 11.5527 19.3536 11.6464C19.4473 11.7402 19.5 11.8674 19.5 12C19.5 12.1326 19.4473 12.2598 19.3536 12.3536C19.2598 12.4473 19.1326 12.5 19 12.5H5C4.86739 12.5 4.74021 12.4473 4.64645 12.3536C4.55268 12.2598 4.5 12.1326 4.5 12ZM5 17.5C4.86739 17.5 4.74021 17.5527 4.64645 17.6464C4.55268 17.7402 4.5 17.8674 4.5 18C4.5 18.1326 4.55268 18.2598 4.64645 18.3536C4.74021 18.4473 4.86739 18.5 5 18.5H19C19.1326 18.5 19.2598 18.4473 19.3536 18.3536C19.4473 18.2598 19.5 18.1326 19.5 18C19.5 17.8674 19.4473 17.7402 19.3536 17.6464C19.2598 17.5527 19.1326 17.5 19 17.5H5Z" fill="white" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
