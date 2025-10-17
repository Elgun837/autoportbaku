import react from "react";
import "../assets/styles/Services.scss";
import { useLanguage } from "../context/LanguageContext";
import { getServiceData } from "../api";
import { useQuery } from "@tanstack/react-query";

export default function Services() {
  const { t } = useLanguage();
  const { lang } = useLanguage();
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
                <div key={index} className="service_item">
                  <div className="icon">
                    <img src={service.image} alt={service.title} />
                  </div>
                  <div className="service_title">{service.title}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
