import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "authApp",
      filename: "remoteEntry.js",
      exposes: {
        "./AuthComponent": "./src/App.jsx",
      },
      remotes: {
        nurseApp: "http://localhost:3002/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "@apollo/client"],
    }),
  ],

  preview: {
    host: "0.0.0.0",
    port: 3001,
    strictPort: true,
    allowedHosts: ["auth-mfe.onrender.com"], // ✅ allow your deployed host
  },

  build: {
    modulePreload: false,
    outDir: "dist",
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
