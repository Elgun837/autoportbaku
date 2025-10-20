import React from "react";
import "../assets/styles/Slide.scss";
import MultiStepForm from "./MultiStepForm";

export default function Slide() {
  return (
    <div className="main_bg">
      <div className="slide_container small_heading_banner">
        <img src="/bg_block.webp" alt="" className="banner_image" />
        <div className="container">
          <div className="row">
            <div className="slide_inner">
              <div className="text_section">
                <h1>Your personal chauffeur service</h1>
                <p>Exclusivity . Safety . Comfort</p>
              </div>
              <div className="form_section">
                <MultiStepForm />
              </div>
            </div>
          </div>
        </div>
        <div className="triangle_decor">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1920"
            height="54"
            viewBox="0 0 1920 54"
            fill="none"
          >
            <path d="M0 53.6548L1920 0V53.6548H0Z" fill="white" />
          </svg>
        </div>
      </div>
    </div>
  );
}
