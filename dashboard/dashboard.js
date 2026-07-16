import { setupHeroForm } from "./modules/hero.js";
import { setupAboutForm } from "./modules/about.js";
import { db, auth, provider } from "../firebase/firebase.js";


if (localStorage.getItem("loggedIn") !== "true") {

    window.location.href = "login.html";

}

console.log("Firebase Connected");
console.log(db);
console.log(auth);
console.log(provider);

// Sidebar Items
const menuItems = document.querySelectorAll(".menu li[data-page]");

// Content Area
const content = document.getElementById("content");

// Load Page
async function loadPage(page) {

    try {

        const response = await fetch(`pages/${page}.html`);

        const html = await response.text();

        content.innerHTML = html;

        if (page === "hero") {

            setupHeroForm();

        }

        if (page === "about") {

            setupAboutForm();

        }

    } catch (err) {

        content.innerHTML = "<h2>Page Not Found</h2>";

    }

}

// Sidebar Click

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        menuItems.forEach(i => i.classList.remove("active"));

        item.classList.add("active");

        loadPage(item.dataset.page);

    });

});

// Default Page

loadPage("dashboard-home");