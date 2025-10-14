import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
    })
  ],
  server: {
    // Настройки для лучшего hot reload
    hmr: {
      overlay: true
    },
    // Следим за изменениями в файлах
    watch: {
      usePolling: true,
      interval: 100
    }
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        sourceMap: true,
      }
    }
  },
  build: {
    sourcemap: true,
  }
})
