import React, { useEffect, useRef } from "react";
import Scrollline from "../components/Scrolline";
import "../assets/styles/Tours.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import ToursBannerImage from "../assets/images/tours.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Tours() {
    const { t } = useLanguage();
    const toursWrapperRef = useRef(null);

    useEffect(() => {
        const tourElements = toursWrapperRef.current?.querySelectorAll('.image_block img');        
        
        if (tourElements) {
            tourElements.forEach((imageBlock, index) => {
                // Определяем направление: четные (index 1,3,5...) слева, нечетные (index 0,2,4...) справа
                const isEven = (index + 1) % 2 === 0; // +1 чтобы считать с 1-го элемента
                const fromDirection = isEven ? 1100 : -1100; // четные слева (-), нечетные справа (+)
                
                // Устанавливаем начальное состояние
                gsap.set(imageBlock, {
                    x: fromDirection,                                
                });

                // Создаем анимацию появления при скролле
                ScrollTrigger.create({
                    trigger: imageBlock,
                    start: "top 80%",
                    end: "bottom 20%",
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
    }, []);

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

                            <div className="tour_element">
                                <div className="image_block">
                                    <img src="/src/assets/images/baku.png" alt="Tour 1" />
                                </div>
                                <div className="details_block">
                                    <h2>Baku City Night Tour: Discover the Mysterious and Dazzling</h2>
                                    <p>Experience the enchanting transformation of Baku City at night. Join our captivating night tour and be mesmerized by the dazzling lights and decorations that illuminate the city.</p>
                                    <a href="/book-tour1" className="btn btn-primary">Learn More</a>
                                </div>

                            </div>

                            <div className="tour_element" >
                                <div className="image_block">
                                    <img src="/src/assets/images/baku_night.png" alt="Tour 2" />
                                </div>
                                <div className="details_block">
                                    <h2>Private Baku Night City Tour: Explore with our Local Guide</h2>
                                    <p>Experience the enchanting beauty of Baku at night with our private city tour. Discover hidden corners, iconic landmarks, and fascinating stories with our expert local guide.</p>
                                    <a href="/book-tour2" className="btn btn-primary">Learn More</a>
                                </div>

                            </div>

                            <div className="tour_element" >
                                <div className="image_block">
                                    <img src="/src/assets/images/flame_towers.png" alt="Tour 3" />
                                </div>
                                <div className="details_block">
                                    <h2>Baku City Tour: Discover Baku's Highlights</h2>
                                    <p>Explore Baku’s highlights with expert guides, free photography, and stunning views. Book now for an unforgettable Azerbaijani adventure.</p>
                                    <a href="/book-tour3" className="btn btn-primary">Learn More</a>
                                </div>

                            </div>

                            <div className="tour_element">
                                <div className="image_block">
                                    <img src="/src/assets/images/kanyon.png" alt="Tour 2" />
                                </div>
                                <div className="details_block">
                                    <h2>Private Baku Night City Tour: Explore with our Local Guide</h2>
                                    <p>Experience the enchanting beauty of Baku at night with our private city tour. Discover hidden corners, iconic landmarks, and fascinating stories with our expert local guide.</p>
                                    <a href="/book-tour2" className="btn btn-primary">Learn More</a>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>           
        </>
    );
}
