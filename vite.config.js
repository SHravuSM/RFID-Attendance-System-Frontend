import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // ✅ correct for Render deployment
  plugins: [react()],
  optimizeDeps: {
    include: ["react-helmet-async"],
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
});