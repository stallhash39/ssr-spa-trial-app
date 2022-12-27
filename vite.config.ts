import { defineConfig } from "vite";
import VitePluginVue from "@vitejs/plugin-vue";
import VitePluginSSR from "vite-plugin-ssr/plugin";

// FOR '@' UNDER ALIAL
import { fileURLToPath, URL } from "url";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000
  },
  resolve:{
    alias: {
      // "@/": path.resolve(__dirname, "./src"),
      // web3: path.resolve(__dirname, './node_modules/web3/dist/web3.min.js')
      "@": fileURLToPath(new URL(".", import.meta.url)),
    }
  },
  plugins: [
    VitePluginVue(),
    VitePluginSSR({
      prerender: true,
      includeAssetsImportedByServer: true
    })
  ]
});
