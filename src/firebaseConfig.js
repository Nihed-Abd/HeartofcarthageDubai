// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCB1JJ6Q6jQI6dqXNys4wYxvIz6llXPJDQ",
  authDomain: "heart-carthage-dubai.firebaseapp.com",
  projectId: "heart-carthage-dubai",
  storageBucket: "heart-carthage-dubai.appspot.com", 
  messagingSenderId: "454520032825",
  appId: "1:454520032825:web:333a746c8fd1eabb49c7e8",
  measurementId: "G-T86ZM6L2EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Firestore Database

export { db };
