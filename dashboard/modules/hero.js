import { db } from "../../firebase/firebase.js";
import { loadDocument, saveDocument } from "./utils.js";

export async function setupHeroForm() {

    const form = document.getElementById("heroForm");

    if (!form) return;

    const heroRef = doc(db, "portfolio", "hero");

    try {

        const data = await loadDocument(db, "portfolio", "hero");

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

            await setDoc(heroRef, heroData);

            alert("Hero Saved Successfully 🚀");

        } catch (err) {

            console.error(err);

            alert("Save Failed");

        }

    });

}