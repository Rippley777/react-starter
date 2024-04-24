import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBsxlys1FmRwP1YCIXeS-i8kfBsaKcCFIk",
    authDomain: "port-login-321ba.firebaseapp.com",
    projectId: "port-login-321ba",
    storageBucket: "port-login-321ba.appspot.com",
    messagingSenderId: "71090697062",
    appId: "1:71090697062:web:dbb149cc2bda2a7e238ea7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };