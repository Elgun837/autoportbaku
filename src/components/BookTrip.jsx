import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../assets/styles/Trip.scss";
import { translations } from "../translations";
import videoTrip from "/file.mp4";
import OptimizedVideo from "./OptimizedVideo";

function BookTrip() {
  const { t, lang } = useLanguage();
  const slugs = translations[lang]?.routes || {};
  return (
    <>
    <div className="trip_section bg_black">
      <div className="triangle_decor triangle_decor_top">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1920"
          height="55"
          viewBox="0 0 1920 55"
          fill="none"
        >
          <path d="M1920 0.654785L0 54.3096V0.654785H1920Z" fill="white" />
        </svg>
      </div>
      <div className="container">
        <div className="inner">
          <div className="left_section">
            <div className="desc_text"
              data-aos="fade-up"
              data-aos-delay="100"
            >{t("BookTrip.desc")}</div>

            <a href={`/${lang}/${slugs.book || "book-form"}`}
              data-aos="fade-up"
              data-aos-delay="200"
            > <button className="trip_button"><span>{t("BookTrip.buttonText", "Book a trip")}</span></button></a>
          </div>
          <div className="right_section">
            <OptimizedVideo 
              src={videoTrip}
              className="trip_video"
              autoPlay={true}
              muted={true}
              loop={true}
              controls={false}
              lazy={true}
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </div>
      <div className="triangle_decor triangle_decor_bottom">
        <svg
          width="1920"
          height="54"
          viewBox="0 0 1920 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 53.9644L1920 0.30957V53.9644H0Z" fill="white" />
        </svg>
      </div>
    </div>
    </>
  );
}

export default BookTrip;
