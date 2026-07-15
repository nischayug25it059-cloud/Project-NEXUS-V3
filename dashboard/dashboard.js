import { db, auth, provider } from "../firebase/firebase.js";

console.log("Firebase Connected");
console.log(db);
console.log(auth);
console.log(provider);

// Sidebar Items
const menuItems = document.querySelectorAll(".menu li[data-page]");

// Content Area
const content = document.getElementById("content");

// Load Page
async function loadPage(page){

    try{

        const response = await fetch(`pages/${page}.html`);

        const html = await response.text();

        content.innerHTML = html;

    }catch(err){

        content.innerHTML = "<h2>Page Not Found</h2>";

    }

}

// Sidebar Click

menuItems.forEach(item=>{

    item.addEventListener("click",()=>{

        menuItems.forEach(i=>i.classList.remove("active"));

        item.classList.add("active");

        loadPage(item.dataset.page);

    });

});

// Default Page

loadPage("dashboard-home");

async function getPortfolioData(){

    const response = await fetch("../data/portfolio.json");

    return await response.json();

}

async function loadDashboard(){

    const data = await getPortfolioData();

    console.log(data);

}

loadDashboard();