import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
    build: {
        rolldownOptions: {
            input: {
                // Main website
                main: resolve(__dirname, "index.html"),
                projects: resolve(__dirname, "projects.html"),
                certificates: resolve(__dirname, "certificates.html"),

                // Dashboard
                dashboard: resolve(__dirname, "dashboard/dashboard.html"),
                login: resolve(__dirname, "dashboard/login.html"),

                // Dashboard pages
                dashboardHome: resolve(
                    __dirname,
                    "dashboard/pages/dashboard-home.html"
                ),
                hero: resolve(
                    __dirname,
                    "dashboard/pages/hero.html"
                ),
                about: resolve(
                    __dirname,
                    "dashboard/pages/about.html"
                ),
                skills: resolve(
                    __dirname,
                    "dashboard/pages/skills.html"
                ),
                dashboardProjects: resolve(
                    __dirname,
                    "dashboard/pages/projects.html"
                ),
                dashboardCertificates: resolve(
                    __dirname,
                    "dashboard/pages/certificates.html"
                ),
                experience: resolve(
                    __dirname,
                    "dashboard/pages/experience.html"
                ),
                featured: resolve(
                    __dirname,
                    "dashboard/pages/featured.html"
                ),
                contact: resolve(
                    __dirname,
                    "dashboard/pages/contact.html"
                ),
                settings: resolve(
                    __dirname,
                    "dashboard/pages/settings.html"
                ),
            },
        },
    },
});