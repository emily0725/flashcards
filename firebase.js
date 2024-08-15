// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvXhGXpn0F3N-zLMi-2ryjdbanEBUGsgQ",
  authDomain: "flashcardsaas-24c64.firebaseapp.com",
  projectId: "flashcardsaas-24c64",
  storageBucket: "flashcardsaas-24c64.appspot.com",
  messagingSenderId: "1070106348517",
  appId: "1:1070106348517:web:3be9f68d6846284707fd0c",
  measurementId: "G-WDX4DCTY9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}