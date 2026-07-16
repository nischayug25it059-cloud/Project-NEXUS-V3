import { db, auth, provider } from "../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

async function getPortfolioData() {

    const response = await fetch("../data/portfolio.json");

    return await response.json();

}

async function loadDashboard() {

    const data = await getPortfolioData();

    console.log(data);

}

loadDashboard();

async function setupHeroForm() {

    const form = document.getElementById("heroForm");
    const heroRef = doc(db, "portfolio", "hero");

    await setDoc(heroRef, heroData);

    try {

        const snapshot = await getDoc(heroRef);

        console.log(snapshot.exists());
        console.log(snapshot.data());

        if (snapshot.exists()) {

            const data = snapshot.data();

            document.getElementById("heroName").value = data.name || "";
            document.getElementById("heroRole").value = data.role || "";
            document.getElementById("heroTyping").value = data.typing || "";
            document.getElementById("heroGithub").value = data.github || "";
            document.getElementById("heroLinkedin").value = data.linkedin || "";
            document.getElementById("heroResume").value = data.resume || "";

        }

    } catch (err) {

        console.error(err);

    }

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const heroData = {

            name: document.getElementById("heroName").value,

            role: document.getElementById("heroRole").value,

            typing: document.getElementById("heroTyping").value,

            github: document.getElementById("heroGithub").value,

            linkedin: document.getElementById("heroLinkedin").value,

            resume: document.getElementById("heroResume").value

        };

        try {

            await setDoc(doc(db, "portfolio", "hero"), heroData);

            alert("Hero Saved Successfully 🚀");

        } catch (err) {

            console.error(err);

            alert("Failed to Save");

        }

    });
}