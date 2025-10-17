import React, { useEffect, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getTourBySlug } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/TourDetail.scss";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function TourDetail() {
    const { slug } = useParams();
    const { t, lang } = useLanguage();
    const [tour, setTour] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchTour = async () => {
            try {               
                setLoading(true);
                const tourData = await getTourBySlug(slug, lang);
                console.log();
                
                // Дополнительная проверка на случай, если API вернёт неожиданную структуру
                if (tourData && typeof tourData === 'object') {
                    setTour(tourData.data || tourData);
                } else {
                    throw new Error('Invalid tour data received');
                }
                setError(null);
            } catch (err) {
                console.error('Error fetching tour:', err);
                setError(`Tour not found: ${err.message}`);
                setTour(null);
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchTour();
        } else {
            setError('No tour slug provided');
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
                    <div className="loading-spinner">{t('common.loading', 'Loading tour...')}</div>
                </div>
            </>
        );
    }

    if (error || !tour) {
        return (
            <>
                <Page_big_banner
                    title="Tour Not Found"
                    subtitle="The tour you're looking for doesn't exist"
                    bannerImageSrc=""
                />
                <div className="error-container">
                    <p>{error || 'Tour not found'}</p>
                    <Link to={getLocalizedPath(lang, 'tours')} className="btn btn-primary">
                        {t('common.backToTours', 'Back to Tours')}
                    </Link>
                </div>
            </>
        );
    }

    // Подготавливаем изображения для галереи


    let images = [];

    // Собираем все доступные изображения
    const imageUrls = [];

    // Основное изображение
    if (tour.image) {
        imageUrls.push(tour.image);
    }

    // Галерея (в вашем API это строка с URL)
    if (tour.gallery && typeof tour.gallery === 'string') {
        imageUrls.push(tour.gallery);
    }

    // Если gallery массив (на случай будущих изменений API)
    if (tour.gallery && Array.isArray(tour.gallery)) {
        imageUrls.push(...tour.gallery);
    }

    // Преобразуем в формат для ImageGallery
    images = imageUrls.map(url => ({
        original: url,
        thumbnail: url,
    }));

    // Если нет изображений, добавляем заглушку
    if (images.length === 0) {
        images.push({
            original: '../assets/images/small_heading_banner.png',
            thumbnail: '../assets/images/small_heading_banner.png',
        });
    }

    // Кастомные стрелки навигации
    const renderLeftNav = (onClick, disabled) => (
        <button
            className="image-gallery-left-nav custom-nav-arrow"
            disabled={disabled}
            onClick={onClick}
            aria-label="Previous image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M16.1255 12.5842C16.2299 12.4869 16.3137 12.3696 16.3717 12.2393C16.4298 12.109 16.461 11.9683 16.4636 11.8256C16.4661 11.683 16.4398 11.5413 16.3864 11.409C16.333 11.2767 16.2534 11.1565 16.1525 11.0556C16.0516 10.9547 15.9314 10.8752 15.7991 10.8217C15.6668 10.7683 15.5251 10.742 15.3825 10.7446C15.2398 10.7471 15.0991 10.7783 14.9688 10.8364C14.8385 10.8944 14.7212 10.9782 14.6239 11.0826L8.95722 16.7492C8.75824 16.9484 8.64648 17.2185 8.64648 17.5001C8.64648 17.7816 8.75824 18.0517 8.95722 18.2509L14.6239 23.9176C14.7212 24.0219 14.8385 24.1057 14.9688 24.1637C15.0991 24.2218 15.2398 24.253 15.3825 24.2556C15.5251 24.2581 15.6668 24.2318 15.7991 24.1784C15.9314 24.125 16.0516 24.0454 16.1525 23.9445C16.2534 23.8436 16.333 23.7234 16.3864 23.5912C16.4398 23.4588 16.4661 23.3171 16.4636 23.1745C16.461 23.0318 16.4298 22.8911 16.3717 22.7608C16.3137 22.6305 16.2299 22.5132 16.1255 22.4159L12.2722 18.5626H25.9997C26.2815 18.5626 26.5518 18.4506 26.751 18.2514C26.9503 18.0521 27.0622 17.7818 27.0622 17.5001C27.0622 17.2183 26.9503 16.948 26.751 16.7488C26.5518 16.5495 26.2815 16.4376 25.9997 16.4376H12.2722L16.1255 12.5842Z" fill="black" />
            </svg>
        </button>
    );

    const renderRightNav = (onClick, disabled) => (
        <button
            className="image-gallery-right-nav custom-nav-arrow"
            disabled={disabled}
            onClick={onClick}
            aria-label="Next image"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <path d="M18.8745 12.5842C18.7701 12.4869 18.6863 12.3696 18.6283 12.2393C18.5702 12.109 18.539 11.9683 18.5364 11.8256C18.5339 11.683 18.5602 11.5413 18.6136 11.409C18.667 11.2767 18.7466 11.1565 18.8475 11.0556C18.9484 10.9547 19.0686 10.8752 19.2009 10.8217C19.3332 10.7683 19.4749 10.742 19.6175 10.7446C19.7602 10.7471 19.9009 10.7783 20.0312 10.8364C20.1615 10.8944 20.2788 10.9782 20.3761 11.0826L26.0428 16.7492C26.2418 16.9484 26.3535 17.2185 26.3535 17.5001C26.3535 17.7816 26.2418 18.0517 26.0428 18.2509L20.3761 23.9176C20.2788 24.0219 20.1615 24.1057 20.0312 24.1637C19.9009 24.2218 19.7602 24.253 19.6175 24.2556C19.4749 24.2581 19.3332 24.2318 19.2009 24.1784C19.0686 24.125 18.9484 24.0454 18.8475 23.9445C18.7466 23.8436 18.667 23.7234 18.6136 23.5912C18.5602 23.4588 18.5339 23.3171 18.5364 23.1745C18.539 23.0318 18.5702 22.8911 18.6283 22.7608C18.6863 22.6305 18.7701 22.5132 18.8745 22.4159L22.7278 18.5626H9.00028C8.71849 18.5626 8.44824 18.4506 8.24898 18.2514C8.04972 18.0521 7.93778 17.7818 7.93778 17.5001C7.93778 17.2183 8.04972 16.948 8.24898 16.7488C8.44824 16.5495 8.71849 16.4376 9.00028 16.4376H22.7278L18.8745 12.5842Z" fill="black" />
            </svg>
        </button>
    );

    return (
        <>
            <Page_big_banner
                title={''}
                subtitle={''}
                bannerImageSrc={tour.image}
            />

            <section className="tour-detail">
                <div className="container">
                    <div className="row">
                        <div className="tour-detail-inner">
                            <h1>{tour.title}</h1>
                            <div className="details_holder">
                                <div className="left_block">
                                    <div className="small_description">
                                        <p>{tour.excerpt}</p>
                                    </div>
                                    <div className="parameters">
                                        {tour.duration && (
                                            <div className="duration">
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M12 6.65478V12.6548H16.5M21 12.6548C21 13.8367 20.7672 15.007 20.3149 16.0989C19.8626 17.1909 19.1997 18.183 18.364 19.0187C17.5282 19.8545 16.5361 20.5174 15.4442 20.9697C14.3522 21.422 13.1819 21.6548 12 21.6548C10.8181 21.6548 9.64778 21.422 8.55585 20.9697C7.46392 20.5174 6.47177 19.8545 5.63604 19.0187C4.80031 18.183 4.13738 17.1909 3.68508 16.0989C3.23279 15.007 3 13.8367 3 12.6548C3 10.2678 3.94821 7.97865 5.63604 6.29082C7.32387 4.603 9.61305 3.65479 12 3.65479C14.3869 3.65479 16.6761 4.603 18.364 6.29082C20.0518 7.97865 21 10.2678 21 12.6548Z" stroke="#08529F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <strong>{t("tour.duration")}:</strong> {tour.duration}
                                            </div>
                                        )}
                                        {tour.cancellation && (
                                            <div className="cancellation">
                                                <div className="icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                                        <path d="M12 6.65478V12.6548H16.5M21 12.6548C21 13.8367 20.7672 15.007 20.3149 16.0989C19.8626 17.1909 19.1997 18.183 18.364 19.0187C17.5282 19.8545 16.5361 20.5174 15.4442 20.9697C14.3522 21.422 13.1819 21.6548 12 21.6548C10.8181 21.6548 9.64778 21.422 8.55585 20.9697C7.46392 20.5174 6.47177 19.8545 5.63604 19.0187C4.80031 18.183 4.13738 17.1909 3.68508 16.0989C3.23279 15.007 3 13.8367 3 12.6548C3 10.2678 3.94821 7.97865 5.63604 6.29082C7.32387 4.603 9.61305 3.65479 12 3.65479C14.3869 3.65479 16.6761 4.603 18.364 6.29082C20.0518 7.97865 21 10.2678 21 12.6548Z" stroke="#08529F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                <strong>{t("tour.cancellation")}:</strong> {tour.cancellation}
                                            </div>
                                        )}
                                    </div>
                                    <div className="full_description text_editor"
                                        dangerouslySetInnerHTML={{ __html: tour.text || 'Tour details will be available soon...' }}>
                                    </div>
                                    {tour.bookingLink && (
                                        <div className="buttons_holder" >
                                            <a href={tour.bookingLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">{t("tour.bookingLink")}</a>
                                        </div>
                                    )}
                                </div>
                                <div className="right_block">
                                    <div className="image_gallery">
                                        <ImageGallery
                                            items={images}
                                            loading="lazy"
                                            showThumbnails={true}
                                            showPlayButton={false}
                                            showFullscreenButton={false}
                                            showNav={true}
                                            autoPlay={false}
                                            slideDuration={450}
                                            slideInterval={3000}
                                            renderLeftNav={renderLeftNav}
                                            renderRightNav={renderRightNav}
                                            thumbnailPosition="bottom"
                                            useBrowserFullscreen={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
}