import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [rate, setRate] = useState(1.7); // ilkin dəyər
  const [eurRate, setEurRate] = useState(1.9763);

  // --- Məzənnəni AMB-dən çəkmək funksiyası ---
    const fetchRate = async () => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  const url = `https://www.cbar.az/currencies/${day}.${month}.${year}.xml`;

  try {
    const { data } = await axios.get(url);
    const parsed = await xml2js.parseStringPromise(data);

    // USD məzənnəsi
    const usd = parsed.ValCurs.ValType[0].Valute.find(
      (v) => v.$.Code === "USD"
    );
    const usdValue = parseFloat(usd.Value[0].replace(",", "."));
    setRate(usdValue);
    localStorage.setItem("usdRate", usdValue);
    localStorage.setItem("usdRateTime", Date.now());

    // EUR məzənnəsi
    const eur = parsed.ValCurs.ValType[0].Valute.find(
      (v) => v.$.Code === "EUR"
    );
    const eurValue = parseFloat(eur.Value[0].replace(",", "."));
    setEurRate(eurValue);
    localStorage.setItem("eurRate", eurValue);
    localStorage.setItem("eurRateTime", Date.now());
  } catch (err) {
    console.error("Məzənnə alınmadı:", err.message);
  }
};
  // const fetchRate = async () => {
  //   try {
  //     const res = await fetch("/currencies.xml");
  //     const str = await res.text();
  //     const xml = new DOMParser().parseFromString(str, "text/xml");
  //     const usd = xml.querySelector('Valute[Code="USD"] Value').textContent;
  //     const rate = parseFloat(usd.replace(",", "."));
  //     setRate(rate);
  //     localStorage.setItem("usdRate", rate);
  //     localStorage.setItem("usdRateTime", Date.now());
  //   } catch (err) {
  //     console.error("XML fayl oxuna bilmədi:", err);
  //   }
  // };
  
  // --- İlk açılışda və 24 saatdan bir yeniləmə ---
  useEffect(() => {
    const cached = localStorage.getItem("usdRate");
    const cachedTime = localStorage.getItem("usdRateTime");
    const oneDay = 24 * 60 * 60 * 1000;

    if (cached && cachedTime && Date.now() - cachedTime < oneDay) {
      setRate(parseFloat(cached));
    } else {
      fetchRate();
    }
  }, []);
  const value = { currency, setCurrency, rate, eurRate };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
