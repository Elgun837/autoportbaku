// Глобальные настройки skeleton loading
export const SKELETON_SETTINGS = {
  // Включить skeleton loading глобально
  enabled: true,
  
  // Настройки для конкретных компонентов
  components: {
    header: {
      enabled: true,
      showOnFirstLoad: true,    // Показывать при первой загрузке
      showOnRouteChange: false, // Показывать при смене роута
    },
    slide: {
      enabled: true,
      showOnFirstLoad: true,
    },
    bigBanner: {
      enabled: true,
      showOnFirstLoad: true,
    },
    smallBanner: {
      enabled: true,
      showOnFirstLoad: true,
    }
  },
  
  // Режимы разработки
  development: {
    forceShow: false,         // Принудительно показывать skeleton
    logTimings: false,        // Логировать времена загрузки
    debugMode: false,         // Режим отладки
  }
};

export default SKELETON_SETTINGS;