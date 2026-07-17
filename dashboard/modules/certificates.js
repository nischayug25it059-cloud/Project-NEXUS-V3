import { db } from "../../firebase/firebase.js";
import { loadDocument, saveDocument } from "./utils.js";

export async function setupCertificatesForm() {

    const form = document.getElementById("certificatesForm");

    if (!form) return;

    const data = await loadDocument(db, "portfolio", "certificates");

    if (data) {

        document.getElementById("certificateName").value = data.name || "";
        document.getElementById("certificateIssuer").value = data.issuer || "";
        document.getElementById("certificateLink").value = data.link || "";

    }

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        await saveDocument(db, "portfolio", "certificates", {

            name: document.getElementById("certificateName").value,
            issuer: document.getElementById("certificateIssuer").value,
            link: document.getElementById("certificateLink").value

        });

        alert("Certificate Saved 🚀");

    });

}