import React from "react";
import "../assets/styles/Faq.scss";
import Footer from "../components/Footer";
import Page_small_banner from "../components/Page_small_banner";
import Accordion from "../components/Accordion";
import { useLanguage } from "../context/LanguageContext";

export default function Faq() {
    const { t } = useLanguage();

    const faqItems = t("faq.items", { returnObjects: true });

    return (
        <>
            <Page_small_banner
                title={t("faq.title")}
                subtitle={t("faq.subtitle")}
            />
            <section className="faq_section">
                <div className="container">
                    <div className="row">
                        <div className="blocks_holder">
                            <div className="left_block">
                                <h2>{t("faq.leftTitle")}</h2>
                                <p>{t("faq.leftDescription")}</p>
                            </div>
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
            <Footer />
        </>
    );
};
