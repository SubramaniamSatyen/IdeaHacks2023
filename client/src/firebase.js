import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC87RnZxIm5nDEZMDs3HZgrlH4VdqHf2MQ",
  authDomain: "ideahacks-bc810.firebaseapp.com",
  databaseURL: "https://ideahacks-bc810-default-rtdb.firebaseio.com",
  projectId: "ideahacks-bc810",
  storageBucket: "ideahacks-bc810.appspot.com",
  messagingSenderId: "893065363520",
  appId: "1:893065363520:web:378496b16b9f6109151fa5",
  measurementId: "G-565JG8L2WB"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);