import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/styles/Page_banners.scss";
import { SKELETON_CONFIG } from "../config/skeletonConfig";

export default function SkeletonPageSmallBanner() {
  const { colors, widths, bannerTypes } = SKELETON_CONFIG;
  const smallBannerConfig = bannerTypes.small;
  
  return (
    <SkeletonTheme baseColor={colors.baseColor} highlightColor={colors.highlightColor}>
      <section className="small_heading_banner skeleton-page-banner-container">
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
                      height={smallBannerConfig.titleHeight} 
                      width={smallBannerConfig.titleWidth}
                      style={{ marginBottom: '15px' }}
                    />
                    {/* Skeleton для подзаголовка */}
                    <Skeleton 
                      height={smallBannerConfig.subtitleHeight} 
                      width={smallBannerConfig.subtitleWidth}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skeleton для декоративного треугольника */}
        <div className="triangle_decor">
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