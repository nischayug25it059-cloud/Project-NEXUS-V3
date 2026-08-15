import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";

const container = document.getElementById("certificatesContainer");

const filterButtons = document.querySelectorAll(
    ".project-filters button"
);

const certificateImages = {
    "Complete Python Bootcamp":
        "assets/certificates/python.jpg",

    "SQL Advanced":
        "assets/certificates/sql.jpg",

    "Google Data Analytics":
        "assets/certificates/google.jpg",

    "Power BI Masterclass":
        "assets/certificates/powerbi.jpg",

    "Microsoft Azure Fundamentals":
        "assets/certificates/azure.jpg",

    "Oracle Database":
        "assets/certificates/oracle.jpg"
};

let certificates = [];

async function loadCertificates() {

    try {

        const q = query(
            collection(db, "certificates"),
            orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);

        certificates = [];

        snapshot.forEach((doc) => {

            const data = doc.data();

            certificates.push({
                id: doc.id,
                ...data
            });

        });

        renderCertificates("All");

    } catch (error) {

        console.error(
            "Error loading certificates:",
            error
        );

        container.innerHTML = `
            <p class="certificate-error">
                Unable to load certificates.
            </p>
        `;

    }

}

function renderCertificates(filter) {

    if (!container) return;

    container.innerHTML = "";

    let filteredCertificates = certificates;

    if (filter !== "All") {

        filteredCertificates =
            certificates.filter((certificate) =>
                (certificate.issuer || "")
                    .toLowerCase()
                    .includes(filter.toLowerCase())
            );

    }

    if (filteredCertificates.length === 0) {

        container.innerHTML = `
            <p class="certificate-empty">
                No certificates found.
            </p>
        `;

        return;

    }

    filteredCertificates.forEach((data) => {

        const image =
            certificateImages[data.title] ||
            "assets/certificates/default.jpg";

        const skillsArray = Array.isArray(data.skills)
            ? data.skills
            : String(data.skills || "")
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);

        const skills = skillsArray
            .map(skill => `<span>${skill}</span>`)
            .join("");

        container.innerHTML += `

        <div class="project-box">

            <div class="project-thumb">

                <img
                    src="${image}"
                    alt="${data.title}"
                    loading="lazy"
                >

            </div>

            <div class="project-info">

                <span class="project-category">
                    ${data.featured ? "FEATURED CERTIFICATE" : "CERTIFICATE"}
                </span>

                <h2>
                    ${data.title || "Certificate"}
                </h2>

                <p>
                    ${data.description || ""}
                </p>

                <div class="project-tech">
                    ${skills}
                </div>

                <div class="project-actions">

                    ${
                        data.credential
                            ? `
                            <a
                                href="${data.credential}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="project-action"
                            >
                                📄 View Certificate
                            </a>
                            `
                            : ""
                    }

                </div>

            </div>

        </div>

        `;

    });

}

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderCertificates(
            button.textContent.trim()
        );

    });

});

loadCertificates();