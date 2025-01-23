import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCB6RiYKaDzDknfd8wtBCSb1QMchMnjVsA",
  authDomain: "filmflare-e43a3.firebaseapp.com",
  projectId: "filmflare-e43a3",
  storageBucket: "filmflare-e43a3.appspot.com",
  messagingSenderId: "855619696522",
  appId: "1:855619696522:web:1e98e51c7e358f023afa73",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const database = getDatabase(app);
export const refdb = ref;
