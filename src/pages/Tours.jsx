import React from "react";
import Scrollline from "../components/Scrolline";
import "../assets/styles/Tours.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import ToursBannerImage from "../assets/images/tours.png";

export default function Tours() {
    const { t } = useLanguage();
    return (
        <>
            <Page_big_banner
                title={t("tours.title")}
                subtitle={t("tours.subtitle")}
                bannerImageSrc={ToursBannerImage}
            />
            <Scrollline maxProgress={100} />
            <section className="tours_section">
                <div className="container">
                    <div className="row">
                        <div className="tours_inner" style={{ height: '200vh', padding: '2rem' }}>
                            <h2>Tours Content</h2>
                            <p>Scroll down to see the progress bar animation in action!</p>
                            <div style={{ height: '50vh', background: '#f0f0f0', margin: '2rem 0', padding: '2rem' }}>
                                <h3>Section 1</h3>
                                <p>This is some content to make the page scrollable... First progress bar reaches 50%</p>
                            </div>
                            <div style={{ height: '50vh', background: '#e0e0e0', margin: '2rem 0', padding: '2rem' }}>
                                <h3>Section 2</h3>
                                <p>More content for scrolling...</p>
                            </div>
                            <div style={{ height: '50vh', background: '#d0d0d0', margin: '2rem 0', padding: '2rem' }}>
                                <h3>Section 3</h3>
                                <p>Even more content... Second progress bar reaches 75%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Scrollline maxProgress={100} />
        </>
    );
}
