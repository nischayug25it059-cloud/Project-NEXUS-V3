import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";


const track = document.querySelector(".slider-track");
const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");
const dotsContainer = document.querySelector(".slider-dots");


async function loadFeaturedProjects() {

    if (!track) return;


    const q = query(
        collection(db, "projects"),
        where("featured", "==", true)
    );


    const snapshot = await getDocs(q);

    const projects = [];

    snapshot.forEach((doc) => {

        projects.push({
            id: doc.id,
            ...doc.data()
        });

    });

    projects.sort((a, b) => {
        return (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999);
    });

    track.innerHTML = "";

    projects.forEach((project) => {

        track.innerHTML += `

            <article class="featured-slide">

                <div class="featured-image">

                    <img
                        src="${project.image || "assets/projects/default.jpg"}"
                        alt="${project.title || "Project"}"
                    >

                </div>


                <div class="featured-content">

                    <span class="featured-tag">
                        FEATURED PROJECT
                    </span>


                    <h3>
                        ${project.title || "Untitled Project"}
                    </h3>


                    <p>
                        ${project.description || ""}
                    </p>


                    <div class="featured-stack">

                        ${(project.technologies || project.tech || [])
                .map(item => `<span>${item}</span>`)
                .join("")
            }

                    </div>


                    <div class="featured-buttons">

                        ${project.liveDemo
                ? `
                                <a
                                    href="${project.liveDemo}"
                                    target="_blank"
                                    class="primary-btn"
                                >
                                    Live Demo
                                </a>
                            `
                : ""
            }


                        ${project.github
                ? `
                                <a
                                    href="${project.github}"
                                    target="_blank"
                                    class="secondary-btn"
                                >
                                    GitHub
                                </a>
                            `
                : ""
            }

                    </div>

                </div>

            </article>

        `;

    });


    setupProjectSlider();

}


function setupProjectSlider() {

    const slides =
        document.querySelectorAll(
            ".featured-slide"
        );


    if (!slides.length) return;


    let index = 0;


    dotsContainer.innerHTML = "";


    slides.forEach((slide, i) => {

        const dot =
            document.createElement("span");

        dot.className =
            i === 0
                ? "dot active"
                : "dot";


        dot.addEventListener(
            "click",
            () => {

                index = i;

                updateSlider();

            }
        );


        dotsContainer.appendChild(dot);

    });


    const dots =
        dotsContainer.querySelectorAll(".dot");


    function updateSlider() {

        track.style.transform =
            `translateX(-${index * 100}%)`;


        dots.forEach(dot =>
            dot.classList.remove("active")
        );


        dots[index]?.classList.add("active");

    }


    nextBtn?.addEventListener(
        "click",
        () => {

            index++;

            if (index >= slides.length) {

                index = 0;

            }

            updateSlider();

        }
    );


    prevBtn?.addEventListener(
        "click",
        () => {

            index--;

            if (index < 0) {

                index = slides.length - 1;

            }

            updateSlider();

        }
    );


    setInterval(() => {

        index++;

        if (index >= slides.length) {

            index = 0;

        }

        updateSlider();

    }, 6000);

}


loadFeaturedProjects();