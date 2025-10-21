import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { getToursSlug } from "../api/index";
import Page_big_banner from "../components/Page_big_banner";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../assets/styles/TourDetail.scss";
import { useQuery } from "@tanstack/react-query";

export default function TourDetail() {
  const { t, lang } = useLanguage();
  const { slug } = useParams();

  // API sorğusu (slug və lang əsasında)
  const {
    data: tourData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tour", lang, slug],
    queryFn: () => getToursSlug(lang, slug),
    enabled: !!slug && !!lang,
  });
  const tourArray = Array.isArray(tourData)
    ? tourData
    : Array.isArray(tourData?.data)
    ? tourData.data
    : [];

  const tour = tourArray[0] || null; // tək tour-u götürürük

  if (isLoading) {
    return (
      <>
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

  if (isError || !tour) {
    return (
      <>
        <Page_big_banner
          title={t("tour.notFound", "Tour Not Found")}
          subtitle={t(
            "tour.notFoundSubtitle",
            "The tour you're looking for doesn't exist"
          )}
          bannerImageSrc=""
        />
      </>
    );
  }

  // Prepare images for gallery
  const imageUrls = [];
  if (tour.image) imageUrls.push(tour.image);
  if (tour.gallery) {
    if (typeof tour.gallery === "string") imageUrls.push(tour.gallery);
    if (Array.isArray(tour.gallery)) imageUrls.push(...tour.gallery);
  }

  const images = imageUrls.length
    ? imageUrls.map((url) => ({ original: url, thumbnail: url }))
    : [
        {
          original: "../assets/images/small_heading_banner.png",
          thumbnail: "../assets/images/small_heading_banner.png",
        },
      ];

  const renderLeftNav = (onClick, disabled) => (
    <button
      className="image-gallery-left-nav custom-nav-arrow"
      disabled={disabled}
      onClick={onClick}
      aria-label="Previous image"
    >
      ◀
    </button>
  );

  const renderRightNav = (onClick, disabled) => (
    <button
      className="image-gallery-right-nav custom-nav-arrow"
      disabled={disabled}
      onClick={onClick}
      aria-label="Next image"
    >
      ▶
    </button>
  );

  return (
    <>
      <div className="tours_details">
      <Page_big_banner
        title={tour.title || ""}
        subtitle={tour.excerpt || ""}
        bannerImageSrc={tour.image}
      />

      <section className="tour-detail">
        <div className="container">
          <div className="row">
            <div className="tour-detail-inner">
              <h1>{tour.title}</h1>
              <div className="details_holder">
                <div className="left_block">
                  {tour.excerpt && (
                    <p className="small_description">{tour.excerpt}</p>
                  )}
                  <div className="parameters">
                    {tour.duration && (
                      <div className="duration">
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <strong>{t("tour.duration")}:</strong> {tour.duration}
                      </div>
                    )}
                    {tour.cancellation && (
                      <div className="cancellation">
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
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
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
                          "Tour details will be available soon..."
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
