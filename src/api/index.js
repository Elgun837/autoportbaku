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

export default api;