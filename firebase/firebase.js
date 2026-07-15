import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTZe8ONLkvqDcYSDx4zvczus-kxXLLwtc",
  authDomain: "project-nexus-v3.firebaseapp.com",
  projectId: "project-nexus-v3",
  storageBucket: "project-nexus-v3.firebasestorage.app",
  messagingSenderId: "89012047732",
  appId: "1:89012047732:web:a8b0aba1c6d9aeab41a621"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
const db = getFirestore(app);

// Authentication
const auth = getAuth(app);

// Google Login Provider
const provider = new GoogleAuthProvider();

// Export everything
export { app, db, auth, provider };