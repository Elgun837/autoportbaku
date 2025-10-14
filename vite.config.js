import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

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
      },
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      "/api": {
        target: "https://admin.autoportbaku.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // optional: sadəcə path-i qoruyur
      },
    },
  },
});
