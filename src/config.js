import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6zxXJIIc3w-tLK8VjKyeDoG1g7wjKDyU",
    authDomain: "mooor-f5d7e.firebaseapp.com",
    projectId: "mooor-f5d7e",
    storageBucket: "mooor-f5d7e.firebasestorage.app",
    messagingSenderId: "201169950221",
    appId: "1:201169950221:web:80a3269232402d765b6744"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);