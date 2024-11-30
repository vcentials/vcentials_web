
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyA3pvWdauIVy1V64nlnMorhGWWOqHdPzr0",
    authDomain: "vcentials-4a961.firebaseapp.com",
    projectId: "vcentials-4a961",
    storageBucket: "vcentials-4a961.firebasestorage.app",
    messagingSenderId: "259224233021",
    appId: "1:259224233021:web:5443dd6694c689e8183654",
    measurementId: "G-K0V6VBSN40"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export const auth = getAuth(app);

