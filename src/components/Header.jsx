import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "../assets/styles/Header.scss";
import logoImage from "/logo.png";


export default function Header() {
  const { lang, t } = useLanguage();
  const location = useLocation();

  // Проверяем, находимся ли мы на главной странице
  const isHomePage = location.pathname === `/${lang}` || location.pathname === '/';

  // Создаем класс для header с условным добавлением класса 'home'
  const headerClass = `header${isHomePage ? ' home' : ''}`;

  return (
    <header className={headerClass} >
      <div className="container">
        <div className="inner">
          <div className="logo">
            <Link to={`/${lang}`}>
              <img src={logoImage} alt="Logo" />
            </Link>
          </div>

          <div className="right_section">
            <nav>
              <Link to={`/${lang}`}>{t("header.home")}</Link>
              <Link to={`/${lang}/about`}>{t("header.about")}</Link>
              <Link to={`/${lang}/products`}>{t("header.products")}</Link>
              <Link to={`/${lang}/contacts`}>{t("header.contacts")}</Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
