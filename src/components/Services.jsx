import {useEffect} from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Services.scss";
import { useLanguage } from "../context/LanguageContext";
import { useServices } from "../context/ServiceContext";

export default function Services() {
  

  const { t, lang } = useLanguage();
  const { services, loading } = useServices();

  if (loading || services.length === 0) {
    return null; // Yüklənmə zamanı heç nə göstərmirik
  }

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
                  to={`/${lang}/services/${service.slug[lang]}`} 
                  className="service_item"
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
