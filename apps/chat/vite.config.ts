/// <reference types="vitest" />
/// <reference types="vite/client" />

import * as dotenv from "dotenv";
dotenv.config({ path: "./.env.local" });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: process.env.SW_DEV === "true" ? "development" : "production",
  base: "/",
  includeAssets: ["favicon.svg"],
  srcDir: "src",
  filename: "worker/push.ts",
  strategies: "injectManifest",
  manifest: {
    name: "Serverless Chat",
    short_name: "Serverless Chat",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };

if (process.env.RELOAD_SW === "true") {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
  server: {
    proxy: {
      "/api/.*": {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
