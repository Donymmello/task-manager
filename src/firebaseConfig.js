import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Depuração: Verifique se as variáveis de ambiente estão sendo carregadas corretamente
console.log("API Key carregada:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("API Key:", process.env.REACT_APP_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.REACT_APP_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.REACT_APP_FIREBASE_PROJECT_ID);

// Configuração do Firebase com variáveis de ambiente
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
