const links = document.querySelectorAll("a[href]");

links.forEach(link => {

    const href = link.getAttribute("href");

    if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("http")
    ) return;

    link.addEventListener("click", function(e){

        e.preventDefault();

        document.body.classList.add("page-exit");

        setTimeout(()=>{

            window.location.href = href;

        },500);

    });

});