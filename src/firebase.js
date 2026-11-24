import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCniBJ8npMmOeCaQ8bK7cjARVE2WXhg2Z8",
  authDomain: "winners-91dcd.firebaseapp.com",
  projectId: "winners-91dcd",
  storageBucket: "winners-91dcd.firebasestorage.app",
  messagingSenderId: "319537801958",
  appId: "1:319537801958:web:d5c401cb07e46fef552927",
  measurementId: "G-QMJ63561TG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
export const db = getFirestore(app);
