import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServicesSlug } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/ServiceDetail.scss";
import { useQuery } from "@tanstack/react-query";
import Scrollline from "../components/Scrolline";
import SectionTitle from "../components/SectionTitle";

export default function ServiceDetail() {
  const { t, lang } = useLanguage();
  const { slug } = useParams();

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


  if (isError || !service) {
    return (
      <>
        <Page_big_banner bannerImageSrc="" />
      </>
    );
  }

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
                    <p>{service.text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="inner">
                <div className="image_descr">
                  <div className="image_descr_inner">
                    <div className="image_block">
                      <img src={service.image_1} alt={service.title} />
                    </div>
                    <div className="descr_block">
                      <div className="description_content">
                        <p>увуа</p>
                        <img src={service.banner_2} alt="" />
                      </div>
                    </div>
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
