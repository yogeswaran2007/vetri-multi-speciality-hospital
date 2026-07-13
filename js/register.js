
import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    // Input Fields
    const inputs = document.querySelectorAll("input");
    const selects = document.querySelectorAll("select");

    const fullName = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const mobile = inputs[2].value.trim();
    const age = inputs[3].value.trim();

    const gender = selects[0].value;
    const bloodGroup = selects[1].value;

    const password = inputs[4].value;
    const confirmPassword = inputs[5].value;

    // Validation

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if (age < 1 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }

    if (gender === "") {
        alert("Please select your gender.");
        return;
    }

    if (bloodGroup === "") {
        alert("Please select your blood group.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    try {

        // Create Firebase Authentication Account
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        const user = userCredential.user;

        // Save Patient Details in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email,
            mobile: mobile,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            createdAt: new Date()
        });

        alert("Registration Successful!");

        window.location.href = "index.html";

    } catch (error) {

        alert(error.message);

    }

});
