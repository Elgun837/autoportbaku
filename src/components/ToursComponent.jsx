import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import '../assets/styles/ToursCmponents.scss'


function BookTrip() {
  const { t } = useLanguage();
  return (
    <>
      <section className="tours_section_main">
        <div className="container">
          <div className="row">
            <div className="inner">
              <div className="text_details">
                <div className="line_decor">
                  <span></span>
                </div>
                <h6 className="subtitle">{t("ToursComponent.subtitle")}</h6>
                <h5 className="text_details_section_title">{t("ToursComponent.title")}</h5>
              </div>
              <div className="tours_grid">
                <div className="tour_card">
                  <div className="tour_image tour_image_1">
                    <a href="#">
                      <img src='/src/assets/images/tours/1.png' alt="Tour 1" />
                    </a>
                  </div>
                  <div className="tour_info">
                    <h6 className="tour_title">Baku City Night Tour: Discover the Mysterious and Dazzling</h6>
                    <div className="tour_desc">Experience the enchanting transformation of Baku City at night. Join our captivating night tour and be mesmerized by the dazzling lights and decorations that illuminate the city.</div>
                  </div>
                  <div className="button_wrapper">
                    <a href="# " className="btn btn-primary">Book Now</a>
                  </div>
                </div>
                <div className="tour_card">
                  <div className="tour_image tour_image_1">
                    <a href="#">
                      <img src='/src/assets/images/tours/2.png' alt="Tour 2" />
                    </a>
                  </div>
                  <div className="tour_info">
                    <h6 className="tour_title">Baku City Night Tour: Discover the Mysterious and Dazzling</h6>
                    <div className="tour_desc">Experience the enchanting transformation of Baku City at night. Join our captivating night tour and be mesmerized by the dazzling lights and decorations that illuminate the city.</div>
                  </div>
                  <div className="button_wrapper">
                    <a href="# " className="btn btn-primary">Book Now</a>
                  </div>
                </div>

                <div className="tour_card">
                  <div className="tour_image tour_image_1">
                    <a href="#">
                      <img src='/src/assets/images/tours/3.png' alt="Tour 3" />
                    </a>
                  </div>
                  <div className="tour_info">
                    <h6 className="tour_title">Baku City Night Tour: Discover the Mysterious and Dazzling</h6>
                    <div className="tour_desc">Experience the enchanting transformation of Baku City at night. Join our captivating night tour and be mesmerized by the dazzling lights and decorations that illuminate the city.</div>
                  </div>
                  <div className="button_wrapper">
                    <a href="# " className="btn btn-primary">Book Now</a>
                  </div>
                </div>
              </div>

              <div className="bottom_button_wrapper">
                <a href="# " className="btn btn-secondary">Discover all tours</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default BookTrip;
