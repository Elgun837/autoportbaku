import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/styles/Header.scss";
import { SKELETON_CONFIG } from "../config/skeletonConfig";

export default function SkeletonHeader({ isHomePage = false }) {
  const { colors, header } = SKELETON_CONFIG;
  
  // Создаем класс для header с условным добавлением класса 'home'
  const headerClass = `header${isHomePage ? " home" : ""} skeleton-header-container`;
  
  return (
    <SkeletonTheme baseColor={colors.baseColor} highlightColor={colors.highlightColor}>
      <header className={headerClass}>
        <div className="container">
          <div className="row">
            <div className="inner">
              {/* Skeleton для логотипа */}
              <div className="logo">
                <Skeleton 
                  width={header.logoWidth} 
                  height={header.logoHeight}
                  style={{ borderRadius: '4px' }}
                />
              </div>

              <div className="right_section">
                <div className="nav_and_lang">
                  {/* Skeleton для навигационного меню */}
                  <nav className="skeleton-nav">
                    {/* Home link */}
                    <div className="skeleton-nav-item">
                      <Skeleton 
                        width="60px" 
                        height={header.navItemHeight}
                        style={{ borderRadius: '4px', marginRight: '25px' }}
                      />
                    </div>
                    
                    {/* About link */}
                    <div className="skeleton-nav-item">
                      <Skeleton 
                        width="70px" 
                        height={header.navItemHeight}
                        style={{ borderRadius: '4px', marginRight: '25px' }}
                      />
                    </div>
                    
                    {/* Services dropdown */}
                    <div className="skeleton-nav-item nav-item dropdown">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton 
                          width="85px" 
                          height={header.navItemHeight}
                          style={{ borderRadius: '4px', marginRight: '8px' }}
                        />
                        <Skeleton 
                          width="12px" 
                          height="12px"
                          style={{ borderRadius: '2px' }}
                        />
                      </div>
                    </div>
                    
                    {/* Tours dropdown */}
                    <div className="skeleton-nav-item nav-item dropdown" style={{ marginLeft: '25px' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Skeleton 
                          width="65px" 
                          height={header.navItemHeight}
                          style={{ borderRadius: '4px', marginRight: '8px' }}
                        />
                        <Skeleton 
                          width="12px" 
                          height="12px"
                          style={{ borderRadius: '2px' }}
                        />
                      </div>
                    </div>
                    
                    {/* Contact link */}
                    <div className="skeleton-nav-item" style={{ marginLeft: '25px' }}>
                      <Skeleton 
                        width="80px" 
                        height={header.navItemHeight}
                        style={{ borderRadius: '4px' }}
                      />
                    </div>
                  </nav>

                  {/* Skeleton для переключателя языка */}
                  <div className="language_switcher skeleton-language-switcher">
                    <Skeleton 
                      width={header.languageSwitcherWidth} 
                      height={header.languageSwitcherHeight}
                      style={{ borderRadius: '4px' }}
                    />
                  </div>
                </div>

                {/* Skeleton для мобильного меню кнопки */}
                <div className="mobile_menu_toggle skeleton-mobile-toggle">
                  <Skeleton 
                    width="30px" 
                    height="30px"
                    style={{ borderRadius: '4px' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </SkeletonTheme>
  );
}