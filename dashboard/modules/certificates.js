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

export async function setupCertificatesForm() {

    const form = document.getElementById("certificatesForm");
    const certificatesList = document.getElementById("certificatesList");

    let editingCertificateId = null;

    if (!form) return;

    async function loadCertificates() {

        certificatesList.innerHTML = "";

        const snapshot = await getDocs(

            query(
                collection(db, "certificates"),
                orderBy("createdAt", "desc")
            )

        );

        if (snapshot.empty) {

            certificatesList.innerHTML =
                "<p>No Certificates Added Yet.</p>";

            return;

        }

        snapshot.forEach(certificate => {

            const data = certificate.data();

            certificatesList.innerHTML += `

<div class="dashboard-card">

    <div class="project-info">

        <h3>
            ${data.title}
            ${data.featured ? "⭐" : ""}
        </h3>

        <p><b>Issuer:</b> ${data.issuer}</p>

        <p><b>Date:</b> ${data.issueDate}</p>

        <p>${data.description}</p>

        ${data.credential
                    ? `<a href="${data.credential}" target="_blank">Credential</a><br>`
                    : ""
                }

    </div>

    <div class="project-actions">

        <button
            class="edit-btn"
            data-id="${certificate.id}">
            Edit
        </button>

        <button
            class="delete-btn"
            data-id="${certificate.id}">
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
                        doc(db, "certificates", button.dataset.id)
                    );

                    loadCertificates();

                };

            });

        document.querySelectorAll(".edit-btn")
            .forEach(button => {

                button.onclick = async () => {

                    const ref = doc(
                        db,
                        "certificates",
                        button.dataset.id
                    );

                    const snap = await getDoc(ref);

                    if (!snap.exists()) return;

                    const data = snap.data();

                    editingCertificateId = button.dataset.id;

                    document.getElementById("certificateTitle").value =
                        data.title || "";

                    document.getElementById("certificateIssuer").value =
                        data.issuer || "";

                    document.getElementById("certificateDate").value =
                        data.issueDate || "";

                    document.getElementById("certificateCredential").value =
                        data.credential || "";

                    document.getElementById("certificateSkills").value =
                        (data.skills || []).join(",");

                    document.getElementById("certificateDescription").value =
                        data.description || "";

                    document.getElementById("certificateFeatured").value =
                        data.featured ? "true" : "false";

                    form.querySelector(".save-btn").textContent =
                        "Update Certificate";

                };

            });

    }

    await loadCertificates();

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const certificateData = {

            title:
                document.getElementById("certificateTitle").value,

            issuer:
                document.getElementById("certificateIssuer").value,

            issueDate:
                document.getElementById("certificateDate").value,

            credential:
                document.getElementById("certificateCredential").value,

            skills:
                document
                    .getElementById("certificateSkills")
                    .value
                    .split(",")
                    .map(skill => skill.trim())
                    .filter(skill => skill !== ""),

            description:
                document.getElementById("certificateDescription").value,

            featured:
                document.getElementById("certificateFeatured").value === "true"

        };

        if (editingCertificateId) {

            await updateDoc(

                doc(
                    db,
                    "certificates",
                    editingCertificateId
                ),

                certificateData

            );

            editingCertificateId = null;

            alert("Certificate Updated ✏️");

        } else {

            await addDoc(

                collection(db, "certificates"),

                {
                    ...certificateData,
                    createdAt: Date.now()
                }

            );

            alert("Certificate Added 🚀");

        }

        form.reset();

        form.querySelector(".save-btn").textContent =
            "Save Certificate";

        loadCertificates();

    });

}