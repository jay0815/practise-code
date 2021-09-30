import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import VitePluginElementPlus from 'vite-plugin-element-plus'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    plugins: [vue()],
    build: {
      sourcemap: true,
      minify: false
    },
  };
})