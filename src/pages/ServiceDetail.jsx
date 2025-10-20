import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServiceBySlug } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/ServiceDetail.scss";

export default function ServiceDetail() {
    const { slug } = useParams();
    const { t, lang } = useLanguage();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                setLoading(true);
                const serviceData = await getServiceBySlug(slug, lang);
                
                if (serviceData && typeof serviceData === 'object') {
                    setService(serviceData.data || serviceData);
                } else {
                    throw new Error('Invalid service data received');
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching service:', err);
                setError(`Service not found: ${err.message}`);
                setService(null);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchService();
        } else {
            setError('No service slug provided');
            setLoading(false);
        }
    }, [slug, lang]);

    if (loading) {
        return (
            <>
                <Page_big_banner
                    title="Loading..."
                    subtitle=""
                    bannerImageSrc=""
                />
                <div className="loading-container">
                    <div className="loading-spinner">{t('common.loading', 'Loading service...')}</div>
                </div>
            </>
        );
    }

    if (error || !service) {
        return (
            <>
                <Page_big_banner
                    title="Service Not Found"
                    subtitle="The service you're looking for doesn't exist"
                    bannerImageSrc=""
                />
                <div className="error-container">
                    <p>{error || 'Service not found'}</p>
                    <Link to={getLocalizedPath(lang, 'services')} className="btn btn-primary">
                        {t('common.backToServices', 'Back to Services')}
                    </Link>
                </div>
            </>
        );
    }

    return (
        <>
            <Page_big_banner
                title={service.title || "Service Details"}
                subtitle={service.shortDescription || ""}
                bannerImageSrc={service.mainImage || service.image || ""}
            />
            
            <section className="service-detail">
                <div className="container">
                    <div className="row">
                        <div className="service-detail-content">
                            
                            {/* Service Image */}
                            {service.image && (
                                <div className="service-main-image">
                                    <img src={service.image} alt={service.title} />
                                </div>
                            )}
                            
                            {/* Service Info */}
                            <div className="service-info">
                                <div className="service-description">
                                    {service.fullDescription ? (
                                        <div 
                                            className="service-description-html"
                                            dangerouslySetInnerHTML={{ __html: service.fullDescription }}
                                        />
                                    ) : service.description ? (
                                        <div className="service-description-text">
                                            <p>{service.description}</p>
                                        </div>
                                    ) : (
                                        <div className="service-description-text">
                                            <p>{t('service.noDescription', 'No description available for this service.')}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Service Features */}
                                {service.features && service.features.length > 0 && (
                                    <div className="service-features">
                                        <h3>{t('service.features', 'Features')}</h3>
                                        <ul>
                                            {service.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Pricing Info */}
                                {service.price && (
                                    <div className="service-pricing">
                                        <h3>{t('service.pricing', 'Pricing')}</h3>
                                        <div className="price-info">
                                            <span className="price">{service.price}</span>
                                            {service.priceNote && (
                                                <span className="price-note">{service.priceNote}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Contact/Book Button */}
                                <div className="service-actions">
                                    <Link 
                                        to={getLocalizedPath(lang, 'contacts')} 
                                        className="btn btn-primary btn-large"
                                    >
                                        {t('service.bookNow', 'Book This Service')}
                                    </Link>
                                    <Link 
                                        to={getLocalizedPath(lang, 'services')} 
                                        className="btn btn-secondary"
                                    >
                                        {t('service.backToServices', 'Back to Services')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}