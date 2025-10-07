import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router-dom";

export default function LanguageSwitcher() {
  const { lang, changeLang } = useLanguage();
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const switchLang = (newLang) => {
    changeLang(newLang);
    const newPath = pathname.replace(/^\/(en|ru)/, `/${newLang}`);
    navigate(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLang("en")} disabled={lang === "en"}>EN</button>
      <button onClick={() => switchLang("ru")} disabled={lang === "ru"}>RU</button>
    </div>
  );
}