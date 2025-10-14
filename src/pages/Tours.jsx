import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Scrollline from "../components/Scrolline";
import "../assets/styles/Tours.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import ToursBannerImage from "../assets/images/tours.png";
import { getToursData } from "../api/index";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export default function Tours() {
    const { t, currentLang } = useLanguage();
    const { lang } = useParams();
    const toursWrapperRef = useRef(null);
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Загружаем данные туров с API
    useEffect(() => {
        const fetchTours = async () => {
            try {
                setLoading(true);
                const toursData = await getToursData(currentLang);
                setTours(toursData.data || toursData || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching tours:', err);
                setError('Failed to load tours');
                setTours([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTours();
    }, [currentLang]);

    // GSAP анимации для изображений
    useEffect(() => {
        if (tours.length === 0) return;

        const tourElements = toursWrapperRef.current?.querySelectorAll('.image_block img');

        if (tourElements) {
            tourElements.forEach((imageBlock, index) => {
                // Определяем направление: четные (index 1,3,5...) слева, нечетные (index 0,2,4...) справа
                const isEven = (index + 1) % 2 === 0; // +1 чтобы считать с 1-го элемента
                const fromDirection = isEven ? 1000 : -1000; // четные слева (-), нечетные справа (+)

                // Устанавливаем начальное состояние
                gsap.set(imageBlock, {
                    x: fromDirection,
                });

                // Создаем анимацию появления при скролле
                ScrollTrigger.create({
                    trigger: imageBlock,
                    start: "top 80%",
                    end: "bottom 50%",
                    animation: gsap.to(imageBlock, {
                        x: 0,
                        duration: 1,
                        ease: "power2.out"
                    }),
                    scrub: 1
                });
            });
        }

        // Cleanup функция для удаления ScrollTrigger при размонтировании
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [tours]); // Запускаем анимации после загрузки туров

    // Компонент загрузки
    if (loading) {
        return (
            <>
                <Page_big_banner
                    title={t("tours.title")}
                    subtitle={t("tours.subtitle")}
                    bannerImageSrc={ToursBannerImage}
                />
                <Scrollline maxProgress={100} />
                <section className="tours_section">
                    <div className="container">
                        <div className="row">
                            <div className="loading-container">
                                <div className="loading-spinner">
                                    {t('common.loading', 'Loading tours...')}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    // Компонент ошибки
    if (error) {
        return (
            <>
                <Page_big_banner
                    title={t("tours.title")}
                    subtitle={t("tours.subtitle")}
                    bannerImageSrc={ToursBannerImage}
                />
                <Scrollline maxProgress={100} />
                <section className="tours_section">
                    <div className="container">
                        <div className="row">
                            <div className="error-container">
                                <p>{t('common.error', 'Error loading tours. Please try again.')}</p>
                                <button 
                                    onClick={() => window.location.reload()} 
                                    className="btn btn-primary"
                                >
                                    {t('common.retry', 'Retry')}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <Page_big_banner
                title={t("tours.title")}
                subtitle={t("tours.subtitle")}
                bannerImageSrc={ToursBannerImage}
            />
            <Scrollline maxProgress={100} />

            <section className="tours_section">
                <div className="container">
                    <div className="row">
                        <div className="tours_wrapper" ref={toursWrapperRef}>
                            {tours.map((tour, index) => (
                                <div key={tour.id || index} className="tour_element">
                                    <div className="image_block">
                                        <img
                                            src={tour.image || ToursBannerImage}
                                            alt={tour.title || `Tour ${index + 1}`}
                                            onError={(e) => {
                                                e.target.src = ToursBannerImage; // Fallback изображение
                                            }}
                                        />
                                    </div>
                                    <div className="details_block">
                                        <h2>{tour.title}</h2>
                                        <p>{tour.excerpt}</p>
                                        <div className="tour-meta">
                                            {tour.duration && (
                                                <span className="duration">{tour.duration}</span>
                                            )}
                                            {tour.price && (
                                                <span className="price">
                                                    From ${tour.price}
                                                </span>
                                            )}
                                        </div>
                                        <Link
                                            to={`/${lang}/tours/${tour.slug}`}
                                            className="btn btn-primary"
                                        >
                                            {t('tours.learnMore', 'Learn More')}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
