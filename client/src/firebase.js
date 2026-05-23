import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDbHOeQ0iR5sAQwYvd0DASujGMCVvMCS-o",
    authDomain: "flipkartclone-f6704.firebaseapp.com",
    projectId: "flipkartclone-f6704",
    storageBucket: "flipkartclone-f6704.firebasestorage.app",
    messagingSenderId: "234196998080",
    appId: "1:234196998080:web:990724bd9a2b59f1cf9a25",
    measurementId: "G-1DEZ5QS4M5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
