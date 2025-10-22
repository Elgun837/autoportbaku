import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Services.scss";
import { useLanguage } from "../context/LanguageContext";
import { getServiceData } from "../api/index";
import { useQuery } from "@tanstack/react-query";

export default function Services() {


  const { t, lang } = useLanguage();
  const { data, isLoading, error } = useQuery({
    queryKey: ["services", lang],
    queryFn: () => getServiceData(lang),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Services 😢</p>;
  const services = Array.isArray(data) ? data : [];
  return (
    <div>
      <section className="services_section">
        <div className="services_container">
          <div className="inner">
            <div className="services_heading"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              data-aos-mirror="true">
              <h4>{t("services.title")}</h4>
            </div>
            <div className="services_items">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={`/${lang}/services/${service.slug[lang]}`}
                  className="service_item "
                  data-aos="flip-left"
                  data-aos-delay={600 + index * 100}
                  data-aos-duration="800"
                  data-aos-mirror="true"
                >
                  <div className="icon">
                    <img src={service.main_image} alt={service.title} />
                  </div>
                  <h6 className="service_title">{service.mini_title}</h6>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
