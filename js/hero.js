// =============================
// HERO 3D PHYSICS
// =============================

const hero = document.querySelector(".hero");
const profile = document.querySelector(".profile-wrapper");
const ring = document.querySelector(".profile-ring");
 const heroLeft = document.querySelector(".hero-left");

if (hero && profile) {

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 22;
        const rotateX = ((y / rect.height) - 0.5) * -22;

        gsap.to(heroLeft, {

            x: rotateY * 1.5,

            y: -rotateX * 1.5,

            duration: .8,

            ease: "power3.out"

        });

        gsap.to(profile, {

            rotateX,

            rotateY,

            duration: .7,

            ease: "power3.out",

            transformPerspective: 1400,

            transformOrigin: "center"

        });

        gsap.to(ring, {

            x: rotateY * 2,

            y: -rotateX * 2,

            duration: .8,

            ease: "power3.out"

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