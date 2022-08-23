// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { enableIndexedDbPersistence } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyABj_ekTdB7AUm0E65zTi71acscuulXbxo",
  authDomain: "everiplanet.firebaseapp.com",
  projectId: "everiplanet",
  storageBucket: "everiplanet.appspot.com",
  messagingSenderId: "488349329471",
  appId: "1:488349329471:web:60e17e8e677e32bfc4708a",
  measurementId: "G-8NY3S3GHFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

firebase.initializeApp(firebaseConfig); //firebase 초기화

export const db = firebase.firestore(); //store 사용


enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });