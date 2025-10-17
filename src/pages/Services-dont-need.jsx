import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServiceData } from "../api/index";
import { getLocalizedPath } from "../utils/routes";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/Services.scss";

export default function Services() {
    const { t, lang } = useLanguage();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const servicesData = await getServiceData(lang);
                const servicesArray = Array.isArray(servicesData) ? servicesData : (servicesData.data || []);
                setServices(servicesArray);
                setError(null);
            } catch (err) {
                console.error('Error fetching services:', err);
                setError('Failed to load services');
                setServices([]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [lang]);

    if (loading) {
        return (
            <>
                <Page_big_banner
                    title="Loading..."
                    subtitle=""
                    bannerImageSrc=""
                />
                <div className="loading-container">
                    <div className="loading-spinner">{t('common.loading', 'Loading services...')}</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Page_big_banner
                    title="Error"
                    subtitle="Failed to load services"
                    bannerImageSrc=""
                />
                <div className="error-container">
                    <p>{error}</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Page_big_banner
                title={t("services.title", "Our Services")}
                subtitle={t("services.subtitle", "Discover our comprehensive range of travel services")}
                bannerImageSrc="/src/assets/images/services-banner.jpg"
            />
            
            <section className="services-page">
                <div className="container">
                    <div className="row">
                        <div className="services-grid">
                            {services.map((service) => (
                                <div key={service.id} className="service-card">
                                    <Link to={getLocalizedPath(lang, 'services', service.slug || service.id)}>
                                        <div className="service-image">
                                            <img 
                                                src={service.image || '/default-service.jpg'} 
                                                alt={service.title} 
                                            />
                                        </div>
                                        <div className="service-content">
                                            <h3 className="service-title">{service.title}</h3>
                                            {service.description && (
                                                <p className="service-description">
                                                    {service.description.length > 150 
                                                        ? `${service.description.substring(0, 150)}...`
                                                        : service.description
                                                    }
                                                </p>
                                            )}
                                            <div className="service-link">
                                                {t("services.learnMore", "Learn More")} →
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        
                        {services.length === 0 && (
                            <div className="no-services">
                                <h3>{t("services.noServices", "No services available")}</h3>
                                <p>{t("services.checkBackLater", "Please check back later for updates.")}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}