import { db } from "./firebase.js";

import {
    collection,
    addDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Initialize EmailJS
emailjs.init("T_s08WJj9qmt72LLc");

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const patientName = document.getElementById("patientName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const email = document.getElementById("email").value.trim();
    const department = document.getElementById("department").value;
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const symptoms = document.getElementById("symptoms").value.trim();

    // Validation

    if (patientName === "") {
        alert("Please enter patient name.");
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    if (department === "") {
        alert("Please select department.");
        return;
    }

    if (doctor === "") {
        alert("Please select doctor.");
        return;
    }

    if (date === "") {
        alert("Please select appointment date.");
        return;
    }

    if (time === "") {
        alert("Please select appointment time.");
        return;
    }

    // Auto Appointment Number

    const appointmentNo = "VMH" + Date.now().toString().slice(-6);

    document.getElementById("appointmentNo").value = appointmentNo;

    try {

        // Save Appointment in Firestore

        await addDoc(collection(db, "appointments"), {

            patientName: patientName,
            mobile: mobile,
            email: email,
            department: department,
            doctor: doctor,
            date: date,
            time: time,
            symptoms: symptoms,
            appointmentNo: appointmentNo,
            status: "Booked",
            createdAt: Timestamp.now()

        });

        // Send Confirmation Email

        await emailjs.send(
            "service_edye3va",
            "template_fv8jcxy",
            {
                patient_name: patientName,
                email: email,
                doctor: doctor,
                department: department,
                date: date,
                time: time,
                appointment_no: appointmentNo
            }
        );

        // Save Appointment Number

        localStorage.setItem("appointmentNo", appointmentNo);

        alert("Appointment Booked Successfully!");

        window.location.href = "success.html";

    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

    }

});
