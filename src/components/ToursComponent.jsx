import { useLanguage } from "../context/LanguageContext";
import "../assets/styles/ToursCmponents.scss";
import { translations } from "../translations";
import { useTours } from "../context/TourContext";

function ToursComponent() {
  const { t, lang } = useLanguage();
  const { tours, loading: isLoading } = useTours();

  const slugs = translations[lang]?.routes || {};
  if (isLoading) {
    return <div>{t("common.loading", "Loading...")}</div>;
  }
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
                <h6 className="subtitle"
                  data-aos="flip-up"
                  data-aos-delay="100"
                  data-aos-duration="800"
                  data-aos-mirror="true"
                >{t("ToursComponent.subtitle")}</h6>
                <h5
                  className="text_details_section_title"
                  data-aos="flip-up"
                  data-aos-delay="200"
                  data-aos-duration="800"
                  data-aos-mirror="true">
                  {t("ToursComponent.title")}
                </h5>
              </div>
              <div className="tours_grid">
                {tours.slice(0, 3).map((tour, index) => (
                  <div className="tour_card" key={index}>
                    <div className="tour_image tour_image_1">
                      <a
                        href={`/${lang}/tours/${tour.slug[lang] || tour.slug.en
                          }`}
                          data-aos="fade-down"
                          data-aos-delay={`${300 + index * 200}`}
                          data-aos-duration="800"
                          data-aos-mirror="true"
                      >
                        <img
                          height="319"
                          width="506"
                          src={
                            tour.image ||
                            `/src/assets/images/tours/${index + 1}.png`
                          }
                          alt={tour.title}
                        />
                      </a>
                    </div>
                    <div className="tour_info">
                      <h6 className="tour_title" data-aos="fade-down" data-aos-delay={`${300 + index * 200}`} data-aos-duration="800" data-aos-mirror="true">{tour.title}</h6>
                      <div className="tour_desc" data-aos="fade-down" data-aos-delay={`${300 + index * 200}`} data-aos-duration="800" data-aos-mirror="true">{tour.excerpt}</div>
                    </div>
                    <div className="button_wrapper">
                      <a
                        href={`/${lang}/tours/${tour.slug[lang] || tour.slug.en
                          }`}
                        className="btn btn-primary"
                        data-aos="fade-down"
                        data-aos-delay={`${300 + index * 200}`}
                        data-aos-duration="800"
                        data-aos-mirror="true"
                      >
                        {t("tour.bookingLink", "Book Now")}
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bottom_button_wrapper">
                <a
                  href={`/${lang}/${slugs.tours || "tours"}`}
                  className="btn btn-secondary"
                  data-aos="fade-in"
                  data-aos-delay={`${300 + 3 * 200}`}
                  data-aos-duration="800"
                  data-aos-mirror="true"
                >
                  {t("ToursComponent.btn", "Discover all tours")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ToursComponent;
