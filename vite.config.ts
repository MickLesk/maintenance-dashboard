import { defineConfig } from "vite";

export default defineConfig({
  build: {
    target: "es2022",
    outDir: "custom_components/maintenance_dashboard/www",
    emptyOutDir: true,
    lib: {
      entry: "frontend/src/maintenance-dashboard-panel.ts",
      formats: ["es"],
      fileName: () => "maintenance-dashboard-panel.js"
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true
      }
    }
  }
});
