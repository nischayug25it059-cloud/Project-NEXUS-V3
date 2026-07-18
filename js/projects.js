const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".featured-slide");

const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");

const dots = document.querySelectorAll(".dot");

let index = 0;

function updateSlider() {

    track.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

}

nextBtn.addEventListener("click", () => {

    index++;

    if(index >= slides.length){

        index = 0;

    }

    updateSlider();

});

prevBtn.addEventListener("click", () => {

    index--;

    if(index < 0){

        index = slides.length - 1;

    }

    updateSlider();

});

dots.forEach((dot,i)=>{

    dot.addEventListener("click",()=>{

        index=i;

        updateSlider();

    });

});

setInterval(()=>{

    index++;

    if(index>=slides.length){

        index=0;

    }

    updateSlider();

},6000);