const spotlight = document.querySelector(".spotlight");

document.addEventListener("mousemove",(e)=>{

spotlight.style.left=e.clientX+"px";

spotlight.style.top=e.clientY+"px";

});
const particleContainer = document.querySelector(".particles");

for(let i=0;i<40;i++){

const p=document.createElement("div");

p.classList.add("particle");

const size=Math.random()*4+2;

p.style.width=size+"px";
p.style.height=size+"px";

p.style.left=Math.random()*100+"vw";
p.style.top=Math.random()*100+"vh";

p.style.animationDuration=(10+Math.random()*15)+"s";

p.style.animationDelay=(Math.random()*10)+"s";

particleContainer.appendChild(p);

}
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if (scrollY >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
// =============================
// NEXUS V2 - Smooth Scroll
// =============================

const lenis = new Lenis({
  autoRaf: true,
  duration: 1.1,
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
});

// ======================================
// HERO INTRO ANIMATION
// ======================================

const tl = gsap.timeline();

tl.from(".logo", {
    y: -40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out"
})

.from(".nav-links li", {
    y: -30,
    opacity: 0,
    stagger: 0.08,
    duration: 0.5,
    ease: "power3.out"
}, "-=0.3")

.from(".resume-btn", {
    scale: 0.8,
    opacity: 0,
    duration: 0.4
}, "-=0.3")

.from(".intro", {
    x: -60,
    opacity: 0,
    duration: 0.6
})

.from(".hero h1", {
    y: 80,
    opacity: 0,
    duration: 0.8,
    ease: "power4.out"
}, "-=0.2")

.from(".hero h2", {
    y: 40,
    opacity: 0,
    duration: 0.6
}, "-=0.3")

.from(".hero-text", {
    y: 30,
    opacity: 0,
    duration: 0.5
}, "-=0.2")

.from(".hero-buttons a", {
    y: 20,
    opacity: 0,
    stagger: 0.15,
    duration: 0.5
})

.from(".profile-wrapper", {
    scale: 0.7,
    opacity: 0,
    rotate: 15,
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.8");