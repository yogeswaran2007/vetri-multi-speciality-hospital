
import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// Show / Hide Password

const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        password.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});


// Login Form

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (email === "" || pass === "") {
        alert("Please fill all the fields.");
        return;
    }

    try {

        await signInWithEmailAndPassword(auth, email, pass);

        alert("Login Successful!");

        window.location.href = "home.html";

    } catch (error) {

        alert(error.message);

    }

});
