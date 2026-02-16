import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import path from "path";
import GalleryLoader from "./plugins/gallery-loader";

// https://vite.dev/config/
export default defineConfig({
  plugins: [GalleryLoader(), vue(), UnoCSS()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@data": path.resolve(__dirname, "data"),
    },
  },
});
