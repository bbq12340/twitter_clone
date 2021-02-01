import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyDFIyyPT0edZMFTaK8YwxLlLEPORHvGAM8",
  authDomain: "twitterclone-20fba.firebaseapp.com",
  projectId: "twitterclone-20fba",
  storageBucket: "twitterclone-20fba.appspot.com",
  messagingSenderId: "630905313062",
  appId: "1:630905313062:web:cbdf795572d338cfd893e7"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();

export const dbService = firebase.firestore();

export const storageService = firebase.storage();