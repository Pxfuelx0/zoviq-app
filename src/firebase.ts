import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCNsR12B9XjxFmxjGlwm-67WNBDhwXao_4",
  authDomain: "zoviq-infra.firebaseapp.com",
  projectId: "zoviq-infra",
  storageBucket: "zoviq-infra.firebasestorage.app",
  messagingSenderId: "591594296167",
  appId: "1:591594296167:web:8b30269d068cea6b0b15c2",
  measurementId: "G-TV6NST9VDV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
