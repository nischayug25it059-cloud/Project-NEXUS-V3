import { db } from "../../firebase/firebase.js";
import { loadDocument, saveDocument } from "./utils.js";

export async function setupExperienceForm() {

    const form = document.getElementById("experienceForm");

    if (!form) return;

    const data = await loadDocument(db, "portfolio", "experience");

    if (data) {

        document.getElementById("company").value = data.company || "";
        document.getElementById("role").value = data.role || "";
        document.getElementById("duration").value = data.duration || "";

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        await saveDocument(db, "portfolio", "experience", {

            company: document.getElementById("company").value,
            role: document.getElementById("role").value,
            duration: document.getElementById("duration").value

        });

        alert("Experience Saved 🚀");

    });

}