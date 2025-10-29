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



console.log("%c Made with ❤️ by Amiroff Creative Agency %c https://amiroff.az/ ", "background: #222; color: #bada55; padding: 5px 0;", "background: #222; color: #ffffff; padding: 5px 0;");

