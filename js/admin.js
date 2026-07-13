import { db } from "./firebase.js";

import {
collection,
getDocs,
deleteDoc,
doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const table=document.getElementById("appointmentTable");

window.loadAppointments=async function(){

table.innerHTML="";

const snapshot=await getDocs(collection(db,"appointments"));

snapshot.forEach((document)=>{

const data=document.data();

table.innerHTML+=`

<tr>

<td>${data.appointmentNo}</td>

<td>${data.patientName}</td>

<td>${data.doctor}</td>

<td>${data.department}</td>

<td>${data.date}</td>

<td>${data.time}</td>

<td>${data.status}</td>

<td>

<button class="delete"

onclick="deleteAppointment('${document.id}')">

Delete

</button>

</td>

</tr>

`;

});

}

window.deleteAppointment=async function(id){

if(confirm("Delete Appointment?")){

await deleteDoc(doc(db,"appointments",id));

loadAppointments();

}

}

loadAppointments();
