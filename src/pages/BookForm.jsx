import React from 'react';
import '../assets/styles/BookForm.scss';
import { useLanguage } from "../context/LanguageContext";
import { useSettings } from "../context/SettingsContext";
import Page_big_banner from "../components/Page_big_banner";
import FormImage from "/form-bg_block.webp";
import MultiStepForm from "../components/MultiStepForm";

const BookForm = () => {
    const { t } = useLanguage();
    const { settings, loading: settingsLoading } = useSettings();
    return (
        <>
            <Page_big_banner title={t("form.title")} subtitle={t("form.subtitle")} bannerImageSrc={FormImage} />

            <section className="book-form_section">
                <div className="container">
                    <div className="row">
                        <div className="book_form__content">
                            <div className="contact_info">
                                <h6> {t("form.contactInfo")} </h6>
                                <div className="info_block">
                                    {settings?.phone && (
                                        <a href={`tel:${settings.phone}`}>{settings.phone}</a>
                                    )}
                                    {settings?.telephone && (
                                        <a href={`tel:${settings.telephone}`}>{settings.telephone}</a>
                                    )}
                                    {settings?.email && (
                                        <a href={`mailto:${settings.email}`}>{settings.email}</a>
                                    )}
                                    
                                    {/* Fallback если API не работает */}
                                    {!settings && !settingsLoading && (
                                        <>
                                            <a href="tel:(+994) 50 -481-00-81">(+994) 50 -481-00-81</a>
                                            <a href="tel:(+994) 50 -481-00-81">(+994) 50 -481-00-81</a>
                                            <a href="mailto:info@autoportbaku.com">info@autoportbaku.com</a>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="form_block">
                                <MultiStepForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>


    );
};

export default BookForm;
