import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../assets/styles/Slide.scss";
import { SKELETON_CONFIG } from "../config/skeletonConfig";

export default function SkeletonSlide() {
    const { colors, dimensions, widths } = SKELETON_CONFIG;

    return (
        // <SkeletonTheme baseColor={colors.baseColor} highlightColor={colors.highlightColor}>
        //     <div className="main_bg skeleton-slide-container">
        //         <div className="slide_container small_heading_banner">
        //             {/* Skeleton для фонового изображения */}
        //             <Skeleton
        //                 height="100vh"
        //                 width={widths.fullWidth}
        //                 style={{
        //                     position: 'absolute',
        //                     top: 0,
        //                     left: 0,
        //                     zIndex: 1,
        //                     borderRadius: 0
        //                 }}
        //             />


        //             <div className="container " style={{ position: 'absolute', zIndex: 2, height: '100vh', width: '100%', 'left' : '0' }}>
        //                 <div className="row" style={{'height': '100%'}}>
        //                     <div className="slide_inner">
        //                         <div className="text_section">
        //                             <Skeleton 
        //                                 height={dimensions.slideTitleHeight} 
        //                                 width={dimensions.slideTitleWidth}
        //                                 style={{ marginBottom: '20px' }}
        //                             />
        //                             <Skeleton 
        //                                 height={dimensions.slideSubtitleHeight} 
        //                                 width={dimensions.slideSubtitleWidth}
        //                             />
        //                         </div>
        //                         <div className="form_section">

        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>


        //         </div>
        //     </div>
        // </SkeletonTheme>
        <div className="main_bg slide-fade-in">
            <div className="slide_container small_heading_banner minHeight100 grayBG"></div>
        </div>
    );
}