import { db } from "../../firebase/firebase.js";
import { loadDocument, saveDocument } from "./utils.js";

export async function setupProjectsForm() {

    const form = document.getElementById("projectsForm");

    if (!form) return;

    const data = await loadDocument(db, "portfolio", "projects");

    if (data) {

        document.getElementById("projectTitle").value = data.title || "";
        document.getElementById("projectDescription").value = data.description || "";
        document.getElementById("projectGithub").value = data.github || "";
        document.getElementById("projectLive").value = data.live || "";

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        await saveDocument(db, "portfolio", "projects", {

            title: document.getElementById("projectTitle").value,
            description: document.getElementById("projectDescription").value,
            github: document.getElementById("projectGithub").value,
            live: document.getElementById("projectLive").value

        });

        alert("Project Saved 🚀");

    });

}