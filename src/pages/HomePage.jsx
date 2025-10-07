import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api";
import Slide from "../components/Slide";

export default function HomePage() {
  const { lang, t } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData", lang],
    queryFn: () => getHomeData(lang),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return <p>No data returned from API</p>;
  console.log(data);




  return (
    <div>
      <Slide />
      <h1>{t("home.welcome")}</h1>
     <div>
        {data.map((item, index) => (
          <div key={index}>
            <h3>Title:{item.title}</h3>
            <img src={item.image} alt={item.title} width="500" />
          </div>
        ))}
      </div>
    </div>
  );
}
