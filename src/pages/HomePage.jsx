import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api";
import Slide from "../components/Slide";
import { Form } from "react-router-dom";
import Scrollline from "../components/Scrolline";
import Services from "../components/Services";
export default function HomePage() {
  const { lang, t } = useLanguage();

 




  return (
    <div>
      <Slide />
      <Scrollline maxProgress={100} />
      <Services />
    </div>
  );
}
