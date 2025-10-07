import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "../assets/styles/Header.css";


export default function Header() {
  const { lang, t } = useLanguage();

  return (
    <header>
      <div className="container">
        <div className="logo">
          <Link to={`/${lang}`}>
            <img src="./logo.png" alt="Logo" />
          </Link>
        </div>

        <div className="right_section">
          <nav>
            <Link to={`/${lang}`}>{t("header.home")}</Link>
            <Link to={`/${lang}/about`}>{t("header.about")}</Link>
            <Link to={`/${lang}/products`}>{t("header.products")}</Link>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
