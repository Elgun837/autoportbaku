import { useLanguage } from "../context/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { getHomeData } from "../api";

export default function HomePage() {
  const { lang, t } = useLanguage();

  const { data, isLoading, error } = useQuery({
    queryKey: ["homeData", lang],
    queryFn: () => getHomeData(lang),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  if (!data) return <p>No data returned from API</p>;

  const currentData = data.find(
    item => item.lang.toLowerCase() === lang.toLowerCase()
  );

  return (
    <div>
      <h1>{t("home.welcome")}</h1>

      {currentData ? (
        <div>
          <p>Title: {currentData.title}</p>
          {currentData.avatar && <p>Avatar: {currentData.avatar}</p>}
          <p>Created At: {new Date(currentData.createdAt).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>No data available for this language</p>
      )}
    </div>
  );
}
