import { setupHeroForm } from "./modules/hero.js";
import { setupAboutForm } from "./modules/about.js";
import { setupSkillsForm } from "./modules/skills.js";
import { setupProjectsForm } from "./modules/projects.js";
import { setupCertificatesForm } from "./modules/certificates.js";
import { setupExperienceForm } from "./modules/experience.js";
import { db, auth, provider } from "../firebase/firebase.js";
import { setupFeaturedForm } from "./modules/featured.js";
import { collection, getDocs } from "firebase/firestore";


if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

console.log("Firebase Connected");
console.log(db);
console.log(auth);
console.log(provider);

// Sidebar Items
const menuItems = document.querySelectorAll(".menu li[data-page]");

// Content Area
const content = document.getElementById("content");

// Load Page
async function loadPage(page) {

    try {

        const response = await fetch(`pages/${page}.html`);

        const html = await response.text();

        content.innerHTML = html;

        if (page === "dashboard-home") {
            loadDashboardStats();
        }

        if (page === "hero") {

            setupHeroForm();

        }

        if (page === "about") {

            setupAboutForm();

        }

        if (page === "skills") {

            setupSkillsForm();
        }

        if (page === "projects") {

            setupProjectsForm();

        }

        if (page === "certificates") {

            setupCertificatesForm();

        }

        if (page === "experience") {

            setupExperienceForm();

        }

        if (page === "featured") {

            setupFeaturedForm();

        }

    } catch (err) {

        content.innerHTML = "<h2>Page Not Found</h2>";

    }

}

// Sidebar Click

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

        loadPage(item.dataset.page);

    });

});

async function loadDashboardStats() {

    try {

        const [
            projectsSnapshot,
            skillsSnapshot,
            certificatesSnapshot,
            experienceSnapshot
        ] = await Promise.all([

            getDocs(collection(db, "projects")),
            getDocs(collection(db, "skills")),
            getDocs(collection(db, "certificates")),
            getDocs(collection(db, "experience"))

        ]);

        const projectCount =
            document.getElementById("projectCount");

        const skillCount =
            document.getElementById("skillCount");

        const certificateCount =
            document.getElementById("certificateCount");

        const experienceCount =
            document.getElementById("experienceCount");


        if (projectCount) {
            projectCount.textContent =
                projectsSnapshot.size;
        }

        if (skillCount) {
            skillCount.textContent =
                skillsSnapshot.size;
        }

        if (certificateCount) {
            certificateCount.textContent =
                certificatesSnapshot.size;
        }

        if (experienceCount) {
            experienceCount.textContent =
                experienceSnapshot.size;
        }


        console.log("Dashboard stats loaded:", {
            projects: projectsSnapshot.size,
            skills: skillsSnapshot.size,
            certificates: certificatesSnapshot.size,
            experience: experienceSnapshot.size
        });

    } catch (error) {

        console.error(
            "Error loading dashboard stats:",
            error
        );

    }
}

// Default Page

loadPage("dashboard-home");