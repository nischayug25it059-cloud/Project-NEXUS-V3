import { auth, provider } from "../firebase/firebase.js";
import { signInWithPopup } from "firebase/auth";

const loginBtn = document.getElementById("googleLogin");

loginBtn.addEventListener("click", async () => {

    try {

        const result = await signInWithPopup(auth, provider);

        const user = result.user;

        // Sirf tumhara account allow hoga
        if (user.email !== "nischay.ug25it059@bitsindri.ac.in") {

            alert("Access Denied!");

            await auth.signOut();

            return;

        }

        localStorage.setItem("loggedIn", "true");

        window.location.href = "dashboard.html";

    }

    catch (error) {

        console.error(error);

        alert("Login Failed");

    }

});