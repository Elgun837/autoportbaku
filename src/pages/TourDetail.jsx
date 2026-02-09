import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../assets/styles/TourDetail.scss";
import { useTours } from "../context/TourContext";
import SEOHead from "../components/SEOHead";
import { TourDetailSEO } from "../components/SEOComponents";

export default function TourDetail() {
  const { t, lang } = useLanguage();
  const { slug } = useParams();

  const { tours, loading: toursLoading } = useTours();

  // Определяем tour до использования в loading состоянии
  const tour = tours.find((t) => t.slug?.[lang] === slug) || null;

  if (toursLoading) {
    return (
      <>
        <TourDetailSEO tour={tour} />
        <Page_big_banner
          title={t("common.loading", "Loading...")}
          subtitle=""
          bannerImageSrc=""
        />
        <div className="loading-container">
          <div className="loading-spinner">
            {t("common.loading", "Loading tour...")}
          </div>
        </div>
      </>
    );
  }

  if (!tour) {
    return <div>Tour not found</div>;
  }

  // Prepare images for gallery
  const imageUrls = [];
  // if (tour.image) imageUrls.push(tour.image);
  if (tour.gallery) {
    if (typeof tour.gallery === "string") imageUrls.push(tour.gallery);
    if (Array.isArray(tour.gallery)) imageUrls.push(...tour.gallery);
  }

  const images = imageUrls.length
    ? imageUrls.map((url) => ({ original: url, thumbnail: url }))
    : [
        {
          original: "/small_heading_banner.webp",
          thumbnail: "/small_heading_banner.webp",
        },
      ];

  const renderLeftNav = (onClick, disabled) => (
    <button
      className="image-gallery-left-nav custom-nav-arrow"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="14"
        viewBox="0 0 19 14"
        fill="none"
      >
        <path
          d="M7.47906 1.83984C7.58345 1.74256 7.66718 1.62526 7.72526 1.49493C7.78333 1.3646 7.81455 1.22391 7.81707 1.08124C7.81959 0.938581 7.79334 0.796873 7.73991 0.664573C7.68647 0.532273 7.60693 0.412092 7.50604 0.311199C7.40514 0.210306 7.28496 0.130767 7.15266 0.0773292C7.02036 0.0238911 6.87865 -0.00235175 6.73599 0.000165357C6.59333 0.00268247 6.45263 0.033908 6.3223 0.0919799C6.19197 0.150052 6.07467 0.23378 5.9774 0.33817L0.310731 6.00484C0.11176 6.20406 0 6.47411 0 6.75567C0 7.03723 0.11176 7.30728 0.310731 7.5065L5.9774 13.1732C6.07467 13.2776 6.19197 13.3613 6.3223 13.4194C6.45263 13.4774 6.59333 13.5087 6.73599 13.5112C6.87865 13.5137 7.02036 13.4874 7.15266 13.434C7.28496 13.3806 7.40514 13.301 7.50604 13.2001C7.60693 13.0992 7.68647 12.9791 7.73991 12.8468C7.79334 12.7145 7.81959 12.5728 7.81707 12.4301C7.81455 12.2874 7.78333 12.1467 7.72526 12.0164C7.66718 11.8861 7.58345 11.7688 7.47906 11.6715L3.62573 7.81817H17.3532C17.635 7.81817 17.9053 7.70623 18.1045 7.50697C18.3038 7.30771 18.4157 7.03746 18.4157 6.75567C18.4157 6.47388 18.3038 6.20363 18.1045 6.00437C17.9053 5.80511 17.635 5.69317 17.3532 5.69317H3.62573L7.47906 1.83984Z"
          fill="black"
        />
      </svg>
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      className="image-gallery-right-nav custom-nav-arrow"
      disabled={disabled}
      onClick={onClick}
      aria-label="Next image"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="14"
        viewBox="0 0 19 14"
        fill="none"
      >
        <path
          d="M10.937 1.83984C10.8326 1.74256 10.7488 1.62526 10.6908 1.49493C10.6327 1.3646 10.6015 1.22391 10.5989 1.08124C10.5964 0.938581 10.6227 0.796873 10.6761 0.664573C10.7295 0.532273 10.8091 0.412092 10.91 0.311199C11.0109 0.210306 11.1311 0.130767 11.2634 0.0773292C11.3957 0.0238911 11.5374 -0.00235175 11.68 0.000165357C11.8227 0.00268247 11.9634 0.033908 12.0937 0.0919799C12.224 0.150052 12.3413 0.23378 12.4386 0.33817L18.1053 6.00484C18.3043 6.20406 18.416 6.47411 18.416 6.75567C18.416 7.03723 18.3043 7.30728 18.1053 7.5065L12.4386 13.1732C12.3413 13.2776 12.224 13.3613 12.0937 13.4194C11.9634 13.4774 11.8227 13.5087 11.68 13.5112C11.5374 13.5137 11.3957 13.4874 11.2634 13.434C11.1311 13.3806 11.0109 13.301 10.91 13.2001C10.8091 13.0992 10.7295 12.9791 10.6761 12.8468C10.6227 12.7145 10.5964 12.5728 10.5989 12.4301C10.6015 12.2874 10.6327 12.1467 10.6908 12.0164C10.7488 11.8861 10.8326 11.7688 10.937 11.6715L14.7903 7.81817H1.06278C0.780993 7.81817 0.51074 7.70623 0.311483 7.50697C0.112225 7.30771 0.000284195 7.03746 0.000284195 6.75567C0.000284195 6.47388 0.112225 6.20363 0.311483 6.00437C0.51074 5.80511 0.780993 5.69317 1.06278 5.69317H14.7903L10.937 1.83984Z"
          fill="black"
        />
      </svg>
    </button>
  );

  return (
    <>
      <SEOHead
        pageType="toursPage"
        title={tour?.title}
        description={tour?.excerpt}
        basePath={`/${t("routes.tours")}/${tour?.slug?.[lang] || slug}`}
        ogImage={tour?.image}
      />

      <div className="tours_details">
        <Page_big_banner
          title={tour.title}
          subtitle=""
          bannerImageSrc={tour.image}
        />

        <section className="tour-detail">
          <div className="container">
            <div className="row">
              <div className="tour-detail-inner">
                <div className="details_holder">
                  <div className="left_block">
                    {tour.excerpt && (
                      <p className="small_description animate__animated animate__fadeInDown animate__delay-1s">
                        {tour.excerpt}
                      </p>
                    )}
                    <div className="parameters">
                      {tour.duration && (
                        <div className="duration animate__animated animate__fadeInDown">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              d="M9.75 3.75V9.75H14.25M18.75 9.75C18.75 10.9319 18.5172 12.1022 18.0649 13.1942C17.6126 14.2861 16.9497 15.2782 16.114 16.114C15.2782 16.9497 14.2861 17.6126 13.1942 18.0649C12.1022 18.5172 10.9319 18.75 9.75 18.75C8.5681 18.75 7.39778 18.5172 6.30585 18.0649C5.21392 17.6126 4.22177 16.9497 3.38604 16.114C2.55031 15.2782 1.88738 14.2861 1.43508 13.1942C0.982792 12.1022 0.75 10.9319 0.75 9.75C0.75 7.36305 1.69821 5.07387 3.38604 3.38604C5.07387 1.69821 7.36305 0.75 9.75 0.75C12.1369 0.75 14.4261 1.69821 16.114 3.38604C17.8018 5.07387 18.75 7.36305 18.75 9.75Z"
                              stroke="#08529F"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <strong>{t("tour.duration")}:</strong> {tour.duration}
                        </div>
                      )}
                      {tour.cancellation && (
                        <div className="cancellation animate__animated animate__fadeInDown">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.7516 8.75155C10.2516 8.62655 9.75156 8.37655 9.37656 8.00154C9.00155 7.87654 8.87655 7.50154 8.87655 7.25154C8.87655 7.00153 9.00155 6.62653 9.25155 6.50153C9.62656 6.25153 10.0016 6.00152 10.3766 6.12652C11.1266 6.12652 11.7516 6.50153 12.1266 7.00153L13.2516 5.50152C12.8766 5.12651 12.5016 4.87651 12.1266 4.62651C11.7516 4.37651 11.2516 4.25151 10.7516 4.25151V2.50149H9.25155V4.25151C8.62655 4.37651 8.00154 4.75151 7.50154 5.25152C7.00153 5.87652 6.62653 6.62653 6.75153 7.37654C6.75153 8.12654 7.00153 8.87655 7.50154 9.37656C8.12654 10.0016 9.00155 10.3766 9.75156 10.7516C10.1266 10.8766 10.6266 11.1266 11.0016 11.3766C11.2516 11.6266 11.3766 12.0016 11.3766 12.3766C11.3766 12.7516 11.2516 13.1266 11.0016 13.5016C10.6266 13.8766 10.1266 14.0016 9.75156 14.0016C9.25156 14.0016 8.62655 13.8766 8.25155 13.5016C7.87654 13.2516 7.50154 12.8766 7.25154 12.5016L6.00152 13.8766C6.37653 14.3766 6.75153 14.7516 7.25154 15.1266C7.87654 15.5016 8.62655 15.8766 9.37656 15.8766V17.5016H10.7516V15.6266C11.5016 15.5016 12.1266 15.1266 12.6266 14.6266C13.2516 14.0016 13.6266 13.0016 13.6266 12.1266C13.6266 11.3766 13.3766 10.5016 12.7516 10.0016C12.1266 9.37656 11.5016 9.00155 10.7516 8.75155ZM10.0016 0.00146484C4.50151 0.00146484 0.00146484 4.50151 0.00146484 10.0016C0.00146484 15.5016 4.50151 20.0017 10.0016 20.0017C15.5016 20.0017 20.0017 15.5016 20.0017 10.0016C20.0017 4.50151 15.5016 0.00146484 10.0016 0.00146484ZM10.0016 18.6266C5.25152 18.6266 1.37648 14.7516 1.37648 10.0016C1.37648 5.25152 5.25152 1.37648 10.0016 1.37648C14.7516 1.37648 18.6266 5.25152 18.6266 10.0016C18.6266 14.7516 14.7516 18.6266 10.0016 18.6266Z" fill="#467DB7" stroke="#467DB7" stroke-width="0.00256"/>
</svg>

                          <strong>{t("tour.cancellation")}:</strong>{" "}
                          {tour.cancellation}
                        </div>
                      )}
                    </div>
                    <div
                      className="full_description text_editor"
                      dangerouslySetInnerHTML={{
                        __html:
                          tour.text ||
                          t(
                            "tour.detailsComingSoon",
                            "Tour details will be available soon...",
                          ),
                      }}
                    ></div>
                    {tour.bookingLink && (
                      <div className="buttons_holder">
                        <a
                          href={tour.bookingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                        >
                          {t("tour.bookingLink", "Book Now")}
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="right_block">
                    <div className="image_gallery">
                      <ImageGallery
                        items={images}
                        loading="lazy"
                        showThumbnails={true}
                        showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={true}
                        autoPlay={false}
                        slideDuration={450}
                        slideInterval={3000}
                        renderLeftNav={renderLeftNav}
                        renderRightNav={renderRightNav}
                        thumbnailPosition="bottom"
                        useBrowserFullscreen={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
