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

    function initSkillAnimation() {

        const cards = document.querySelectorAll(".skill-card");

        const observer = new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                } else {

                    entry.target.classList.remove("show");

                }

            });

        }, { threshold: 0.2 });

        cards.forEach((card) => {

            observer.observe(card);

        });
    }

    initSkillAnimation();

}

loadSkills();

function initSkillAnimation() {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                gsap.to(entry.target, {

                    opacity: 1,

                    y: 0,

                    x: 0,

                    scale: 1,

                    duration: .8,

                    ease: "power3.out"

                });

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: .2

    });

    document.querySelectorAll(".skill-card").forEach((card, index) => {

        gsap.set(card, {

            opacity: 0,

            y: 70,

            x: index % 2 === 0 ? -40 : 40,

            scale: .9

        });

        observer.observe(card);

    });

}