import { firestoreActionsService } from "./firestoreActions.service";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebaseService from "./firebase.service";
import { collection, getDocs } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const auth = firebaseService.auth;
const STORAGE_KEY_LOGGEDIN_USER = "loggedinUser";
const collectionName = "user";
const db = firebaseService.db
const storage = firebaseService.storage;

export const userService = {
  login,
  logout,
  signup,
  uploadDiploma,
  getLoggedinUser,
  getUsers,
  getMedicalCard,
  remove,
  therapistStatus,
  update,
  updateMedicalCard,
  getById,
  UploadMedicalCard,
};

window.us = userService;

function getUsers() {
  const usersCollectionRef = collection(db, "user");
  return getDocs(usersCollectionRef);
}

function getMedicalCard() {
  const usersCollectionRef = collection(db, "medical cards");
  return getDocs(usersCollectionRef);
}

async function remove(user) {
  try {
    await firestoreActionsService.deleteDocument(collectionName, user.id);
  } catch (err) {
    console.log(err);
  }
}

async function therapistStatus(userId, status) {
  try {
    await firestoreActionsService.updateFiled(collectionName, userId, status);
  } catch (err) {
    console.log(err);
  }
}

async function update(user) {
  try {
    await firestoreActionsService.updateDocument(user.id, collectionName, user);
    saveLocalUser(user)
  } catch (err) {
    console.log(err);
  }
}

async function updateMedicalCard(user) {
  try {
    await firestoreActionsService.updateDocument(user.id, "medical cards", user);
    saveLocalUser(user)
  } catch (err) {
    console.log(err);
  }
}

async function getById(userId) {
  // const user = firebaseService
  // return user;
}

async function login(userToLogin) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userToLogin.email,
      userToLogin.password
    );
    const user = await firestoreActionsService.getDocument(
      collectionName,
      userCredential.user.uid
    );
    if (user) saveLocalUser(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

async function signup(user) {
  try {
    const loggedUser = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    user.id = loggedUser.user.uid;
    await firestoreActionsService.addDocument(user, collectionName, user.id);
  } catch (err) {
    console.log(err);
  }
}

async function uploadDiploma(diploma, user) {
  var val = user.id
  try {
    if(user.userType === "Therapist"){
      const imageRef = ref(storage, `diploma/${val}/${user.id + v4()}`);
      await uploadBytes(imageRef, diploma);
    }
  } catch (err) {
    console.log(err);
  }
}

async function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);
}

function saveLocalUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user));
  return user;
}

function getLoggedinUser() {
  return JSON.parse(
    sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || "null"
  );
}

async function UploadMedicalCard(user) {
  try {
    await firestoreActionsService.addDocument(user, "medical cards", user.id);
  } catch (err) {
    console.log(err);
  }
}
