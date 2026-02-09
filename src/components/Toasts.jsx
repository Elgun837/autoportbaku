// Toasts.js
import React, { useEffect } from "react";
import "../assets/styles/Toasts.scss"; // CSS aşağıda verilib

export default function Toasts({ errors }) {
  return (
    <div className="toast-container">
      {Object.values(errors)
        .filter(Boolean)
        .map((err, index) => (
          <div key={index} className="toast">
            {err}
          </div>
        ))}
    </div>
  );
}
