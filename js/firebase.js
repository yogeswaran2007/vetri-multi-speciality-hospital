import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXUMSRPTb-qZZ4ks6jVQSzsN5Z6YfqS_4",
  authDomain: "vetri-multispeciality-ho-e59da.firebaseapp.com",
  projectId: "vetri-multispeciality-ho-e59da",
  storageBucket: "vetri-multispeciality-ho-e59da.firebasestorage.app",
  messagingSenderId: "994034894052",
  appId: "1:994034894052:web:d3ba5b9333e388daa0d8f1"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
