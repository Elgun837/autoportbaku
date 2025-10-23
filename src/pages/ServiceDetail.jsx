import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServicesSlug } from "../api/index";
import { getVehicleData } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/ServiceDetail.scss";
import "../assets/styles/FleetSection.scss";
import { useQuery } from "@tanstack/react-query";
import Scrollline from "../components/Scrolline";
import SectionTitle from "../components/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { tr } from "date-fns/locale";

export default function ServiceDetail() {
  const { t, lang } = useLanguage();
  const { slug } = useParams();
  const fleetSwiperRef = useRef(null);

  // Simple autoplay for fleet slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (fleetSwiperRef.current && fleetSwiperRef.current.swiper) {
        fleetSwiperRef.current.swiper.slideNext();
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // API sorğusu (slug və lang əsasında)
  const {
    data: serviceData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["service", lang, slug],
    queryFn: () => getServicesSlug(lang, slug),
    enabled: !!slug && !!lang,
  });

  const serviceArray = Array.isArray(serviceData)
    ? serviceData
    : Array.isArray(serviceData?.data)
      ? serviceData.data
      : [];

  const service = serviceArray[0] || null;

  const {
    data: vehicleData,
    isLoading: isVehicleLoading,
    isError: isVehicleError,
  } = useQuery({
    queryKey: ["vehicle", lang, slug],
    queryFn: () => getVehicleData(lang, slug),
    enabled: !!slug && !!lang,
  });

  // Process vehicle data
  const vehicleArray = Array.isArray(vehicleData)
    ? vehicleData
    : Array.isArray(vehicleData?.data)
      ? vehicleData.data
      : [];

  if (isError || isVehicleError || !service) {
    return (
      <>
        <Page_big_banner bannerImageSrc="" />
      </>
    );
  }

  // console.log("Service Data:", service);
  // console.log(vehicleData);

  return (
    <>
      <div className="services-detail">
        <Page_big_banner
          title={service.mini_title || "Service Details"}
          subtitle={service.subtitle || ""}
          bannerImageSrc={service.banner || service.banner || ""}
        />
        <Scrollline maxProgress={100} />
        <SectionTitle sectionHeadingBig={service.title} sectionHeadingSmall="" />
        <section className="service-detail">
          <div className="container">
            <div className="row">
              <div className="inner">
                <div className="title_small_text">
                  <div className="title_small_text_wrapper">
                    <p
                      data-aos="fade-up"
                      data-aos-delay="200"
                      data-aos-duration="800"
                      data-aos-mirror="true"
                    >{service.text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="inner">
                <div className="image_descr">
                  <div className="image_descr_inner">
                    <div className="image_block">
                      <img
                      data-aos="fade-in"
                      data-aos-delay="200"
                      data-aos-duration="800"
                      data-aos-mirror="true"
                       width="750" height="549" src={service.image_1} alt={service.title} />
                    </div>
                    <div className="descr_block">
                      {service.additional_text && service.additional_text.map((item, index) => (
                        <div className="description_content" key={index}>
                          <h5
                            data-aos="fade-up"
                            data-aos-delay={200 + index * 100}
                            data-aos-duration="800"
                            data-aos-mirror="true"
                          >{item.title[lang] || item.title.en}</h5>
                          <p
                            data-aos="fade-up"
                            data-aos-delay={300 + index * 100}
                            data-aos-duration="800"
                            data-aos-mirror="true"
                          >{item.text[lang] || item.text.en}</p>
                          <div className="separator"
                            data-aos="fade-up"
                            data-aos-delay={400 + index * 100}
                            data-aos-duration="800"
                            data-aos-mirror="true"
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="service-banner-2">
          <div className="banner_2_holder"
           
          >
            <img 
             data-aos="zoom-up"
            data-aos-delay="300"  
            data-aos-duration="400"
            data-aos-mirror="true"
            src={service.banner_2} alt={service.title} />
          </div>
        </section>
        <section className="fleet_section">
          <div className="container">
            <div className="row">
              <div className="fleet_inner">
                <div className="fleet_title">
                  <h2
                    data-aos="fade-down"
                    data-aos-delay="200"
                    data-aos-duration="800"
                    data-aos-mirror="true"
                  >{t("fleet.title")}</h2>
                  <p
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="800"
                    data-aos-mirror="true"
                  >{t("fleet.description")}</p>
                </div>
                <div className="fleet_cars">

                  <div className="fleet_cars_slider">
                    <Swiper
                      ref={fleetSwiperRef}
                      modules={[Navigation, Pagination]}
                      spaceBetween={30}
                      slidesPerView={1}
                      allowTouchMove={true}
                      grabCursor={true}
                      onTouchStart={() => {
                        stopAutoplay();
                      }}
                      onTouchEnd={() => {
                        setTimeout(() => {
                          startAutoplay();
                        }, 2000);
                      }}
                      onMouseEnter={() => {
                        stopAutoplay();
                      }}
                      onMouseLeave={() => {
                        startAutoplay();
                      }}
                      scrollbar={{
                        draggable: true,
                        hide: false,
                      }}
                      breakpoints={{
                        576: {
                          slidesPerView: 2,
                          spaceBetween: 20,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 25,
                        },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                        1200: {
                          slidesPerView: 4,
                          spaceBetween: 30,
                        },
                        1440: {
                          slidesPerView: 5,
                          spaceBetween: 30,
                        },
                      }}

                      loop={vehicleArray.length > 3}
                      className="fleet_swiper"
                    >
                      {vehicleArray.map((vehicle, index) => (
                        <SwiperSlide key={vehicle.id || index}>
                          <div className="car_item">
                            <div className="car_image">
                              <img
                                data-aos="fade-in"
                                data-aos-delay="200"
                                data-aos-duration="800"
                                data-aos-mirror="true"
                              src={vehicle.image} alt={vehicle.title} />
                            </div>
                            <div className="car_info">
                              <h4 className="car_title"
                                data-aos="fade-up"
                                data-aos-delay="300"
                                data-aos-duration="800"
                                data-aos-mirror="true"
                              >{vehicle.title}</h4>

                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
