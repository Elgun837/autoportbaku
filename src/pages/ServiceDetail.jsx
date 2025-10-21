import React, {  useState } from "react";
import { useParams,useNavigate  } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getServiceData } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import "../assets/styles/ServiceDetail.scss";
import { useQuery } from "@tanstack/react-query";

export default function ServiceDetail() {
  const { t, lang } = useLanguage();
  const { slug: originalSlug, id } = useParams();
  const [slug, setSlug] = useState(originalSlug);
  const navigate = useNavigate();
  const [serviceId, setserviceId] = useState(
    () => localStorage.getItem("serviceId") || null
  );
  // API-dən bütün servisleri çəkirik
  const { data, isLoading, isError } = useQuery({
    queryKey: ["service", lang, originalSlug],
    queryFn: async () => getServiceData(lang),
    keepPreviousData: true,
  });
  
  // Data-dan array əldə edirik
  const services = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];
  // id və ya slug-a uyğun turu tapırıq
  const service = React.useMemo(() => {
    if (!services.length) return null;
    return services.find((t) => t.slug === originalSlug);
  }, [services, originalSlug]);
  

  return (
    <>
      {/* <Page_big_banner
        // title={service.title || "Service Details"}
        // subtitle={service.shortDescription || ""}
        // bannerImageSrc={service.mainImage || service.image || ""}
      /> */}

      <section className="service-detail">
        <div className="container">
          <div className="row">
            <div className="service-detail-content">
                  test
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
