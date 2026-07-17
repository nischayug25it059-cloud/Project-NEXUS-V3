import {
    loadHero,
    loadAbout,
    loadSkills,
    loadProjects,
    loadCertificates,
    loadExperience
} from "./loadPortfolio.js";

await loadHero();
await loadAbout();
await loadSkills();
await loadProjects();
await loadCertificates();
await loadExperience();