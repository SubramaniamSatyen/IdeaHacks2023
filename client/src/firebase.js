import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC87RnZxIm5nDEZMDs3HZgrlH4VdqHf2MQ",
  authDomain: "*****",
  databaseURL: "https://ideahacks-bc810-default-rtdb.firebaseio.com/",
  projectId: "ideahacks-bc810",
  storageBucket: "*****",
  messagingSenderId: "*****",
  appId: "*****",
  measurementId: "*****",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);