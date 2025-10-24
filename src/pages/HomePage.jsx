import { useLanguage } from "../context/LanguageContext";
import Slide from "../components/Slide";
import Scrollline from "../components/Scrolline";
import Services from "../components/Services";
import BookTrip from "../components/BookTrip";
import ToursComponent from "../components/ToursComponent";
import Cars from "../components/Cars";
import WhyUs from "../components/WhyUs";
import Partners from "../components/Partners";
import SEOHead from "../components/SEOHead";
import { LocalBusinessSchema, OrganizationSchema } from "../components/RichSnippets";




export default function HomePage() {
  const { lang, t } = useLanguage();

  return (
    <div>
      <SEOHead
        pageType="homePage"
      />
      <LocalBusinessSchema />
      <OrganizationSchema />
      <Slide />
        <Scrollline maxProgress={100} />
        <Services />     
        <BookTrip />
        <ToursComponent />
        <Cars />
        <Scrollline maxProgress={100} />
        <WhyUs />
        <Scrollline />
        <Partners />
    </div>
  );
}
