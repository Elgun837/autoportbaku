// Утилиты для управления skeleton компонентами
import { SKELETON_CONFIG } from '../config/skeletonConfig';

/**
 * Получить настройки skeleton для разных типов баннеров
 * @param {string} bannerType - тип баннера ('slide', 'big', 'small')
 * @returns {object} настройки для конкретного типа баннера
 */
export const getBannerSkeletonConfig = (bannerType) => {
  const baseConfig = SKELETON_CONFIG;
  
  switch (bannerType) {
    case 'slide':
      return {
        ...baseConfig,
        timing: {
          ...baseConfig.timing,
          minLoadingTime: 1000,
          maxLoadingTime: 3000
        },
        dimensions: {
          ...baseConfig.dimensions,
          titleHeight: 60,
          subtitleHeight: 24
        }
      };
      
    case 'big':
      return {
        ...baseConfig,
        timing: {
          ...baseConfig.timing,
          minLoadingTime: 800,
          maxLoadingTime: 2500
        },
        dimensions: {
          ...baseConfig.dimensions,
          titleHeight: 72, // Больше для big banner
          subtitleHeight: 28
        }
      };
      
    case 'small':
      return {
        ...baseConfig,
        timing: {
          ...baseConfig.timing,
          minLoadingTime: 700,
          maxLoadingTime: 2000
        },
        dimensions: {
          ...baseConfig.dimensions,
          titleHeight: 50, // Меньше для small banner
          subtitleHeight: 20
        }
      };
      
    default:
      return baseConfig;
  }
};

/**
 * Создать стили для skeleton элемента
 * @param {object} options - опции стилизации
 * @returns {object} объект стилей
 */
export const createSkeletonStyles = (options = {}) => {
  const {
    position = 'static',
    zIndex = 'auto',
    borderRadius = '8px',
    marginBottom = '0px',
    opacity = 1,
    transition = 'opacity 0.3s ease-in-out'
  } = options;
  
  return {
    position,
    zIndex,
    borderRadius,
    marginBottom,
    opacity,
    transition
  };
};

/**
 * Определить тип баннера по пропсам компонента
 * @param {object} props - пропсы компонента
 * @returns {string} тип баннера
 */
export const detectBannerType = (props) => {
  if (props.className?.includes('slide')) return 'slide';
  if (props.className?.includes('big')) return 'big';
  if (props.className?.includes('small')) return 'small';
  return 'default';
};

export default {
  getBannerSkeletonConfig,
  createSkeletonStyles,
  detectBannerType
};