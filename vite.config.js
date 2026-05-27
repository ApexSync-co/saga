import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Disable module preloading to prevent Chrome from flagging preloaded chunks that are not immediately navigated to.
    modulePreload: false,
  },
})
