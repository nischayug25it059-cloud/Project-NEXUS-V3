// ================================
// MOUSE LIGHT
// ================================

const mouseLight = document.querySelector(".mouse-light");

if(mouseLight){

window.addEventListener("mousemove",(e)=>{

gsap.to(mouseLight,{

x:e.clientX,

y:e.clientY,

duration:.6,

ease:"power3.out"

});

});

}

//=====================================
// NEXUS STARS
//=====================================

const stars=document.querySelector(".stars");

if(stars){

for(let i=0;i<80;i++){

const star=document.createElement("span");

star.className="star";

const size=Math.random()*3+1;

star.style.width=size+"px";
star.style.height=size+"px";

star.style.left=Math.random()*100+"%";
star.style.top=Math.random()*100+"%";

star.style.animationDuration=
(2+Math.random()*4)+"s";

star.style.animationDelay=
Math.random()*5+"s";

stars.appendChild(star);

}

}