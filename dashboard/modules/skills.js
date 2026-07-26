import { db } from "../../firebase/firebase.js";

import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy
} from "firebase/firestore";

let form;
let skillList;

let editingSkillId = null;

export function setupSkillsForm() {

    form = document.getElementById("skillForm");
    skillList = document.getElementById("skillList");

    if (!form) return;

    loadSkills();

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const skillData = {

            name: document.getElementById("skillName").value,

            icon: document.getElementById("skillIcon").value,

            percentage: Number(document.getElementById("skillPercentage").value),

            order: Number(document.getElementById("skillOrder").value),

            createdAt: Date.now()

        };

        if (editingSkillId) {

            await updateDoc(
                doc(db, "skills", editingSkillId),
                skillData
            );

            editingSkillId = null;

            alert("Skill Updated ✅");

        } else {

            await addDoc(
                collection(db, "skills"),
                skillData
            );

            alert("Skill Added ✅");

        }

        form.reset();

        loadSkills();

    });

}

async function loadSkills() {

    skillList.innerHTML = "";

    const snapshot = await getDocs(

        query(

            collection(db, "skills"),

            orderBy("order", "asc")

        )

    );

    snapshot.forEach((docSnap) => {

        const skill = docSnap.data();

        skillList.innerHTML += `

        <div class="skill-card">

            <div class="skill-top">

                <div class="left">

                    <i class="${skill.icon}"></i>

                    <h3>${skill.name}</h3>

                </div>

                <span>${skill.percentage}%</span>

            </div>

            <div class="skill-progress">

                <div style="width:${skill.percentage}%"></div>

            </div>

            <div class="skill-order">

                Display Order : ${skill.order}

            </div>

            <div class="skill-actions">

                <button
                    class="edit-btn"
                    onclick="editSkill('${docSnap.id}')">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteSkill('${docSnap.id}')">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

async function editSkill(id) {

    const snapshot = await getDocs(collection(db, "skills"));

    snapshot.forEach((docSnap) => {

        if (docSnap.id === id) {

            const skill = docSnap.data();

            document.getElementById("skillName").value = skill.name;

            document.getElementById("skillIcon").value = skill.icon;

            document.getElementById("skillPercentage").value = skill.percentage;

            document.getElementById("skillOrder").value = skill.order;

            editingSkillId = id;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

}

async function deleteSkill(id) {

    const confirmDelete = confirm(
        "Delete this skill?"
    );

    if (!confirmDelete) return;

    await deleteDoc(

        doc(db, "skills", id)

    );

    alert("Skill Deleted 🗑");

    loadSkills();

}

window.editSkill = editSkill;
window.deleteSkill = deleteSkill;