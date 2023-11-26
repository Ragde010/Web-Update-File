import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClWxT3o4-IxRkAnHbNjSmZavVcXmKekzo",
  authDomain: "react-auth-cd44f.firebaseapp.com",
  projectId: "react-auth-cd44f",
  storageBucket: "react-auth-cd44f.appspot.com",
  messagingSenderId: "56604501755",
  appId: "1:56604501755:web:4cbff59b8b7287e9d5325e"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app;