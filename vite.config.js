// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),  // Must be after react() for proper CSS injection
  ],
  css: {
    devSourcemap: true,  // Helps with error tracing
  },
});
