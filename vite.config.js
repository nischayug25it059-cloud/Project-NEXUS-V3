import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        projects: resolve(__dirname, "projects.html"),
        certificates: resolve(__dirname, "certificates.html"),
      },
    },
  },
});
