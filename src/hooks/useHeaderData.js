import { useState, useEffect } from 'react';
import { getToursData, getServiceData } from "../api/index";
import { SKELETON_CONFIG } from '../config/skeletonConfig';

/**
 * Хук для управления состоянием загрузки данных хедера
 * @param {string} lang - текущий язык
 * @param {boolean} enableSkeleton - включить ли skeleton loading
 * @returns {object} - объект с состояниями загрузки и данными
 */
export const useHeaderData = (lang, enableSkeleton = true) => {
  const [isLoading, setIsLoading] = useState(enableSkeleton);
  const [tours, setTours] = useState([]);
  const [services, setServices] = useState([]);
  const [toursLoading, setToursLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  // Загрузка туров
  useEffect(() => {
    if (!lang) return;
    
    const fetchTours = async () => {
      try {
        setToursLoading(true);
        const toursData = await getToursData(lang);
        const toursArray = toursData?.data || toursData || [];
        setTours(toursArray.slice(0, 16));
      } catch (error) {
        console.error("Error fetching tours for menu:", error);
        setTours([]);
      } finally {
        setToursLoading(false);
      }
    };

    fetchTours();
  }, [lang]);

  // Загрузка сервисов
  useEffect(() => {
    if (!lang) return;
    
    const fetchServices = async () => {
      try {
        setServicesLoading(true);
        const servicesData = await getServiceData(lang);
        const servicesArray = Array.isArray(servicesData)
          ? servicesData
          : servicesData?.data || [];
        setServices(servicesArray.slice(0, 16));
      } catch (error) {
        console.error("Error fetching services for menu:", error);
        setServices([]);
      } finally {
        setServicesLoading(false);
      }
    };

    fetchServices();
  }, [lang]);

  // Управление общим состоянием загрузки
  useEffect(() => {
    if (!enableSkeleton) {
      setIsLoading(false);
      return;
    }

    const startTime = Date.now();
    const headerConfig = SKELETON_CONFIG.header;

    const checkLoadingComplete = () => {
      const dataLoaded = !toursLoading && !servicesLoading;
      const elapsedTime = Date.now() - startTime;
      const minTimeElapsed = elapsedTime >= headerConfig.minLoadingTime;

      if (dataLoaded && minTimeElapsed) {
        setIsLoading(false);
      } else if (dataLoaded && !minTimeElapsed) {
        // Ждем минимальное время
        const remainingTime = headerConfig.minLoadingTime - elapsedTime;
        setTimeout(() => setIsLoading(false), remainingTime);
      }
    };

    // Проверяем сразу
    checkLoadingComplete();

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, headerConfig.maxLoadingTime);

    return () => clearTimeout(fallbackTimer);
  }, [toursLoading, servicesLoading, enableSkeleton]);

  return {
    isLoading,
    tours,
    services,
    toursLoading,
    servicesLoading
  };
};

export default useHeaderData;