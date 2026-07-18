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
export async function setupProjectsForm() {

    const form = document.getElementById("projectsForm");
    const projectsList = document.getElementById("projectsList");
    let editingProjectId = null;

    if (!form) return;

    async function loadProjects() {

        projectsList.innerHTML = "";

        const snapshot = await getDocs(

            query(

                collection(db, "projects"),

                orderBy("createdAt", "desc")

            )

        );

        if (snapshot.empty) {

            projectsList.innerHTML = `
                <p>No Projects Added Yet.</p>
            `;

            return;
        }

        snapshot.forEach(project => {

            const data = project.data();

            projectsList.innerHTML += `

<div class="dashboard-card">

    <div class="project-info">

        <h3>
            ${data.title}
            ${data.featured ? "⭐" : ""}
        </h3>

        <p>${data.description}</p>

        <div class="project-tags">

            ${(data.technologies || [])
                    .map(tag => `<span>${tag}</span>`)
                    .join("")}

        </div>

        <br>

        ${data.github
                    ? `<a href="${data.github}" target="_blank">GitHub</a><br>`
                    : ""}

        ${data.demo
                    ? `<a href="${data.demo}" target="_blank">Demo</a><br>`
                    : ""}

        ${data.documentation
                    ? `<a href="${data.documentation}" target="_blank">Documentation</a>`
                    : ""}

    </div>

    <div class="project-actions">

        <button
            class="edit-btn"
            data-id="${project.id}"
        >
            Edit
        </button>

        <button
            class="delete-btn"
            data-id="${project.id}"
        >
            Delete
        </button>

    </div>

</div>

`;

        });

        document.querySelectorAll(".delete-btn")
            .forEach(button => {

                button.onclick = async () => {

                    await deleteDoc(
                        doc(db, "projects", button.dataset.id)
                    );

                    loadProjects();

                }

            });

        document.querySelectorAll(".edit-btn")
            .forEach(button => {

                button.onclick = async () => {

                    const projectRef = doc(db, "projects", button.dataset.id);

                    const projectSnap = await getDoc(projectRef);

                    if (!projectSnap.exists()) return;

                    const data = projectSnap.data();

                    editingProjectId = button.dataset.id;

                    document.getElementById("projectTitle").value = data.title || "";
                    document.getElementById("projectDescription").value = data.description || "";
                    document.getElementById("projectGithub").value = data.github || "";
                    document.getElementById("projectDemo").value = data.demo || "";
                    document.getElementById("projectDocs").value = data.documentation || "";
                    document.getElementById("projectCategory").value = data.category || "web";
                    document.getElementById("projectFeatured").value = data.featured ? "true" : "false";
                    document.getElementById("projectTech").value =
                        (data.technologies || []).join(",");

                    document.getElementById("projectImage").value =
                        data.image || "";

                    form.querySelector("button[type='submit']").textContent =
                        "Update Project";

                };

            });

    }

    await loadProjects();

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const imageUrl =
            document.getElementById("projectImage").value.trim();

        const projectData = {

            title: document.getElementById("projectTitle").value,

            description: document.getElementById("projectDescription").value,

            github: document.getElementById("projectGithub").value,

            demo: document.getElementById("projectDemo").value,

            documentation: document.getElementById("projectDocs").value,

            category: document.getElementById("projectCategory").value,

            featured:
                document.getElementById("projectFeatured").value === "true",

            technologies:
                document.getElementById("projectTech")
                    .value
                    .split(",")
                    .map(t => t.trim())
                    .filter(t => t !== ""),

            image: imageUrl,

            createdAt: Date.now()

        };

        if (editingProjectId) {

            await updateDoc(
                doc(db, "projects", editingProjectId),
                projectData
            );

            editingProjectId = null;

            alert("Project Updated ✏️");

        } else {

            await addDoc(
                collection(db, "projects"),
                projectData
            );

            alert("Project Added 🚀");

        }

        form.reset();

        form.querySelector("button[type='submit']").textContent =
            "Save Project";

        await loadProjects();

        form.reset();

        await loadProjects();

        alert("Project Added 🚀");

    });

}