import React from "react";
import "../assets/styles/Faq.scss";
import Page_small_banner from "../components/Page_small_banner";
import Accordion from "../components/Accordion";
import { useLanguage } from "../context/LanguageContext";
import faqBannerImage from "../assets/images/faq_banner.webp";
import SEOHead from "../components/SEOHead";


export default function Faq() {
    const { t } = useLanguage();

    const faqItems = t("faq.items", { returnObjects: true });
    
    return (
        <>
            <SEOHead
                pageType="faqPage"
                routeKey={t("routes.faq")}
            />
           
            <Page_small_banner
                title={t("faq.title")}
                subtitle={t("faq.subtitle")}
                bannerImageSrc={faqBannerImage}
            />
            <section className="faq_section">
                <div className="container">
                    <div className="row">
                        <div className="blocks_holder">
                            
                            <div className="right_block">
                                <div className="faq_inner">
                                    <div className="faq_elements">
                                        <Accordion items={faqItems} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
           
        </>
    );
};
