// ScrollToTopOnRender.jsx
import { useEffect } from "react";

export default function Scrolltop() {
useEffect(() => {
    const rootDiv = document.getElementById("root");
    if (!rootDiv) return;

    let timeoutId;

    const observer = new MutationObserver(() => {
      // Debounce ilə scroll
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
    });

    observer.observe(rootDiv, { childList: true, subtree: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null;
}