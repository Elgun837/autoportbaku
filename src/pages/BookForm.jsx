import React from 'react';
import '../assets/styles/BookForm.scss';
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import FormImage from "../assets/images/form-bg_block.webp";
import MultiStepForm from "../components/MultiStepForm";

const BookForm = () => {
    const { t } = useLanguage();
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
                                    <a href="tel:(+994) 50 -481-00-81">(+994) 50 -481-00-81</a>
                                    <a href="tel:(+994) 50 -481-00-81">(+994) 50 -481-00-81</a>
                                    <a href="mailto:info@autoportbaku.com">info@autoportbaku.com</a>
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
