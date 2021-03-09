import firebase from 'firebase';
import "firebase/auth";
import firebaseConfig from './config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();