import { db } from "../../firebase/firebase.js";
import { doc, setDoc, getDoc } from "firebase/firestore";

export async function setupAboutForm() {

    const form = document.getElementById("aboutForm");

    if (!form) return;

    const aboutRef = doc(db, "portfolio", "about");

    try {

        const snapshot = await getDoc(aboutRef);

        if (snapshot.exists()) {

            const data = snapshot.data();

            document.getElementById("aboutHeading").value = data.heading || "";
            document.getElementById("aboutLocation").value = data.location || "";
            document.getElementById("aboutDescription").value = data.description || "";
            document.getElementById("aboutEmail").value = data.email || "";
            document.getElementById("aboutPhone").value = data.phone || "";
            document.getElementById("aboutExperience").value = data.experience || "";
            document.getElementById("aboutEducation").value = data.education || "";

        }

    } catch (err) {

        console.error(err);

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const aboutData = {

            heading: document.getElementById("aboutHeading").value,
            location: document.getElementById("aboutLocation").value,
            description: document.getElementById("aboutDescription").value,
            email: document.getElementById("aboutEmail").value,
            phone: document.getElementById("aboutPhone").value,
            experience: document.getElementById("aboutExperience").value,
            education: document.getElementById("aboutEducation").value

        };

        try {

            await setDoc(aboutRef, aboutData);

            alert("About Saved Successfully 🚀");

        } catch (err) {

            console.error(err);

            alert("Save Failed");

        }

    });

}