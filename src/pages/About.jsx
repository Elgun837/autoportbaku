import react from "react";
import "../assets/styles/About.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import AboutBanner from "../assets/images/about_us/banner_imge_about.webp";
import Scrollline from "../components/Scrolline";
function About() {
  const { t } = useLanguage();
  return (
    < div className="about_page" >
      <Page_big_banner
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        bannerImageSrc={AboutBanner}
      />
       <Scrollline maxProgress={100} />
    </div>
  );
}

export default About;
