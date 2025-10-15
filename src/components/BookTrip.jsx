import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import '../assets/styles/Trip.scss'

function BookTrip() {
  const { t } = useLanguage();
  return (
    <div className="trip_section bg_black">
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
    </div>
  );
}

export default BookTrip;
