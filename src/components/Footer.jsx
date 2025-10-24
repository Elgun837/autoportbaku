
import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getSettingsData } from "../api/index";
import "../assets/styles/Footer.scss";
import { Link, useLocation } from "react-router-dom";


export default function Footer() {
    const { t, lang } = useLanguage();
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const settingsData = await getSettingsData(lang);
                setSettings(settingsData?.data || settingsData);

            } catch (error) {
                console.error('Error fetching settings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, [lang]);
     const currentYear = new Date().getFullYear(); 
    return (
        <>
            <footer className="footer">
                <div className="triangle_decor triangle_decor_top">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="55" viewBox="0 0 1920 55" fill="none">
                        <path d="M1920 0.654785L0 54.3096V0.654785H1920Z" fill="white" />
                    </svg>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="footer_content">

                            <div className="logo_menu_wrapper ">
                                <div className="mobile_visible mobile_visible__logo">
                                    <div className="logo_wrapper">
                                        <div className="logo">
                                            <img
                                                data-aos="fade-in"
                                                data-aos-delay="100"
                                                data-aos-duration="600"
                                                src="/logo_big.svg" alt="Logo" />
                                        </div>
                                    </div>
                                </div>
                                <div className="logo mobile_hidden">
                                    <img
                                        data-aos="fade-in"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        src="/logo_big.svg" alt="Logo" />
                                </div>
                                <div className="footer_menu">
                                    <h6 className="footer_menu_title"
                                        data-aos="fade-up"
                                        data-aos-delay="200"
                                        data-aos-duration="600"
                                    > {t("footer.company")} </h6>
                                    <ul className="footer_menu_list"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                        data-aos-duration="600"
                                    >
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/${lang}`}>{t("header.home")}</Link>
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/${lang}/about-us`} >{t("header.about")}</Link>
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/${lang}/tours`} >{t("header.tours")}</Link>
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/${lang}/faq`} >{t("header.faq")}</Link>
                                        <Link onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} to={`/${lang}/contacts`} >{t("header.contacts")}</Link>

                                    </ul>
                                </div>
                                <div className="footer_menu">
                                    <h6 className="footer_menu_title"
                                        data-aos="fade-up"
                                        data-aos-delay="300"
                                        data-aos-duration="600"
                                    > {t("footer.contacts")} </h6>
                                    <ul className="footer_menu_list"
                                        data-aos="fade-up"
                                        data-aos-delay="350"
                                        data-aos-duration="600"
                                    >
                                        {loading ? (
                                            <li className="footer_link">Loading...</li>
                                        ) : (
                                            <>
                                                {settings?.address && (
                                                    <li><a href="https://maps.app.goo.gl/3n1MoL7GDrF7Eb5A7" target="_black" className="footer_link">{settings.address}</a></li>
                                                )}
                                                {settings?.phone && (
                                                    <li><a href={`tel:${settings.phone}`} className="footer_link">{settings.phone}</a></li>
                                                )}
                                                {settings?.telephone && (
                                                    <li><a href={`tel:${settings.telephone}`} className="footer_link">{settings.telephone}</a></li>
                                                )}
                                                {settings?.email && (
                                                    <li><a href={`mailto:${settings.email}`} className="footer_link">{settings.email}</a></li>
                                                )}
                                                {/* Fallback если API не работает */}
                                                {!settings && (
                                                    <>
                                                        <li><span className="footer_link">Azure Business Center, 15 Nobel Avenue</span></li>
                                                        <li><a href="tel:(+994) 50 -481-00-81" className="footer_link">(+994) 50 -481-00-81</a></li>
                                                        <li><a href="tel:(+994) 12-488-67-98" className="footer_link">(+994) 12-488-67-98</a></li>
                                                        <li><a href="mailto:info@bakutransfers.com" className="footer_link">info@bakutransfers.com</a></li>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div className="footer_menu">
                                    <h6 className="footer_menu_title"
                                        data-aos="fade-up"
                                        data-aos-delay="400"
                                        data-aos-duration="600"
                                    > {t("footer.socialMedia")} </h6>
                                    <ul className="footer_menu_list"
                                        data-aos="fade-up"
                                        data-aos-delay="700"
                                        data-aos-duration="600"
                                    >

                                        {loading ? (
                                            <li className="footer_link">Loading...</li>
                                        ) : (
                                            <>
                                                {settings?.facebook && (
                                                    <li><a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="footer_link">Facebook</a></li>
                                                )}
                                                {settings?.instagram && (
                                                    <li><a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="footer_link">Instagram</a></li>
                                                )}
                                                {settings?.tiktok && (
                                                    <li><a href={settings.tiktok} target="_blank" rel="noopener noreferrer" className="footer_link">Tik Tok</a></li>
                                                )}
                                                {/* Fallback если API не работает */}
                                                {!settings && (
                                                    <>
                                                        <li><a href="#" className="footer_link">Facebook</a></li>
                                                        <li><a href="#" className="footer_link">Instagram</a></li>
                                                        <li><a href="#" className="footer_link">Tik Tok</a></li>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="copyright_wrapper">
                                <div className="copyright_text"
                                    data-aos="fade-up"
                                    data-aos-delay="300"
                                    data-aos-duration="600"
                                >
                                © {currentYear} AutoportBaku. All rights reserved.
                                </div>
                                <div className="design_text"
                                    data-aos="fade-up"
                                    data-aos-delay="400"
                                    data-aos-duration="600"
                                >
                                    <span>Made by:</span>
                                    <div className="design_link">
                                        <a href="https://amiroff.az/"><img src="/amiroff.svg" alt="Amiroff Logo" /></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="triangle_decor triangle_decor_bottom">
                    <svg width="1920" height="54" viewBox="0 0 1920 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 53.9644L1920 0.30957V53.9644H0Z" fill="white" />
                    </svg>
                </div>
            </footer>
        </>
    );
}