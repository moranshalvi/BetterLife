import { initializeApp } from "firebase/app";
import {
  getAuth,
} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUJVmWsjnr1XqxZV23_HsD-Jqanbynw-g",
  authDomain: "betterlife-moran-eli.firebaseapp.com",
  databaseURL: "https://betterlife-moran-eli-default-rtdb.firebaseio.com",
  projectId: "betterlife-moran-eli",
  storageBucket: "betterlife-moran-eli.appspot.com",
  messagingSenderId: "192128279926",
  appId: "1:192128279926:web:085d485d771109c3278657",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default {
  auth,
  app,
  db,
  storage
};