import React from "react";
import "../assets/styles/Slide.scss";
import MultiStepForm from "./MultiStepForm";

export default function Slide() {
  return (
    <div className="main_bg">
      <div className="slide_container">
        <div className="text_section">
          <h1>Your personal chauffeur service</h1>
          <p>Exclusivity . Safety . Comfort</p>
        </div>
        <div className="form_section">
          <MultiStepForm />
        </div>
      </div>
    </div>
  );
}
