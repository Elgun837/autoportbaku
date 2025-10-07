import axios from "axios";

const api = axios.create({
  baseURL: "https://63775ada5c477765121b5746.mockapi.io", 
});

export const getHomeData = async (lang= "en") => {  
    const { data } = await api.get(`/home?lang=${lang}`);
    return data;
};

export default api