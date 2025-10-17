import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import '../assets/styles/Trip.scss'

function BookTrip() {
  const { t } = useLanguage();
  return (
    <div className="trip_section bg_black">
        <div className="triangle_decor triangle_decor_top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="55" viewBox="0 0 1920 55" fill="none">
                        <path d="M1920 0.654785L0 54.3096V0.654785H1920Z" fill="white" />
                    </svg>
                </div>
      <div className="container">
        <div className="inner">
          <div className="left_section">
            <div className="desc_text">
                {t("BookTrip.desc")}
            </div>

            <button className="trip_button">Book a trip</button>
          </div>
          <div className="right_section">

          </div>
        </div>
      </div>
      <div className="triangle_decor triangle_decor_bottom">
                    <svg width="1920" height="54" viewBox="0 0 1920 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 53.9644L1920 0.30957V53.9644H0Z" fill="white" />
                    </svg>
                </div>
    </div>
  );
}

export default BookTrip;
