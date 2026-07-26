import {
    db,
    collection,
    getDocs,
    query,
    orderBy
} from "../firebase/firebase.js";

async function loadSkills() {

    const skillsContainer = document.getElementById("skillsContainer");

    if (!skillsContainer) return;

    const snapshot = await getDocs(

        query(

            collection(db, "skills"),

            orderBy("order", "asc")

        )

    );

    skillsContainer.innerHTML = "";

    snapshot.forEach((doc) => {

        const skill = doc.data();

        skillsContainer.innerHTML += `

        <div class="skill-card">

            <div class="skill-top">

                <h3>
                    <i class="${skill.icon}"></i>
                    ${skill.name}
                </h3>

                <span>${skill.percentage}%</span>

            </div>

            <div class="progress">

                <div
                    class="progress-bar"
                    style="width:${skill.percentage}%">
                </div>

            </div>

        </div>

        `;

    });

}

loadSkills();