// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzhircumL5ryztjZeujEaELZ4bObGBWFw",
  authDomain: "email-password-auth-91b5c.firebaseapp.com",
  projectId: "email-password-auth-91b5c",
  storageBucket: "email-password-auth-91b5c.appspot.com",
  messagingSenderId: "436447053026",
  appId: "1:436447053026:web:583d8c675f56d049dfcabb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;