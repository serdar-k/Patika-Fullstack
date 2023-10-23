import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // SERVER PROXY EKLEME - EGER BIR PROXY /API ILE BASLIYORSA KARSISINDAKI ADRESE YONLENDIRECEK
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
});
