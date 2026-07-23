import { db } from "../../firebase/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    getDoc,
    query,
    orderBy
} from "firebase/firestore";

export async function setupExperienceForm() {

    const form = document.getElementById("experienceForm");
    const experienceList = document.getElementById("experienceList");

    let editingExperienceId = null;

    if (!form) return;

    async function loadExperiences() {

        experienceList.innerHTML = "";

        const snapshot = await getDocs(

            query(
                collection(db, "experience"),
                orderBy("createdAt", "desc")
            )

        );

        if (snapshot.empty) {

            experienceList.innerHTML =
                "<p>No Experience Added Yet.</p>";

            return;

        }

        snapshot.forEach(exp => {

            const data = exp.data();

            experienceList.innerHTML += `

<div class="dashboard-card">

<div class="project-info">

<h3>

${data.company}

${data.featured ? "⭐" : ""}

</h3>

<p><b>Role:</b> ${data.role}</p>

<p><b>Date:</b> ${data.duration}</p>

<p>${data.description}</p>

<div class="project-tech">

${(data.skills || [])

                    .map(skill => `<span>${skill}</span>`)

                    .join("")}

</div>

</div>

<div class="project-actions">

<button
class="edit-btn"
data-id="${exp.id}">

Edit

</button>

<button
class="delete-btn"
data-id="${exp.id}">

Delete

</button>

</div>

</div>

`;

        });
        // Delete Experience
        document.querySelectorAll(".delete-btn").forEach(button => {

            button.onclick = async () => {

                await deleteDoc(
                    doc(db, "experience", button.dataset.id)
                );

                loadExperiences();

            };

        });

        // Edit Experience
        document.querySelectorAll(".edit-btn").forEach(button => {

            button.onclick = async () => {

                const ref = doc(db, "experience", button.dataset.id);

                const snap = await getDoc(ref);

                if (!snap.exists()) return;

                const data = snap.data();

                editingExperienceId = button.dataset.id;

                document.getElementById("company").value =
                    data.company || "";

                document.getElementById("role").value =
                    data.role || "";

                document.getElementById("duration").value =
                    data.duration || "";

                document.getElementById("description").value =
                    data.description || "";

                document.getElementById("achievements").value =
                    (data.achievements || []).join("\n");

                document.getElementById("skills").value =
                    (data.skills || []).join(",");

                document.getElementById("featured").value =
                    data.featured ? "true" : "false";

                form.querySelector(".save-btn").textContent =
                    "Update Experience";

            };

        });

    }

    await loadExperiences();

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const experienceData = {

            company:
                document.getElementById("company").value,

            role:
                document.getElementById("role").value,

            duration:
                document.getElementById("duration").value,

            description:
                document.getElementById("description").value,

            achievements:
                document.getElementById("achievements")
                    .value
                    .split("\n")
                    .map(item => item.trim())
                    .filter(item => item !== ""),

            skills:
                document.getElementById("skills")
                    .value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== ""),

            featured:
                document.getElementById("featured").value === "true"

        };

        if (editingExperienceId) {

            await updateDoc(

                doc(db, "experience", editingExperienceId),

                experienceData

            );

            editingExperienceId = null;

            alert("Experience Updated ✏️");

        } else {

            await addDoc(

                collection(db, "experience"),

                {
                    ...experienceData,
                    createdAt: Date.now()
                }

            );

            alert("Experience Added 🚀");

        }

        form.reset();

        form.querySelector(".save-btn").textContent =
            "Save Experience";

        await loadExperiences();

    });

}