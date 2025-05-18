// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrrZ-or7jVihcxOTkwxR7ypcI19HZZg_k',
  authDomain: 'dashboard-ea48b.firebaseapp.com',
  databaseURL: 'https://dashboard-ea48b-default-rtdb.firebaseio.com',
  projectId: 'dashboard-ea48b',
  storageBucket: 'dashboard-ea48b.firebasestorage.app',
  messagingSenderId: '822718255367',
  appId: '1:822718255367:web:9da29f4b55ede36ce775a2',
  measurementId: 'G-DGZX3KPX23',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
