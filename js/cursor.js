const dot = document.querySelector(".cursor-dot");
const ring = document.querySelector(".cursor-ring");

if(dot && ring){

    let mouseX = window.innerWidth/2;
    let mouseY = window.innerHeight/2;

    window.addEventListener("mousemove",(e)=>{

        mouseX = e.clientX;
        mouseY = e.clientY;

        dot.style.left = mouseX + "px";
        dot.style.top = mouseY + "px";

    });

    function animate(){

        ring.style.left = mouseX + "px";
        ring.style.top = mouseY + "px";

        requestAnimationFrame(animate);

    }

    animate();

    document.querySelectorAll(
        "a,button,.project-box,.skill-card,.certificate-slide,.timeline-card"
    ).forEach(item=>{

        item.addEventListener("mouseenter",()=>{

            ring.classList.add("cursor-hover");

        });

        item.addEventListener("mouseleave",()=>{

            ring.classList.remove("cursor-hover");

        });

    });

}