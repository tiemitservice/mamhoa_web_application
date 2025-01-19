import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyCX7yjNa_yXCKHJ7fJ1Z7Gjz1NI-j3O6ZE",
    authDomain: "mamahoa-aa9ee.firebaseapp.com",
    projectId: "mamahoa-aa9ee",
    storageBucket: "mamahoa-aa9ee.firebasestorage.app",
    messagingSenderId: "793796155978",
    appId: "1:793796155978:web:ca6156e9d20c7c693464b3",
    measurementId: "G-Y7692P4JXD"
};


const firebaseApp = initializeApp(firebaseConfig);
const projectFirestore = getFirestore(firebaseApp);
const projectAuth = getAuth(firebaseApp);
const projectStorage = getStorage(firebaseApp);
const timestamp = serverTimestamp;
export { projectAuth, projectFirestore, projectStorage, timestamp };