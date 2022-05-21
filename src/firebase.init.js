// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAECjswsai6xD-n2tjMR7AyhOZVVjItjxw",
    authDomain: "practice-assignment-71663.firebaseapp.com",
    projectId: "practice-assignment-71663",
    storageBucket: "practice-assignment-71663.appspot.com",
    messagingSenderId: "766633124029",
    appId: "1:766633124029:web:e0f4f8d63320da1e9517d4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;