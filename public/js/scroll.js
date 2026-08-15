gsap.registerPlugin(ScrollTrigger);

// Lenis
const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 0.9,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Hero Exit
const heroTimeline = gsap.timeline({

    scrollTrigger: {

        trigger: ".hero",

        start: "top top",

        end: "bottom top",

        scrub: 1,

       /*  pin: true */

    }

});

gsap.to(".hero",{

    scale:.90,

    opacity:.25,

    filter:"blur(10px)",

    scrollTrigger:{

        trigger:".hero",

        start:"top top",

        end:"bottom top",

        scrub:1

    }

});

heroTimeline

    .to(".hero-left", {

        x: -250,

        opacity: 0,

        filter: "blur(10px)"

    }, 0)

    .to(".hero-right", {

        x: 250,

        opacity: 0,

        rotate: 10,

        filter: "blur(10px)"

    }, 0)

    .to(".animated-bg", {

        scale: 1.15,

        opacity: .5

    }, 0);


// About

gsap.from(".about-container", {

    y: 150,

    opacity: 0,

    scale: .92,

    scrollTrigger: {

        trigger: ".about",

        start: "top 75%",

        end: "top 35%",

        scrub: 1

    }

});


// Skills

gsap.utils.toArray(".skill-card").forEach((card, i) => {

    gsap.from(card,{

        x:i%2===0?-150:150,
        y:60,
        opacity:0,
        rotate:i%2===0?-5:5,
        duration:1,
        ease:"power3.out",

        scrollTrigger:{
            trigger:card,
            start:"top 85%",
            toggleActions:"play none none reverse",
            invalidateOnRefresh:true
        }

    });

});

// =============================
// CINEMATIC SECTION REVEAL
// =============================

gsap.utils.toArray("section").forEach((section) => {

    if(
        section.classList.contains("hero") ||
        section.classList.contains("skills")
    ) return;

    gsap.from(section,{

        y:120,

        opacity:0,

        scale:.96,

        filter:"blur(10px)",

        duration:1.3,

        ease:"power3.out",

        scrollTrigger:{

            trigger:section,

            start:"top 80%",

            toggleActions:"play none none reverse",

            invalidateOnRefresh:true

        }

    });

});

window.addEventListener("load",()=>{

    ScrollTrigger.refresh();

});

window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});