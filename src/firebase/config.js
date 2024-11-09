import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7qCmG3t-eif0SB47tD6JgVFpxWrMZHvI",
  authDomain: "reactdemo-1f931.firebaseapp.com",
  projectId: "reactdemo-1f931",
  storageBucket: "reactdemo-1f931.firebasestorage.app",
  messagingSenderId: "19545791521",
  appId: "1:19545791521:web:8d26e5b0dde9ba7f62d760",
  measurementId: "G-B8KRVL2YBW"
};

  initializeApp(firebaseConfig);

  const db = getFirestore();

  export {db}