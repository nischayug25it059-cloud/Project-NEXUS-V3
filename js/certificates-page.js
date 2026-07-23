import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";

const container = document.getElementById("certificatesContainer");

const filterButtons = document.querySelectorAll(".project-filters button");

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

    const q = query(
        collection(db, "certificates"),
        orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    certificates = [];

    snapshot.forEach(doc => {

        certificates.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderCertificates("All");

}

function renderCertificates(filter) {

    container.innerHTML = "";

    let filtered = certificates;

    if (filter !== "All") {

        filtered = certificates.filter(c =>
            (c.issuer || "").toLowerCase() === filter.toLowerCase()
        );

    }

    filtered.forEach(data => {

        const image =
            certificateImages[data.title] ||
            "assets/certificates/default.jpg";

        const skills = (data.skills || [])
            .map(skill => `<span>${skill}</span>`)
            .join("");

        container.innerHTML += `

<div class="project-box">

    <div class="project-thumb">

        <img src="${image}" alt="${data.title}">

    </div>

    <div class="project-info">

        <span class="project-category">
            CERTIFICATE
        </span>

        <h2>${data.title}</h2>

        <p>${data.description}</p>

        <div class="project-tech">
            ${skills}
        </div>

        <div class="project-actions">

            <a
                href="${data.credential}"
                target="_blank"
                class="project-action">

                📄 View Certificate

            </a>

        </div>

    </div>

</div>

`;

    });

}

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        renderCertificates(button.textContent.trim());

    });

});

loadCertificates();

certificates.sort((a, b) => {
    if (a.featured !== b.featured) {
        return b.featured - a.featured;
    }
    return b.createdAt - a.createdAt;
});

