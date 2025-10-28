import axios from "axios";
import xml2js from "xml2js";
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
export const getToursSlug = async (lang, slug) => {
  if (!lang) return null;
  try {
    const { data } = await api.get(`/tours/${slug}`, {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getToursSlug xətası:", error);
    return null;
  }
};
export const getServicesSlug = async (lang, slug) => {
  if (!lang) return null;
  try {
    const { data } = await api.get(`/services/${slug}`, {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getServicesSlug xətası:", error);
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
export const getVehicleData = async (lang) => {
  if (!lang) return null;
  try {
    const { data } = await api.get("/vehicles", {
      headers: { contentLanguage: lang, token },
    });
    return data;
  } catch (error) {
    console.error("getVehicleData xətası:", error);
    return null;
  }
};

export const getVehicleSearch = async (
  lang,
  tourId,
  formPassengers,
  formLuggage
) => {
  if (!lang) return null;
  try {
    const { data } = await api.post(
      "/vehicles/search",
      {
        passengers: formPassengers,
        luggage: formLuggage,
        tour_id: tourId,
      },
      {
        headers: { contentLanguage: lang, token },
      }
    );

    return data;
  } catch (error) {
    console.error("getVehicleSearch xətası:", error);
    return null;
  }
};
export const getVehicleRequest = async (lang, payload) => {
  if (!lang) return null;

  try {
    const { data } = await api.post("/vehicle/request", payload, {
      headers: {
        contentLanguage: lang,
        token,
        Accept: "application/json",
      },
    });

    return data;
  } catch (error) {
    console.error("getVehicleRequest xətası:", error);
    return null;
  }
};
export const getCurrencies = async () => {
  try {
    const res = await fetch(
      "https://admin.autoportbaku.com/api/currency-rate",
      {
        headers: {
          token,
        },
      }
    );
    const xmlText = await res.text();
    // XML parse
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "application/xml");

    // Xarici valyutaları tap
    const valTypeNodes = Array.from(xmlDoc.querySelectorAll("ValType")).filter(
      (vt) => vt.getAttribute("Type") === "Xarici valyutalar"
    );

    if (!valTypeNodes.length) return null; // əgər valyuta tapılmadısa

    const valutes = Array.from(valTypeNodes[0].querySelectorAll("Valute"));

    const usd = valutes
      .find((v) => v.getAttribute("Code") === "USD")
      ?.querySelector("Value")?.textContent;

    const eur = valutes
      .find((v) => v.getAttribute("Code") === "EUR")
      ?.querySelector("Value")?.textContent;

    return {
      USD: usd ? parseFloat(usd.replace(",", ".")) : null,
      EUR: eur ? parseFloat(eur.replace(",", ".")) : null,
    };
  } catch (error) {
    console.error("getCurrencies xətası:", error.message || error);
    return null;
  }
};

export default api;
