import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import xml2js from "xml2js";
import { getCurrencies } from "../api";
import { useQuery } from "@tanstack/react-query";
const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [usdRate, setUsdRate] = useState(); // ilkin dəyər
  const [eurRate, setEurRate] = useState();

  // İlk yükləmədə və cached yoxdursa API-dən alır
  const fetchRate = async () => {
    const data = await getCurrencies();
    if (data?.USD) setUsdRate(data.USD);
    if (data?.EUR) setEurRate(data.EUR);

    // LocalStorage-da saxla
    if (data?.USD) localStorage.setItem("usdRate", data.USD);
    if (data?.EUR) localStorage.setItem("eurRate", data.EUR);
    localStorage.setItem("usdRateTime", Date.now());
  };

  useEffect(() => {
    const cachedUsd = localStorage.getItem("usdRate");
    const cachedEur = localStorage.getItem("eurRate");
    const cachedTime = localStorage.getItem("usdRateTime");
    const oneDay = 24 * 60 * 60 * 1000;

    if (cachedUsd && cachedEur && cachedTime && Date.now() - cachedTime < oneDay) {
      setUsdRate(parseFloat(cachedUsd));
      setEurRate(parseFloat(cachedEur));
    } else {
      fetchRate();
    }
  }, []);
  const value = { currency, setCurrency, usdRate, eurRate };
 
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
