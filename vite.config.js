import { defineConfig } from "vite";
// import { viteSingleFile } from "vite-plugin-singlefile";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/login-screen/",
  plugins: [react()],
});
