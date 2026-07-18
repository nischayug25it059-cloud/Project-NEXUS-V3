document.addEventListener("mousedown", (e) => {

    if (e.button !== 0) return; // sirf left click

    const ripple = document.createElement("span");

    ripple.className = "click-ripple";

    ripple.style.left = e.clientX + "px";
    ripple.style.top = e.clientY + "px";

    document.body.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);

});