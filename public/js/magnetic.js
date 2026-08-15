// =============================
// MAGNETIC BUTTONS
// =============================

const magneticElements = document.querySelectorAll(
".primary-btn,.secondary-btn,.resume-btn,.view-all-btn,.project-action,.certificate-btn"
);

magneticElements.forEach(element=>{

    element.addEventListener("mousemove",(e)=>{

        const rect=element.getBoundingClientRect();

        const x=e.clientX-rect.left-rect.width/2;

        const y=e.clientY-rect.top-rect.height/2;

        element.style.transform=`translate(${x*0.18}px,${y*0.18}px)`;

    });

    element.addEventListener("mouseleave",()=>{

        element.style.transform="translate(0,0)";

    });

});


// =============================
// CARD SPOTLIGHT
// =============================

const cards=document.querySelectorAll(

".skill-card,.featured-slide,.certificate-slide,.timeline-card,.about-card,.project-box"

);

cards.forEach(card=>{

    card.classList.add("spotlight-card");

    card.addEventListener("mousemove",e=>{

        const rect=card.getBoundingClientRect();

        card.style.setProperty(
            "--x",
            `${e.clientX-rect.left}px`
        );

        card.style.setProperty(
            "--y",
            `${e.clientY-rect.top}px`
        );

    });

});