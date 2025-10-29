import { useLanguage } from "../context/LanguageContext";
import "../assets/styles/ToursCmponents.scss";
import { translations } from "../translations";
import { useTours } from "../context/TourContext";
import OptimizedImage from "./OptimizedImage";
import { useServices } from "../context/ServiceContext";
function EventsInner() {
  const { t, lang } = useLanguage();
  const { tours, loading: isLoading } = useTours();
  const { services, loading: serviceLoading } = useServices();
  console.log(services.text_block);
  const slugs = translations[lang]?.routes || {};
  if (isLoading) {
    return <div>{t("common.loading", "Loading...")}</div>;
  }
  console.log(services)
  const events = services
  ?.flatMap(service => service.text_blok || [])
  .filter(item => item && item.title); // boş olanları təmizləmək üçün (optional)

console.log(events);
  return (
    <>
    {events.length > 0 ? (
      <section className="tours_section_main">
        <div className="container">
          <div className="row">
            <div className="inner">
              <div className="tours_grid">
                {events.slice(0, 3).map((block, index) => (
                  <div className="tour_card" key={index}>
                    <div className="tour_image tour_image_1">
                      <a href="javascript:void(0)">
                        <OptimizedImage
                          src={block.image || `/events/${index + 1}.png`}
                          height="319"
                          width="506"
                          alt={block.title?.[lang] || "Event image"}
                          lazy={true}
                        />
                      </a>
                    </div>

                    <div className="tour_info">
                      <h6
                        className="tour_title"
                        data-aos="fade-down"
                        data-aos-delay={`${300 + index * 200}`}
                        data-aos-duration="800"
                        data-aos-mirror="true"
                      >
                        {block.title?.[lang] || block.title?.en || ""}
                      </h6>

                      <div
                        className="tour_desc"
                        data-aos="fade-down"
                        data-aos-delay={`${300 + index * 200}`}
                        data-aos-duration="800"
                        data-aos-mirror="true"
                      >
                        {block.text?.[lang] || block.text?.en || ""}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      ): (
        <></>
      )}
    </>
  );
}

export default EventsInner;
