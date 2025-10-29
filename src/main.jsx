import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { initWebVitals } from "./utils/webVitals.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Инициализируем мониторинг Web Vitals
// initWebVitals();

// i want here add to console log made by amiroff creative agency with link to amiroff site  with link color white

console.log("%c🚀 Made with ❤️ by Amiroff Creative Agency %c🌐 https://amiroff.az/", 
  "background: linear-gradient(45deg, #667eea 0%, #764ba2 100%); color: #ffffff; padding: 8px 15px; border-radius: 5px 0 0 5px; font-weight: bold; font-size: 14px;", 
  "background: #222; color: #00d4ff; padding: 8px 15px; border-radius: 0 5px 5px 0; font-weight: bold; font-size: 14px; text-decoration: underline;"
);

console.log("%c💼 Need a website? Contact us for professional web development services!", 
  "background: #f39c12; color: #ffffff; padding: 5px 10px; border-radius: 3px; font-weight: bold;"
);

