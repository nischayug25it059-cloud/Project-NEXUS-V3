import { db } from "../../firebase/firebase.js";
import { loadDocument, saveDocument } from "./utils.js";

export async function setupSkillsForm() {

    const form = document.getElementById("skillsForm");

    if (!form) return;

    const data = await loadDocument(db, "portfolio", "skills");

    if (data) {

        document.getElementById("skillsList").value =
            data.skills || "";

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        await saveDocument(db, "portfolio", "skills", {

            skills: document.getElementById("skillsList").value

        });

        alert("Skills Saved 🚀");

    });

}