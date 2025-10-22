import { useState, useEffect } from 'react';
import { SKELETON_CONFIG } from '../config/skeletonConfig';

/**
 * Хук для управления состоянием загрузки изображений
 * @param {string} imageSrc - URL изображения для предварительной загрузки
 * @param {number} minLoadingTime - Минимальное время показа skeleton (в мс)
 * @param {number} maxLoadingTime - Максимальное время ожидания загрузки (в мс)
 * @returns {object} - Объект с состояниями isLoading и imageLoaded
 */
export const useImageLoading = (
  imageSrc, 
  minLoadingTime = SKELETON_CONFIG.timing.minLoadingTime, 
  maxLoadingTime = SKELETON_CONFIG.timing.maxLoadingTime
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    
    // Предварительная загрузка изображения
    const img = new Image();
    
    const handleImageLoad = () => {
      setImageLoaded(true);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    const handleImageError = () => {
      console.warn(`Failed to load image: ${imageSrc}`);
      setImageLoaded(false);
      
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsedTime);
      
      setTimeout(() => {
        setIsLoading(false);
      }, remainingTime);
    };

    img.onload = handleImageLoad;
    img.onerror = handleImageError;
    img.src = imageSrc;

    // Fallback timeout на случай, если изображение загружается слишком долго
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(fallbackTimer);
      img.onload = null;
      img.onerror = null;
    };
  }, [imageSrc, minLoadingTime, maxLoadingTime]);

  return { isLoading, imageLoaded };
};

export default useImageLoading;