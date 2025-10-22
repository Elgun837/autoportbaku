// Конфигурация для skeleton loading
export const SKELETON_CONFIG = {
  // Цвета skeleton
  colors: {
    baseColor: '#d5dce6',
    highlightColor: '#f8fafc',
    darkModeBase: '#374151',
    darkModeHighlight: '#4b5563'
  },
  
  // Тайминги
  timing: {
    minLoadingTime: 1000,     // Минимальное время показа skeleton (мс)
    maxLoadingTime: 3000,     // Максимальное время ожидания (мс)
    fadeTransitionTime: 300,   // Время плавного перехода (мс)
  },
  
  // Размеры элементов
  dimensions: {
    titleHeight: 60,
    subtitleHeight: 24,
    formFieldHeight: 40,
    buttonHeight: 50,
    decorHeight: 54,
    slideTitleHeight: 60,
    slideTitleWidth: '80%',
    slideSubtitleHeight: 24,
    slideSubtitleWidth: '60%'
  },
  
  // Ширины элементов (в процентах)
  widths: {
    title: '80%',
    subtitle: '60%',
    button: '40%',
    fullWidth: '100%'
  },
  
  // Настройки для разных типов баннеров
  bannerTypes: {
    slide: {
      titleHeight: 60,
      subtitleHeight: 24,
      titleWidth: '80%',
      subtitleWidth: '60%',
      minLoadingTime: 1000,
      maxLoadingTime: 3000
    },
    big: {
      titleHeight: 72,
      subtitleHeight: 28,
      titleWidth: '85%',
      subtitleWidth: '70%',
      minLoadingTime: 800,
      maxLoadingTime: 2500
    },
    small: {
      titleHeight: 50,
      subtitleHeight: 20,
      titleWidth: '80%',
      subtitleWidth: '65%',
      minLoadingTime: 700,
      maxLoadingTime: 2000
    }
  }
};

export default SKELETON_CONFIG;