import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy
} from "firebase/firestore";

const grid = document.getElementById("projectsGrid");



    async function loadProjects() {

    grid.innerHTML = "";

    const snapshot = await getDocs(
    query(
        collection(db, "projects"),
        orderBy("featured", "desc"),
        orderBy("createdAt", "desc")
    )
);
    snapshot.forEach((project) => {

        const data = project.data();

        grid.innerHTML += `

        <div class="project-box ${data.category || ""}">

            <div class="project-thumb">

                <img
                    src="${data.image || "assets/projects/default-project.png"}"
                    alt="${data.title}"
                >

            </div>

            <div class="project-info">

                <span class="project-category">

                    ${data.featured ? "FEATURED" : "PROJECT"}

                </span>

                <h2>${data.title}</h2>

                <p>${data.description}</p>

                <div class="project-tech">

                    ${(data.technologies || [])
                        .map(tech => `<span>${tech}</span>`)
                        .join("")}

                </div>

                <div class="project-actions">

                    ${
                        data.demo
                        ? `<a href="${data.demo}" target="_blank" class="project-action">🎥 Demo</a>`
                        : ""
                    }

                    ${
                        data.documentation
                        ? `<a href="${data.documentation}" target="_blank" class="project-action">📄 Documentation</a>`
                        : ""
                    }

                    ${
                        data.github
                        ? `<a href="${data.github}" target="_blank" class="project-action">💻 GitHub</a>`
                        : ""
                    }

                </div>

            </div>

        </div>

        `;

    });

}

loadProjects();



/*=========================================
        PROJECT FILTER
=========================================*/

const filterButtons = document.querySelectorAll(".project-filters button");

const cards = document.querySelectorAll(".project-box");

filterButtons.forEach(button=>{

    button.addEventListener("click",()=>{

        filterButtons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        const filter=button.textContent.trim().toLowerCase();

        cards.forEach(card=>{

            if(

                filter==="all" ||

                card.classList.contains(filter) ||

                (filter==="data analytics" && card.classList.contains("data"))

            ){

                card.style.display="block";

                setTimeout(()=>{

                    card.style.opacity="1";

                    card.style.transform="translateY(0px)";

                },50);

            }

            else{

                card.style.opacity="0";

                card.style.transform="translateY(30px)";

                setTimeout(()=>{

                    card.style.display="none";

                },300);

            }

        });

    });

});