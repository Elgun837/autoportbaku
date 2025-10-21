import axios from "axios";

const api = axios.create({
  baseURL: "https://admin.autoportbaku.com/api/",
});

const token =
  "KBIzDStUcIw77b4RwpPDqTuIH2v2boErBf7lCTOQFAAM5xV92T5kWdK9afg8DgEx2HTRxc8db2YJDmvZwzZ4SjKH4ClC3AyviAQ1oOWMvhg9F9HGLPHESsGZADEGj62KrDYyzp7fUtqIZ4hbCH9vk1BTesghBrIbK31O";

// Home
export const getHomeData = async (lang) => {
  if (!lang) return null;
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
  if (!lang) return null;
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
  if (!lang) return null;
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
  if (!lang) return null;
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

// FAQ
export const getFaqsData = async (lang) => {
  if (!lang) return null;
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
  if (!lang) return null;
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
  if (!lang) return null;
  try {
    const allServices = await getServiceData(lang);
    const services = Array.isArray(allServices)
      ? allServices
      : allServices?.data || [];

    let service = services.find((s) => s.slug === slug);
    if (!service)
      service = services.find((s) => s.id === slug || String(s.id) === slug);

    if (!service) throw new Error(`Service not found with slug: ${slug}`);
    return { data: service };
  } catch (error) {
    console.error("getServiceBySlug xətası:", error);
    return null;
  }
};

export default api;
