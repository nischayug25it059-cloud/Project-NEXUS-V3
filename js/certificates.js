import { db } from "../firebase/firebase.js";

import {
    collection,
    getDocs,
    query,
    where,
} from "firebase/firestore";


const track =
    document.querySelector(
        ".certificate-track"
    );

const nextBtn =
    document.querySelector(
        ".certificate-next"
    );

const prevBtn =
    document.querySelector(
        ".certificate-prev"
    );

const dotsContainer =
    document.querySelector(
        ".certificate-dots"
    );


const certificateImages = {

    "Complete Python Bootcamp":
        "assets/certificates/python.jpg",

    "SQL Advanced":
        "assets/certificates/sql.jpg",

    "Google Data Analytics":
        "assets/certificates/google.jpg",

    "Power BI Masterclass":
        "assets/certificates/powerbi.jpg"

};


async function loadFeaturedCertificates() {

    if (!track) return;


    const q = query(
        collection(db, "certificates"),
        where("featured", "==", true)
    );


    const snapshot = await getDocs(q);

    const certificates = [];

    snapshot.forEach((doc) => {

        certificates.push({
            id: doc.id,
            ...doc.data()
        });

    });

    certificates.sort((a, b) => {
        return (a.featuredOrder ?? 9999) - (b.featuredOrder ?? 9999);
    });

    track.innerHTML = "";

    certificates.forEach((certificate) => {


        const image =
            certificateImages[
            certificate.title
            ] ||
            certificate.image ||
            "assets/certificates/default.jpg";


        const skillsData = certificate.skills || [];

        const skillsArray = Array.isArray(skillsData)
            ? skillsData
            : String(skillsData)
                .split(",")
                .map(skill => skill.trim())
                .filter(Boolean);

        const skills = skillsArray
            .map(skill => `<span>${skill}</span>`)
            .join("");


        track.innerHTML += `

    <article class="featured-slide certificate-slide">

        <div class="featured-image">

            <img
                src="${image}"
                alt="${certificate.title || "Certificate"}"
            >

        </div>


        <div class="featured-content">

            <span class="featured-tag">
                FEATURED CERTIFICATE
            </span>


            <h3>
                ${certificate.title || "Certificate"}
            </h3>


            <p>
                ${certificate.description || ""}
            </p>


            <div class="featured-stack">

                ${skills}

            </div>


            <div class="featured-buttons">

                ${certificate.credential
                ? `
                        <a
                            href="${certificate.credential}"
                            target="_blank"
                            class="primary-btn"
                        >
                            View Certificate
                        </a>
                    `
                : ""
            }

            </div>

        </div>

    </article>

`;

    });


    setupCertificateSlider();

}


function setupCertificateSlider() {

    const slides =
        document.querySelectorAll(
            ".certificate-slide"
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


loadFeaturedCertificates();