import "../assets/styles/About.scss";
import { useLanguage } from "../context/LanguageContext";
import Page_big_banner from "../components/Page_big_banner";
import AboutBanner from "../assets/images/about_us/banner_imge_about.webp";
import Scrollline from "../components/Scrolline";
import SectionTitle from "../components/SectionTitle";
import Mission from "../components/Mission";



function About() {
  
  const { t } = useLanguage();
  const secHead = t("about.secTitle");
  const secDescription = t("about.secDesc");
  return (
  
    < div className="about_page" >
      <Page_big_banner
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        bannerImageSrc={AboutBanner}
        
      />
       <Scrollline maxProgress={100} />
       <SectionTitle sectionHeadingBig={secDescription} sectionHeadingSmall={secHead} />
       <section className="about_section">
        <div className="container">
          <div className="row"> 
            <div className="about_inner">
              <p 
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
              data-aos-mirror="true"
              >{t("about.content1")}</p>
              <p
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="800"
              data-aos-mirror="true"
              >{t("about.content2")}</p>
              <p
              data-aos="fade-up"
              data-aos-delay="600"
              data-aos-duration="800"
              data-aos-mirror="true"
              >{t("about.content3")}</p>
            </div>
          </div>
        </div>
       </section>
       <Mission />
    </div>
   
  );
}

export default About;
