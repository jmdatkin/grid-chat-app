// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_Lt2M1YykSYJjX00LYaUugNjCp-8IHZw",
  authDomain: "gridchatapp.firebaseapp.com",
  projectId: "gridchatapp",
  storageBucket: "gridchatapp.appspot.com",
  messagingSenderId: "803743152274",
  appId: "1:803743152274:web:1eb4ef4b43f8bce7c98e4b",
  measurementId: "G-WNS94XL870"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);