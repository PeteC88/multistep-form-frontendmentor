import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //added in order to make vite refresh when you make a change
  server: {
    watch: {
      usePolling: true,
    }
  },
})
