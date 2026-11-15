import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
    // Preview sandbox di-proxy lewat host *.e2b.app — harus diizinkan,
    // kalau tidak iframe preview akan diblokir 403.
    allowedHosts: true,
    cors: true,
    hmr: { clientPort: 443 },
  },
  preview: {
    host: "0.0.0.0",
    allowedHosts: true,
  },
  build: {
    target: "es2022",
    chunkSizeWarningLimit: 900,
  },
});
