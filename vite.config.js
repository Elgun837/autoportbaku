import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    devSourcemap: true,
    preprocessorOptions: { 
      scss: { 
        sourceMap: true 
      } 
    },
    // PostCSS обработка (включая PurgeCSS) только в production
    postcss: process.env.NODE_ENV === 'production' ? './postcss.config.js' : undefined
  },
  build: { 
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Логируем все модули, которые попадают в vendor
          if (id.includes('node_modules')) {
            const packageName = id.split('node_modules/')[1].split('/')[0];
            if (!['react', 'react-dom', 'react-router-dom', 'react-select', 'react-datepicker', 'react-phone-input-2', 'react-loading-skeleton', 'gsap', 'aos', 'animate.css', 'react-image-gallery', 'swiper', '@tanstack', 'axios', 'xml2js'].some(known => packageName.includes(known))) {
              console.log('🔍 VENDOR:', packageName, '|', id.split('node_modules/')[1]);
            }
          }
          
          // Core React - самый важный chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor';
          }
          
          // Router - загружается с основным приложением
          if (id.includes('react-router-dom')) {
            return 'router-vendor';
          }
          
          // UI компоненты - можно загружать lazy
          if (id.includes('react-select') || id.includes('react-datepicker') || id.includes('react-phone-input-2') || id.includes('react-loading-skeleton')) {
            return 'ui-vendor';
          }
          
          // Анимации - только когда нужно
          if (id.includes('gsap') || id.includes('aos') || id.includes('animate.css')) {
            return 'animation-vendor';
          }
          
          // Утилиты - общие инструменты
          if (id.includes('axios') || id.includes('xml2js')) {
            return 'utils-vendor';
          }
          
          // Галереи - тяжелые компоненты
          if (id.includes('react-image-gallery') || id.includes('swiper')) {
            return 'gallery-vendor';
          }
          
          // Query - данные
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // Остальные vendor библиотеки
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          
          // НЕ разделяем автоматически по страницам - это вызывает дублирование
          // App chunks по страницам - отключено
          // if (id.includes('/pages/')) {
          //   const pageName = id.split('/pages/')[1].split('.')[0].toLowerCase();
          //   return `page-${pageName}`;
          // }
        },
        // Оптимизированные имена файлов
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Более строгий лимит
    chunkSizeWarningLimit: 200,
    // Минификация
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Удаляем console.log в продакшене
        drop_debugger: true,
      },
    },
  },
});
