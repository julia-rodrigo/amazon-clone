// Import the functions you need from the SDKs you need
///import * as firebase from 'firebase';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALZcMT-L9RFa4g17_xNANdfwPy2WZNE0Y",
  authDomain: "again-d5564.firebaseapp.com",
  projectId: "again-d5564",
  storageBucket: "again-d5564.appspot.com",
  messagingSenderId: "90579958253",
  appId: "1:90579958253:web:67ae447311aabd1779cfe4",
  measurementId: "G-1NGJPP6MJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth();



export { db, auth };
