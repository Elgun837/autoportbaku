import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServicesSlug } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/ServiceDetail.scss";
import { useQuery } from "@tanstack/react-query";

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
  console.log("service", service);

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
          title={service.title || "Service Details"}
          subtitle={service.subtitle || ""}
          bannerImageSrc={service.banner || service.banner || ""}
        />

        <section className="service-detail">
          <div className="container">
            <div className="row">
              <div className="service-detail-content">
                <h2>{service.title}</h2>
                <p>{service.subtitle}</p>
                <p>{service.mini_title}</p>
                <p>{service.text}</p>
                <p>{service.additional_text.title[lang]}</p>
                <p>{service.main_image}</p>
                <p>{service.image_1}</p>
                <p>{service.banner_2}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
