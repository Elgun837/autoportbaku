import React from "react";
import "../assets/styles/Slide.scss";
import MultiStepForm from "./MultiStepForm";
import SkeletonSlide from "./SkeletonSlide";
import useImageLoading from "../hooks/useImageLoading";
import { useLanguage } from "../context/LanguageContext";

export default function Slide() {
  const { isLoading, imageLoaded } = useImageLoading("/bg_block.webp", 1000, 3000);
  const { t } = useLanguage();

  if (isLoading) {
    return <SkeletonSlide />;
  }
  return (
    <>
      <div className="main_bg slide-fade-in">
        <div className="slide_container small_heading_banner">
          <img
            src="/bg_block.webp"
            alt=""
            className="banner_image"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
              position: 'absolute',
            }}
          />
          <div className="container">
            <div className="row">
              <div className="slide_inner">
                <div className="text_section">
                  <h1 className="animate__animated animate__zoomIn">{t("slide.title")}</h1>
                  <p className="animate__animated animate__zoomIn">{t("slide.subtitle")}</p>
                </div>
                <div className="form_section ">
                  <MultiStepForm />
                </div>
              </div>
            </div>
          </div>
          <div className="triangle_decor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1920"
              height="54"
              viewBox="0 0 1920 54"
              fill="none"
            >
              <path d="M0 53.6548L1920 0V53.6548H0Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
