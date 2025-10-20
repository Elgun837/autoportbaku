import { useLanguage } from "../context/LanguageContext";
import Slide from "../components/Slide";
import Scrollline from "../components/Scrolline";
import Services from "../components/Services";
import BookTrip from "../components/BookTrip";
import ToursComponent from "../components/ToursComponent";
import Cars from "../components/Cars";
import WhyUs from "../components/WhyUs";
export default function HomePage() {
  const { lang, t } = useLanguage();

 




  return (
    <div>
      <Slide />
      <Scrollline maxProgress={100} />
      <Services />
      <BookTrip />
      <ToursComponent />
      <Cars />
      <Scrollline maxProgress={100} />
      <WhyUs />
    </div>
  );
}
