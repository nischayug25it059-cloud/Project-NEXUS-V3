import { db } from "../firebase/firebase.js";
import { loadDocument } from "../dashboard/modules/utils.js";

function setText(id, value) {

    const element = document.getElementById(id);

    if (element) {

        element.textContent = value || "";

    }

}

export async function loadPortfolio() {

    // Hero

    const hero = await loadDocument(db, "portfolio", "hero");

    if (hero) {

        setText("hero-name", hero.name);
        setText("hero-role", hero.role);
        setText("hero-typing", hero.typing);

    }

    // About

    const about = await loadDocument(db, "portfolio", "about");

    if (about) {

        setText("about-heading", about.heading);
        setText("about-description", about.description);

        setText("contact-email", about.email);
        setText("contact-phone", about.phone);

    }

    // Skills

    const skills = await loadDocument(db, "portfolio", "skills");

    if (skills) {

        setText("skills-list", skills.skills);

    }

    // Projects

    const projects = await loadDocument(db, "portfolio", "projects");

    if (projects) {

        setText("projects-list", projects.title);

    }

    // Certificates

    const certificates = await loadDocument(db, "portfolio", "certificates");

    if (certificates) {

        setText("certificates-list", certificates.name);

    }

    // Experience

    const experience = await loadDocument(db, "portfolio", "experience");

    if (experience) {

        setText("experience-list", experience.company);

    }

}