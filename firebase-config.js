// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, child, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC4AjavlEZA4mc3A8q1qlG3FwyXF6CqqOI",
    authDomain: "birthday-confirmation.firebaseapp.com",
    databaseURL: "https://birthday-confirmation-default-rtdb.firebaseio.com",
    projectId: "birthday-confirmation",
    storageBucket: "birthday-confirmation.firebasestorage.app",
    messagingSenderId: "654032261381",
    appId: "1:654032261381:web:a5d5a8dd08f1027c06276c",
    measurementId: "G-1RBV35Z66Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child, onValue };
