import React from "react";
import "../assets/styles/Page_banners.scss";
import defaultBannerImage from "../assets/images/small_heading_banner.png";

export default function Page_big_banner({ title, subtitle, bannerImageSrc }) {
    const bannerImage = bannerImageSrc || defaultBannerImage;
    
    // Отладочная информация
    // console.log("Page_big_banner props:", { title, subtitle, bannerImageSrc });
    // console.log("Final banner image:", bannerImage);
    // console.log("Default banner image:", defaultBannerImage);
    
    return (
        <>
            <section className="small_heading_banner small_heading_banner__big">
                <img className="banner_image" src={bannerImage} alt="Banner" />
                <div className="container">
                    <div className="row">
                        <div className="inner">
                            <div className="full_container">
                                <div className="w70_block">
                                    <div className="page_title_wrapper">
                                        <h1 className="page_title">{title}</h1>
                                        <h5 className="page_subtitle">{subtitle}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="triangle_decor">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="54" viewBox="0 0 1920 54" fill="none">
                        <path d="M0 53.6548L1920 0V53.6548H0Z" fill="white" />
                    </svg>
                </div>
            </section>
        </>
    );
}