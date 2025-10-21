import { use } from "react";
import { useLanguage } from "../context/LanguageContext";
import "../assets/styles/ToursCmponents.scss";
import { getToursData } from "../api";
import { useQuery } from "@tanstack/react-query";
import { translations } from "../translations";

function BookTrip() {
  const { t, lang } = useLanguage();
  const {
    data: toursData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tours", lang],
    queryFn: () => getToursData(lang),
  });
  const tours = Array.isArray(toursData)
    ? toursData
    : Array.isArray(toursData?.data)
    ? toursData.data
    : [];


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
                <h6 className="subtitle">{t("ToursComponent.subtitle")}</h6>
                <h5 className="text_details_section_title">
                  {t("ToursComponent.title")}
                </h5>
              </div>
              <div className="tours_grid">
                {tours.slice(0, 3).map((tour, index) => (
                  <div className="tour_card" key={index}>
                    <div className="tour_image tour_image_1">
                      <a
                        href={`/${lang}/tours/${
                          tour.slug[lang] || tour.slug.en
                        }`}
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
                      <h6 className="tour_title">{tour.title}</h6>
                      <div className="tour_desc">{tour.excerpt}</div>
                    </div>
                    <div className="button_wrapper">
                      <a
                        href={`/${lang}/tours/${
                          tour.slug[lang] || tour.slug.en
                        }`}
                        className="btn btn-primary"
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

export default BookTrip;
