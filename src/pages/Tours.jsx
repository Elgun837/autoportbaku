import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import Scrollline from "../components/Scrolline";
import "../assets/styles/Tours.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import ToursBannerImage from "/tours.webp";
import { translations } from "../translations";
import OptimizedImage from "../components/OptimizedImage";
import { useTours } from "../context/TourContext";
import SEOHead from "../components/SEOHead";
import { ToursPageSEO } from '../components/SEOComponents';

// Lazy load GSAP только когда нужно
let gsap = null;
let ScrollTrigger = null;

const loadGSAP = async () => {
  if (!gsap) {
    const gsapModule = await import("gsap");
    const scrollTriggerModule = await import("gsap/ScrollTrigger");
    gsap = gsapModule.default;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
};

export default function Tours() {
  const { t, lang } = useLanguage();
  const toursWrapperRef = useRef(null);
  const { tours, loading, error } = useTours();

  // GSAP анимации для изображений
  useEffect(() => {
    if (tours.length === 0) return;

    const initAnimations = async () => {
      try {
        const { gsap: gsapInstance, ScrollTrigger: ScrollTriggerInstance } = await loadGSAP();
        
        const tourElements = toursWrapperRef.current?.querySelectorAll(".image_block img");

        if (tourElements) {
          tourElements.forEach((imageBlock, index) => {
            // Определяем направление: четные (index 1,3,5...) слева, нечетные (index 0,2,4...) справа
            const isEven = (index + 1) % 2 === 0; // +1 чтобы считать с 1-го элемента
            const fromDirection = isEven ? 1000 : -1000; // четные слева (-), нечетные справа (+)

            // Устанавливаем начальное состояние
            gsapInstance.set(imageBlock, {
              x: fromDirection,
            });

            // Создаем анимацию появления при скролле
            ScrollTriggerInstance.create({
              trigger: imageBlock,
              start: "top 80%",
              end: "bottom 50%",
              animation: gsapInstance.to(imageBlock, {
                x: 0,
                duration: 1,
                ease: "power2.out",
              }),
            });
          });
        }
      } catch (error) {
        console.log('GSAP loading failed, animations disabled:', error);
      }
    };

    initAnimations();

    // Cleanup
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, [tours]);

  if (!lang) return null;

  const routes = translations[lang]?.routes || {};
  // Компонент загрузки
  if (loading) {
    return (
      <>
        <SEOHead
          pageType="toursPage"
          routeKey={t("routes.tours")}
        />
        <ToursPageSEO tour={tours} />
     
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
                  {t("common.loading", "Loading tours...")}
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
                <p>
                  {t("common.error", "Error loading tours. Please try again.")}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-primary"
                >
                  {t("common.retry", "Retry")}
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
                    <OptimizedImage
                      src={tour.image || ToursBannerImage}
                      alt={tour.title || `Tour ${index + 1}`}
                      lazy={false}
                      width={400}
                      height={300}
                      onError={(e) => {
                        e.target.src = ToursBannerImage; // Fallback изображение
                      }}
                    />
                  </div>
                  <div className="details_block">
                    <h2>{tour.title}</h2>
                    <p>{tour.excerpt}</p>

                    <Link
                      to={`/${lang}/${routes.tours}/${tour.slug[lang]}`}
                      className="btn btn-primary"
                      onClick={() => localStorage.setItem("tourId", tour.id)}
                    >
                      {t("tours.learnMore", "Learn More")}
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
