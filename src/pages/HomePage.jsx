import { useLanguage } from "../context/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div>
      <h1>{t("home.welcome")}</h1>
    </div>
  );
}
