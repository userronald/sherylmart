// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // Firestore for storing product data

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEAv9YN6BMutCwDn6192tHxjnKK6l4Isc",
  authDomain: "sherylmart-products-data.firebaseapp.com",
  projectId: "sherylmart-products-data",
  storageBucket: "sherylmart-products-data.firebasestorage.app",
  messagingSenderId: "925583623569",
  appId: "1:925583623569:web:e4d7f998e75466ae5f4630",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);  // Firestore instance to interact with the Firestore database

export { db };  // Export the db instance to use in other files