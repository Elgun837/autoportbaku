import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/styles/Page_banners.scss";
import { SKELETON_CONFIG } from "../config/skeletonConfig";

export default function SkeletonPageBigBanner() {
  const { colors, widths, bannerTypes } = SKELETON_CONFIG;
  const bigBannerConfig = bannerTypes.big;
  
  return (
    <SkeletonTheme baseColor={colors.baseColor} highlightColor={colors.highlightColor}>
      <section className="small_heading_banner small_heading_banner__big skeleton-page-banner-container">
        {/* Skeleton для фонового изображения */}
        <Skeleton 
          height="100%" 
          width={widths.fullWidth}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            borderRadius: 0
          }}
        />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row">
            <div className="inner">
              <div className="full_container">
                <div className="w70_block">
                  <div className="page_title_wrapper skeleton-title-wrapper">
                    {/* Skeleton для заголовка страницы */}
                    <Skeleton 
                      height={bigBannerConfig.titleHeight} 
                      width={bigBannerConfig.titleWidth}
                      style={{ marginBottom: '20px' }}
                    />
                    {/* Skeleton для подзаголовка */}
                    <Skeleton 
                      height={bigBannerConfig.subtitleHeight} 
                      width={bigBannerConfig.subtitleWidth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skeleton для декоративного треугольника */}
        <div className="triangle_decor triangle_decor_bottom">
          <Skeleton 
            height={SKELETON_CONFIG.dimensions.decorHeight} 
            width={widths.fullWidth}
            style={{ borderRadius: 0 }}
          />
        </div>
      </section>
    </SkeletonTheme>
  );
}