import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDukGhK8p-jzOf9Upq1RmY9GV2plQfM3pw",
  authDomain: "taskapp-3a1c6.firebaseapp.com",
  databaseURL: "https://taskapp-3a1c6.firebaseio.com",
  projectId: "taskapp-3a1c6",
  storageBucket: "taskapp-3a1c6.appspot.com",
  messagingSenderId: "854892235879",
  appId: "1:854892235879:web:b9a199a5a6e36de1ca98c2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const firestore = firebase.firestore();