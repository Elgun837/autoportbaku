import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api";
import Slide from "../components/Slide";
import { Form } from "react-router-dom";

export default function HomePage() {
  const { lang, t } = useLanguage();

 




  return (
    <div>
      <Slide />
    </div>
  );
}
