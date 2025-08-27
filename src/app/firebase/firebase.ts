// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCETRYIbCfJf4_KVeycitUjeLE-BBJN61g",
  authDomain: "placearena-323f6.firebaseapp.com",
  projectId: "placearena-323f6",
  storageBucket: "placearena-323f6.firebasestorage.app",
  messagingSenderId: "202220710234",
  appId: "1:202220710234:web:b61f54bc28c611bfe26b63",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export the auth object
export const auth = getAuth(app);
