import React, { useEffect } from "react";
import "../assets/styles/Slide.scss";
import MultiStepForm from "./MultiStepForm";
import { useLanguage } from "../context/LanguageContext";
import OptimizedImage from "./OptimizedImage";

export default function Slide() {
  const { t } = useLanguage();
  
  // Preload критического фонового изображения
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = '/bg_block.webp';
    link.type = 'image/webp';
    link.fetchPriority = 'high';
    document.head.appendChild(link);
    
    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);
  
  return (
    <>
    
      <div className="main_bg ">
        <div className="slide_container small_heading_banner">
          <OptimizedImage
            src="/bg_block.webp"
            alt="Background"
            className="banner_image"
            lazy={false} // Главное изображение - загружаем сразу
            fetchpriority="high" // Высокий приоритет загрузки
            style={{             
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
