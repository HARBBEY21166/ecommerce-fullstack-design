import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBUgx20HJrk5nx1-CkiNwN7b7UZfpwG_Vk",
  authDomain: "ecommerce-33698.firebaseapp.com",
  databaseURL: "https://ecommerce-33698-default-rtdb.firebaseio.com",
  projectId: "ecommerce-33698",
  storageBucket: "ecommerce-33698.firebasestorage.app",
  messagingSenderId: "572182771672",
  appId: "1:572182771672:web:e388db3327bf1d627724ad",
  measurementId: "G-ZCQP18CKWP"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app);

export { app, auth, db };
