// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLU3Vrq32H6zsa-Phgc7i7lt108IklggQ",
  authDomain: "ferdafinance-24675.firebaseapp.com",
  projectId: "ferdafinance-24675",
  storageBucket: "ferdafinance-24675.appspot.com",
  messagingSenderId: "901263946007",
  appId: "1:901263946007:web:c640802a95d1f15f254752",
  measurementId: "G-HP1XDKGWVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

export { auth, db };