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
                        <strong>{t("tour.duration")}:</strong> {tour.duration}
                      </div>
                    )}
                    {tour.cancellation && (
                      <div className="cancellation">
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
    </>
  );
}
