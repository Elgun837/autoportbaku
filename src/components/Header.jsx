import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { lang, t } = useLanguage();

  return (
    <header>
      <nav>
        <Link to={`/${lang}`}>{t("header.home")}</Link>
        <Link to={`/${lang}/about`}>{t("header.about")}</Link>
        <Link to={`/${lang}/products`}>{t("header.products")}</Link>
      </nav>
      <LanguageSwitcher />
    </header>
  );
}
