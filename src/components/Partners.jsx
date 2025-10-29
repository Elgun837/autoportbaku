// here i want partners slider
import React, { useRef } from 'react';
import '../assets/styles/Partners.scss';
import "../assets/styles/Services.scss";
import { useLanguage } from "../context/LanguageContext";
import { getPartnersData } from "../api/index";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// import OptimizedImage from './OptimizedImage';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const Partners = () => {
    const swiperRef = useRef(null);

    const { t, lang } = useLanguage();
    const { data, isLoading, error } = useQuery({
        queryKey: ["partners", lang],
        queryFn: () => getPartnersData(lang),
    });

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading Partners 😢</p>;
    const partners = Array.isArray(data) ? data : [];

    

    return (
        <>
            <section className="partners_section">
                <div className="container">
                    <div className="row">
                        <div className="inner_slider">                           
                            <div className="text_details">
                                <h6 className="subtitle"
                                    data-aos="flip-up"
                                    data-aos-delay="400"
                                    data-aos-duration="800"
                                    data-aos-mirror="true"
                                >{t("partners.subtitle")}</h6>
                                <h2 className="text_details_section_title"
                                    data-aos="flip-up"
                                    data-aos-delay="500"
                                    data-aos-duration="800"
                                    data-aos-mirror="true"
                                >{t("partners.title")}</h2>
                            </div>
                            <div className='full_nav_block'>
                                <div className='nav_slider'>
                                    <div
                                        className='nav_slider_left'
                                        onClick={() => {
                                            if (swiperRef.current && swiperRef.current.swiper) {
                                                swiperRef.current.swiper.slidePrev();
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="nav_slider_left_svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                                <path d="M15.6259 12.084C15.7302 11.9867 15.814 11.8694 15.872 11.7391C15.9301 11.6087 15.9613 11.468 15.9639 11.3254C15.9664 11.1827 15.9401 11.041 15.8867 10.9087C15.8333 10.7764 15.7537 10.6562 15.6528 10.5553C15.5519 10.4544 15.4318 10.3749 15.2995 10.3215C15.1672 10.268 15.0254 10.2418 14.8828 10.2443C14.7401 10.2468 14.5994 10.278 14.4691 10.3361C14.3388 10.3942 14.2215 10.4779 14.1242 10.5823L8.45752 16.249C8.25855 16.4482 8.14679 16.7182 8.14679 16.9998C8.14679 17.2814 8.25855 17.5514 8.45752 17.7506L14.1242 23.4173C14.2215 23.5217 14.3388 23.6054 14.4691 23.6635C14.5994 23.7216 14.7401 23.7528 14.8828 23.7553C15.0254 23.7578 15.1672 23.7316 15.2995 23.6782C15.4318 23.6247 15.5519 23.5452 15.6528 23.4443C15.7537 23.3434 15.8333 23.2232 15.8867 23.0909C15.9401 22.9586 15.9664 22.8169 15.9639 22.6742C15.9613 22.5316 15.9301 22.3909 15.872 22.2605C15.814 22.1302 15.7302 22.0129 15.6259 21.9156L11.7725 18.0623H25.5C25.7818 18.0623 26.0521 17.9504 26.2513 17.7511C26.4506 17.5519 26.5625 17.2816 26.5625 16.9998C26.5625 16.718 26.4506 16.4478 26.2513 16.2485C26.0521 16.0493 25.7818 15.9373 25.5 15.9373H11.7725L15.6259 12.084Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div
                                        className='nav_slider_right'
                                        onClick={() => {
                                            if (swiperRef.current && swiperRef.current.swiper) {
                                                swiperRef.current.swiper.slideNext();
                                            }
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className="nav_slider_left_svg">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                                                <path d="M18.3742 12.084C18.2698 11.9867 18.1861 11.8694 18.128 11.7391C18.0699 11.6087 18.0387 11.468 18.0362 11.3254C18.0337 11.1827 18.0599 11.041 18.1133 10.9087C18.1668 10.7764 18.2463 10.6562 18.3472 10.5553C18.4481 10.4544 18.5683 10.3749 18.7006 10.3215C18.8329 10.268 18.9746 10.2418 19.1172 10.2443C19.2599 10.2468 19.4006 10.278 19.5309 10.3361C19.6613 10.3942 19.7786 10.4779 19.8758 10.5823L25.5425 16.249C25.7415 16.4482 25.8532 16.7182 25.8532 16.9998C25.8532 17.2814 25.7415 17.5514 25.5425 17.7506L19.8758 23.4173C19.7786 23.5217 19.6613 23.6054 19.5309 23.6635C19.4006 23.7216 19.2599 23.7528 19.1172 23.7553C18.9746 23.7578 18.8329 23.7316 18.7006 23.6782C18.5683 23.6247 18.4481 23.5452 18.3472 23.4443C18.2463 23.3434 18.1668 23.2232 18.1133 23.0909C18.0599 22.9586 18.0337 22.8169 18.0362 22.6742C18.0387 22.5316 18.0699 22.3909 18.128 22.2605C18.1861 22.1302 18.2698 22.0129 18.3742 21.9156L22.2275 18.0623H8.50001C8.21822 18.0623 7.94797 17.9504 7.74871 17.7511C7.54945 17.5519 7.43751 17.2816 7.43751 16.9998C7.43751 16.718 7.54945 16.4478 7.74871 16.2485C7.94797 16.0493 8.21822 15.9373 8.50001 15.9373H22.2275L18.3742 12.084Z" fill="black" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="partners_slider">
                                <Swiper
                                    ref={swiperRef}
                                    modules={[Navigation, Pagination, Autoplay]}
                                    spaceBetween={30}
                                    slidesPerView={5}
                                    breakpoints={{
                                        320: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        580: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 30,
                                        },
                                        992: {
                                            slidesPerView: 4,
                                            spaceBetween: 30,
                                        },
                                        1200: {
                                            slidesPerView: 5,
                                            spaceBetween: 30,
                                        },
                                        1920: {
                                            slidesPerView: 5,
                                            spaceBetween: 30,
                                        },
                                    }}
                                    mousewheel={
                                        {
                                            forceToAxis: true,
                                            sensitivity: 1,
                                            releaseOnEdges: true, // This is crucial for preventing page jump
                                        }
                                    }
                                    
                                    autoplay={{
                                        delay: 3000,
                                    }}
                                    loop={partners.length > 3}
                                    className="partners_swiper"
                                >
                                    {partners.map((partner, index) => (
                                        <SwiperSlide key={index}>
                                            <div className="partner_logo">
                                                <div className="logo_container">
                                                    <a href={partner.link} target="_blank" rel="noopener noreferrer">
                                                        
                                                        <img loading="lazy" width="121" height="121" src={partner.image} alt={`Partner ${index + 1}`} />
                                                    </a>
                                                </div>
                                                <div className="separator">
                                                    <div className="line"></div>
                                                </div>
                                                <p className="description">
                                                    {partner.text}
                                                </p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


export default Partners;
