// =============================
// HERO 3D PHYSICS
// =============================

const hero = document.querySelector(".hero");
const profile = document.querySelector(".profile-wrapper");
const ring = document.querySelector(".profile-ring");
const heroLeft = document.querySelector(".hero-left");

if (hero && profile) {

    document.addEventListener("mousemove", (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        // ONLY the blue profile ring moves
        const moveX = mouseX * 10;
        const moveY = mouseY * 10;

        gsap.to(".profile-ring", {
            x: moveX,
            y: moveY,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true
        });
    });

    hero.addEventListener("mouseleave", () => {

        gsap.to(profile, {

            rotateX: 0,

            rotateY: 0,

            duration: 1,

            ease: "elastic.out(1,.4)"

        });

        gsap.to(ring, {

            x: 0,

            y: 0,

            duration: 1

        });

    });

}