import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    devSourcemap: true,
    preprocessorOptions: { scss: { sourceMap: true } },
  },
  build: { 
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks - разделяем библиотеки
          if (id.includes('react') && (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/'))) {
            return 'react-vendor';
          }
          if (id.includes('react-router-dom')) {
            return 'router-vendor';
          }
          if (id.includes('react-select') || id.includes('react-datepicker') || id.includes('react-phone-input-2')) {
            return 'ui-vendor';
          }
          if (id.includes('gsap') || id.includes('aos') || id.includes('animate.css')) {
            return 'animation-vendor';
          }
          if (id.includes('axios') || id.includes('date-fns') || id.includes('xml2js')) {
            return 'utils-vendor';
          }
          if (id.includes('react-image-gallery') || id.includes('swiper')) {
            return 'gallery-vendor';
          }
          if (id.includes('@tanstack/react-query')) {
            return 'query-vendor';
          }
          
          // App chunks - крупные библиотеки
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Улучшенные имена файлов
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    // Предупреждение только для больших чанков
    chunkSizeWarningLimit: 300,
  },
});
