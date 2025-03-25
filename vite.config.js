import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// imports only the components that are used in the app
import Components from "unplugin-vue-components/vite";
const pathSrc = path.resolve(__dirname, "src");
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  plugins: [
    mkcert(),
    vue(),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
      dts: path.resolve(pathSrc, "components.d.ts"),
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "~": resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    open: true,
    host: true,
    port: '3005',
    https: true
  },
});
