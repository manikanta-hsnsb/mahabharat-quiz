import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTAmIErisBTkMIr3niv85ERaBqVcY_LQY",
  authDomain: "ishani-e5e9c.firebaseapp.com",
  projectId: "ishani-e5e9c",
  storageBucket: "ishani-e5e9c.firebasestorage.app",
  messagingSenderId: "26714868930",
  appId: "1:26714868930:web:fe1f21e491760d4218bf5b",
  measurementId: "G-4CEZYQ76S5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);