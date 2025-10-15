import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/styles/Lang.scss";

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const languages = [
    { code: "en", label: "English", flag: "/flags/en.png" },
    { code: "ru", label: "Русский", flag: "/flags/ru.png" },
  ];

  const current = languages.find((l) => l.code === lang);

  const handleSelect = (code) => {
    changeLang(code);
    setOpen(false);

    const currentPath = location.pathname;
    const segments = currentPath.split("/").filter(Boolean);

    if (segments.length > 0 && ["en", "ru"].includes(segments[0])) {
      segments[0] = code;
    } else {
      segments.unshift(code);
    }

    const newPath = "/" + segments.join("/");
    navigate(newPath);
  };

  return (
    <div className="lang_switch">
      <button onClick={() => setOpen(!open)}>
        <img src={current.flag} alt={current.label} className="w-5 h-5" />
        <i className="drop-icon">
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 10.8273L11.854 6.9743L11.147 6.2663L8 9.4133L4.854 6.2663L4.146 6.9743L8 10.8273Z"
              fill="white"
            />
          </svg>
        </i>
      </button>

      {open && (
        <div className="drop_lang">
          {languages
            .filter((l) => l.code !== lang)
            .map((l) => (
              <button
                key={l.code}
                onClick={() => handleSelect(l.code)}
              >
                <img src={l.flag} alt={l.label} />
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
