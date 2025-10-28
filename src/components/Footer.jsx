
import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { useSettings } from "../context/SettingsContext";
import "../assets/styles/Footer.scss";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";


export default function Footer() {
    const { t, lang } = useLanguage();
    const { settings, loading: settingsLoading } = useSettings();
    const currentYear = new Date().getFullYear();
    const [bgLoaded, setBgLoaded] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setBgLoaded(true);
                observer.disconnect();
            }
        }, { rootMargin: '100px' });
        
        const footer = document.querySelector('.footer');
        if (footer) observer.observe(footer);
        
        return () => observer.disconnect();
    }, []);

    // console.log("Footer settings:", settings);
    return (
        <>
            <footer className="footer" style={{ backgroundImage: bgLoaded ? "url('/footer_bg.webp')" : 'none' }}>
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
                                            <OptimizedImage
                                                data-aos="fade-in"
                                                data-aos-delay="100"
                                                data-aos-duration="600"
                                                src="/logo_big.svg"
                                                alt="AutoPort Baku Logo"
                                                lazy={true}
                                                width={200}
                                                height={80}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="logo mobile_hidden">
                                    <OptimizedImage
                                        data-aos="fade-in"
                                        data-aos-delay="100"
                                        data-aos-duration="600"
                                        src="/logo_big.svg"
                                        alt="AutoPort Baku Logo"
                                        lazy={true}
                                        width={200}
                                        height={80}
                                    />
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
                                        {
                                            <>
                                                {settings?.address && (
                                                    <li><a href={`${settings.map_link}`} target="_black" className="footer_link">{settings.address}</a></li>
                                                )}

                                                {settings?.telephone && (
                                                    <li>
                                                        <a href="https://wa.link/aoss4j" target="_blank" className="footer_link">
                                                            <div className="whatsapp_contact">
                                                                <span className="whatsapp_icon">
                                                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z" fill="#000000" />
                                                                    </svg>

                                                                </span>
                                                                <span className="whatsapp_text">WhatsApp 24/7</span>
                                                            </div>
                                                        </a>

                                                    </li>

                                                )}
                                                
                                                {settings?.phone && (
                                                    <li><a href={`tel:${settings.phone}`} className="footer_link">{settings.phone}</a></li>
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
                                        }
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

                                        {
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
                                        }
                                    </ul>
                                </div>
                            </div>
                            <div className="copyright_wrapper">
                                <div className="copyright_text"

                                >
                                    © {currentYear} AutoportBaku. All rights reserved.
                                </div>
                                <div className="design_text"


                                >
                                    <span>Made by:</span>
                                    <div className="design_link">
                                        <a href="https://amiroff.az/">
                                            <OptimizedImage
                                                src="/amiroff.svg"
                                                alt="Amiroff Logo"
                                                lazy={true}
                                                width={98}
                                                height={30}
                                            />
                                        </a>
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