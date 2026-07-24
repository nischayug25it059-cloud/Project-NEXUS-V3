import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";

const container = document.getElementById("experienceContainer");

async function loadExperience() {

    if (!container) return;

    container.innerHTML = "";

    const snapshot = await getDocs(

        query(
            collection(db, "experience"),
            orderBy("createdAt", "desc")
        )

    );

    let experiences = [];

    snapshot.forEach(doc => {

        experiences.push({
            id: doc.id,
            ...doc.data()
        });

    });

    experiences.sort((a, b) => {

        if (a.featured !== b.featured) {

            return b.featured - a.featured;

        }

        return b.createdAt - a.createdAt;

    });

    experiences.forEach((exp, index) => {

        container.innerHTML += `
<div class="timeline-item ${index % 2 === 0 ? "left" : "right"}">

    <div class="timeline-dot"></div>

    <div class="timeline-card">

        <span class="timeline-year">${exp.duration}</span>

        <h3>${exp.company}</h3>

        <h4>${exp.role}</h4>

        <p>${exp.description}</p>

        ${
            exp.achievements && exp.achievements.length
            ? `
            <div class="timeline-projects">

                ${exp.achievements.map(item => `
                    <div class="project-item">
                        ✅ ${item}
                    </div>
                `).join("")}

            </div>
            `
            : ""
        }

        ${
            exp.skills && exp.skills.length
            ? `
            <div class="timeline-tech">

                ${exp.skills.map(skill => `
                    <span>${skill}</span>
                `).join("")}

            </div>
            `
            : ""
        }

    </div>

</div>
`;

    });

}

loadExperience();