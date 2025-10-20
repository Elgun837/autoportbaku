import react from "react";
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
            <div className="services_heading">
              <h4>{t("services.title")}</h4>
            </div>
            <div className="services_items">
              {services.map((service, index) => (
                <Link 
                   key={index} 
                  to={`/${lang}/services/${service.slug || service.id}`} 
                  className="service_item"
                >
                  <div className="icon">
                    <img src={service.main_image} alt={service.title} />
                  </div>
                  <div className="service_title">{service.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
