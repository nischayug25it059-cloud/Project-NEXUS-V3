import { db } from "../../firebase/firebase.js";

import {
    collection,
    getDocs,
    updateDoc,
    doc
} from "firebase/firestore";


export async function setupFeaturedForm() {

    const projectsList =
        document.getElementById("featuredProjectsList");

    const certificatesList =
        document.getElementById("featuredCertificatesList");

    const saveButton =
        document.getElementById("saveFeatured");

    if (!projectsList || !certificatesList || !saveButton) return;


    let projects = [];
    let certificates = [];


    async function loadData() {

        const projectSnapshot =
            await getDocs(collection(db, "projects"));

        projects = [];

        projectSnapshot.forEach((item) => {

            projects.push({
                id: item.id,
                ...item.data()
            });

        });


        const certificateSnapshot =
            await getDocs(collection(db, "certificates"));

        certificates = [];

        certificateSnapshot.forEach((item) => {

            certificates.push({
                id: item.id,
                ...item.data()
            });

        });


        projects.sort(
            (a, b) =>
                (a.featuredOrder ?? 9999) -
                (b.featuredOrder ?? 9999)
        );


        certificates.sort(
            (a, b) =>
                (a.featuredOrder ?? 9999) -
                (b.featuredOrder ?? 9999)
        );


        renderProjects();
        renderCertificates();

    }


    function renderProjects() {

        projectsList.innerHTML = "";

        projects.forEach((project) => {

            projectsList.innerHTML += `

                <div
                    class="featured-item"
                    draggable="true"
                    data-id="${project.id}"
                >

                    <span class="drag-handle">☰</span>

                    <input
                        type="checkbox"
                        class="project-featured"
                        data-id="${project.id}"
                        ${project.featured ? "checked" : ""}
                    >

                    <span class="featured-name">

                        ${project.title || project.name || "Untitled Project"}

                    </span>

                </div>

            `;

        });

        updateProjectCount();
        enableDrag(projectsList);

    }


    function renderCertificates() {

        certificatesList.innerHTML = "";

        certificates.forEach((certificate) => {

            certificatesList.innerHTML += `

                <div
                    class="featured-item"
                    draggable="true"
                    data-id="${certificate.id}"
                >

                    <span class="drag-handle">☰</span>

                    <input
                        type="checkbox"
                        class="certificate-featured"
                        data-id="${certificate.id}"
                        ${certificate.featured ? "checked" : ""}
                    >

                    <span class="featured-name">

                        ${certificate.title || certificate.name || "Untitled Certificate"}

                    </span>

                </div>

            `;

        });

        updateCertificateCount();
        enableDrag(certificatesList);

    }


    function updateProjectCount() {

        const selected =
            projectsList.querySelectorAll(
                ".project-featured:checked"
            ).length;

        const counter =
            document.getElementById(
                "featuredProjectCount"
            );

        if (counter) {

            counter.textContent =
                `${selected} selected`;

        }

    }


    function updateCertificateCount() {

        const selected =
            certificatesList.querySelectorAll(
                ".certificate-featured:checked"
            ).length;

        const counter =
            document.getElementById(
                "featuredCertificateCount"
            );

        if (counter) {

            counter.textContent =
                `${selected} selected`;

        }

    }


    function enableDrag(container) {

        let draggedItem = null;


        container
            .querySelectorAll(".featured-item")
            .forEach((item) => {


                item.addEventListener(
                    "dragstart",
                    () => {

                        draggedItem = item;

                        item.classList.add(
                            "dragging"
                        );

                    }
                );


                item.addEventListener(
                    "dragend",
                    () => {

                        item.classList.remove(
                            "dragging"
                        );

                        draggedItem = null;

                    }
                );


                item.addEventListener(
                    "dragover",
                    (event) => {

                        event.preventDefault();

                        if (
                            !draggedItem ||
                            draggedItem === item
                        ) return;


                        const rect =
                            item.getBoundingClientRect();

                        const middle =
                            rect.top +
                            rect.height / 2;


                        if (
                            event.clientY < middle
                        ) {

                            container.insertBefore(
                                draggedItem,
                                item
                            );

                        } else {

                            container.insertBefore(
                                draggedItem,
                                item.nextSibling
                            );

                        }

                    }
                );

            });

    }


    document.addEventListener(
        "change",
        (event) => {

            if (
                event.target.classList.contains(
                    "project-featured"
                )
            ) {

                updateProjectCount();

            }


            if (
                event.target.classList.contains(
                    "certificate-featured"
                )
            ) {

                updateCertificateCount();

            }

        }
    );


    saveButton.addEventListener(
        "click",
        async () => {

            saveButton.disabled = true;
            saveButton.textContent = "Saving...";


            try {

                const projectItems =
                    projectsList.querySelectorAll(
                        ".featured-item"
                    );


                for (
                    let i = 0;
                    i < projectItems.length;
                    i++
                ) {

                    const item =
                        projectItems[i];

                    const id =
                        item.dataset.id;

                    const checkbox =
                        item.querySelector(
                            ".project-featured"
                        );


                    await updateDoc(

                        doc(
                            db,
                            "projects",
                            id
                        ),

                        {
                            featured:
                                checkbox.checked,

                            featuredOrder:
                                i + 1
                        }

                    );

                }


                const certificateItems =
                    certificatesList.querySelectorAll(
                        ".featured-item"
                    );


                for (
                    let i = 0;
                    i < certificateItems.length;
                    i++
                ) {

                    const item =
                        certificateItems[i];

                    const id =
                        item.dataset.id;

                    const checkbox =
                        item.querySelector(
                            ".certificate-featured"
                        );


                    await updateDoc(

                        doc(
                            db,
                            "certificates",
                            id
                        ),

                        {
                            featured:
                                checkbox.checked,

                            featuredOrder:
                                i + 1
                        }

                    );

                }


                alert(
                    "Featured content saved ⭐"
                );


            } catch (error) {

                console.error(
                    "Featured save error:",
                    error
                );

                alert(
                    "Something went wrong while saving."
                );

            }


            saveButton.disabled = false;
            saveButton.textContent =
                "Save Featured";

        }
    );


    await loadData();

}