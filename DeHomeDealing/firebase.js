// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8e3W0QazNLp464hru5q_JLplyvw8s8uY",
  authDomain: "housingfyp.firebaseapp.com",
  projectId: "housingfyp",
  storageBucket: "housingfyp.appspot.com",
  messagingSenderId: "168305160823",
  appId: "1:168305160823:web:36a6fd037d9d3f09d88c72",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
