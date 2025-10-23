import react from "react";
import "../assets/styles/WhyUs.scss";
import { useLanguage } from "../context/LanguageContext";

export default function WhyUs() {
    const { t } = useLanguage();
    return (
        <>
            <section className="why_us_section">
                <div className="container">
                    <div className="row">
                        <div className="inner_why_us_section">
                            <div className="text_details"
                            >
                                <h6 className="subtitle"
                                    data-aos="flip-up"
                                    data-aos-delay="200"
                                    data-aos-duration="800"
                                    data-aos-mirror="true"
                                >{t("whyUs.subtitle")}</h6>
                                <h2 className="text_details_section_title"
                                    data-aos="flip-up"
                                    data-aos-delay="300"
                                    data-aos-duration="800"
                                    data-aos-mirror="true"
                                >{t("whyUs.title")}</h2>
                            </div>
                            <div className="why_us_wrapper"                               
                                style={{ backgroundImage: "url('/src/assets/images/comfort.webp')" }}>
                                <div className="why_us_wrapper_items">
                                    {/* item */}
                                    <div className="why_us_wrapper_item"
                                        data-aos="zoom-in"
                                        data-aos-delay="300"
                                        data-aos-duration="600"
                                        data-aos-mirror="true">
                                        <div className="item_container">
                                            <div className="icon">
                                                <img width="150" height="150" src="/src/assets/images/icons/Affordable prices.png" alt="icon" />
                                            </div>
                                            <div className="info">
                                                <h6>{t("whyUs.affordablePrices")}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    {/* item */}
                                    <div className="why_us_wrapper_item"
                                        data-aos="zoom-in"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                        data-aos-mirror="true">
                                        <div className="item_container">
                                            <div className="icon">
                                                <img width="150" height="150" src="/src/assets/images/icons/Cancellation free of charge.png" alt="icon" />
                                            </div>
                                            <div className="info">
                                                <h6> {t("whyUs.cancellationFree")}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    {/* item */}
                                    <div className="why_us_wrapper_item"
                                        data-aos="zoom-in"
                                        data-aos-delay="500"
                                        data-aos-duration="600"
                                        data-aos-mirror="true">
                                        <div className="item_container">
                                            <div className="icon">
                                                <img width="150" height="150" src="/src/assets/images/icons/Secure payment.png" alt="icon" />
                                            </div>
                                            <div className="info">
                                                <h6> {t("whyUs.securePayment")}</h6>
                                            </div>
                                        </div>
                                    </div>
                                    {/* item */}
                                    <div className="why_us_wrapper_item"
                                        data-aos="zoom-in"
                                        data-aos-delay="600"
                                        data-aos-duration="600"
                                        data-aos-mirror="true">
                                        <div className="item_container">
                                            <div className="icon">
                                                <img width="150" height="150" src="/src/assets/images/icons/247 support.png" alt="icon" />
                                            </div>
                                            <div className="info">
                                                <h6>{t("whyUs.support")}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}