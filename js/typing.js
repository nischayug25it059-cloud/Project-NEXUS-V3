const roles = [
    "AI Developer",
    "Data Analyst",
    "Machine Learning Enthusiast",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingElement = document.getElementById("typing");

function typeEffect() {

    if (!typingElement) return;

    const current = roles[roleIndex];

    if (!isDeleting) {

        typingElement.textContent = current.substring(0, charIndex++);

        if (charIndex > current.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    } else {

        typingElement.textContent = current.substring(0, charIndex--);

        if (charIndex < 0) {

            isDeleting = false;

            roleIndex = (roleIndex + 1) % roles.length;

        }

    }

    setTimeout(typeEffect, isDeleting ? 40 : 90);

}

typeEffect();