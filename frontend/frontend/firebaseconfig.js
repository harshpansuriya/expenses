import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
    apiKey: "AIzaSyCjWm6w1dxNPFn5Mi0fHrRYy1ox70CPF2w",
    authDomain: "ex-me-414423.firebaseapp.com",
    projectId: "ex-me-414423",
    storageBucket: "ex-me-414423.appspot.com",
    messagingSenderId: "347853190610",
    appId: "1:347853190610:web:6528700aad263b4e71c40b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);

export { app, auth };
