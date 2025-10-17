import axios from "axios";

const api = axios.create({
  baseURL: "https://admin.autoportbaku.com/api/",
});

const token = "KBIzDStUcIw77b4RwpPDqTuIH2v2boErBf7lCTOQFAAM5xV92T5kWdK9afg8DgEx2HTRxc8db2YJDmvZwzZ4SjKH4ClC3AyviAQ1oOWMvhg9F9HGLPHESsGZADEGj62KrDYyzp7fUtqIZ4hbCH9vk1BTesghBrIbK31O";

// Home
export const getHomeData = async (lang) => {
  if (!lang) {
    console.warn("getHomeData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/services", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getHomeData xətası:", error);
    return null;
  }
};

// Settings
export const getSettingsData = async (lang) => {
  if (!lang) {
    console.warn("getSettingsData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/settings", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getSettingsData xətası:", error);
    return null;
  }
};

// Partners
export const getPartnersData = async (lang) => {
  if (!lang) {
    console.warn("getPartnersData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/partners", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getPartnersData xətası:", error);
    return null;
  }
};

// Tours
export const getToursData = async (lang) => {
  if (!lang) {
    console.warn("getToursData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/tours", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getToursData xətası:", error);
    return null;
  }
};

// Tour by slug
export const getTourBySlug = async (slug, lang) => {
  if (!lang) {
    console.warn("getTourBySlug çağırıldı amma lang undefined");
    return null;
  }
  try {
    const allTours = await getToursData(lang);
    const tours = allTours?.data || allTours || [];

    let tour = tours.find((t) => t.slug === slug);
    if (!tour) tour = tours.find((t) => t.id === slug || String(t.id) === slug);

    if (!tour) throw new Error(`Tour not found with slug: ${slug}`);
    return { data: tour };
  } catch (error) {
    console.error("getTourBySlug xətası:", error);
    return null;
  }
};

// FAQ
export const getFaqsData = async (lang) => {
  if (!lang) {
    console.warn("getFaqsData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/faq", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getFaqsData xətası:", error);
    return null;
  }
};

// Services
export const getServiceData = async (lang) => {
  if (!lang) {
    console.warn("getServiceData çağırıldı amma lang undefined");
    return null;
  }
  try {
    const { data } = await api.get("/services", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getServiceData xətası:", error);
    return null;
  }
};

// Service by slug
export const getServiceBySlug = async (slug, lang) => {
  if (!lang) {
    console.warn("getServiceBySlug çağırıldı amma lang undefined");
    return null;
  }
  try {
    const allServices = await getServiceData(lang);
    const services = Array.isArray(allServices) ? allServices : allServices?.data || [];

    let service = services.find((s) => s.slug === slug);
    if (!service) service = services.find((s) => s.id === slug || String(s.id) === slug);

    if (!service) throw new Error(`Service not found with slug: ${slug}`);
    return { data: service };
  } catch (error) {
    console.error("getServiceBySlug xətası:", error);
    return null;
  }
};

export default api;
