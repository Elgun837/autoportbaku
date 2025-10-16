import axios from "axios";

const api = axios.create({
  baseURL: "https://admin.autoportbaku.com/api/", 
});

const token = "KBIzDStUcIw77b4RwpPDqTuIH2v2boErBf7lCTOQFAAM5xV92T5kWdK9afg8DgEx2HTRxc8db2YJDmvZwzZ4SjKH4ClC3AyviAQ1oOWMvhg9F9HGLPHESsGZADEGj62KrDYyzp7fUtqIZ4hbCH9vk1BTesghBrIbK31O";


export const getHomeData = async (lang = "en") => {
  const { data } = await api.get("/services", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
  
  return data;
};

export const getSettingsData = async (lang = "en") => {
  const { data } = await api.get("/settings", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
  
  return data;
};
export const getPartnersData = async (lang = "en") => {
  const { data } = await api.get("/partners", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
  
  return data;
};
export const getToursData = async (lang = "en") => {
  const { data } = await api.get("/tours", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
 
  return data;
};

export const getTourBySlug = async (slug, lang = "en") => {
  try {
    // Получаем все туры из API
    const allTours = await getToursData(lang);
    const tours = allTours.data || allTours || [];   
    
    // Ищем тур по slug
    const tour = tours.find(t => t.slug === slug);   
    if (tour) {       
      return { data: tour };
    }
    
    // Если не найден по slug, попробуем по ID
    const tourById = tours.find(t => t.id === slug || String(t.id) === slug);
    if (tourById) {
      return { data: tourById };
    }
    
    throw new Error(`Tour not found with slug: ${slug}`);
  } catch (error) {
    console.error('Error in getTourBySlug:', error);
    throw error;
  }
};


export const getFaqsData = async (lang = "en") => {
  const { data } = await api.get("/faq", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
  return data;
};

export const getServiceData = async (lang = "en") => {

  const { data } = await api.get("/services", {
    headers: {
      "contentLanguage": lang,
      "token": token,
    },
  });
  return data;
};

export const getServiceBySlug = async (slug, lang = "en") => {
  try {
    // Получаем все сервисы из API
    const allServices = await getServiceData(lang);
    const services = Array.isArray(allServices) ? allServices : (allServices.data || []);   
    
    // Ищем сервис по slug
    const service = services.find(s => s.slug === slug);   
    if (service) {       
      return { data: service };
    }
    
    // Если не найден по slug, попробуем по ID
    const serviceById = services.find(s => s.id === slug || String(s.id) === slug);
    if (serviceById) {
      return { data: serviceById };
    }
    
    throw new Error(`Service not found with slug: ${slug}`);
  } catch (error) {
    console.error('Error in getServiceBySlug:', error);
    throw error;
  }
};

export default api;