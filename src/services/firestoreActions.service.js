import { getFirestore, getDoc, setDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import firebaseService from "./firebase.service";

export const firestoreActionsService = {
  addDocument,
  deleteDocument,
  updateDocument,
  getDocument,
  updateFiled,
  updateDocumentOfMedicalCard,
};

const db = getFirestore(firebaseService.app);

async function updateFiled(collectionName, docName, status) {
  try {
    const washingtonRef = doc(db, collectionName, docName);
    return await updateDoc(washingtonRef, {
      confirmation: status
    });
  } catch (err) {
    console.log(err);
  }
}

async function getDocument(collectionName, docName) {
  try {
    const docRef = doc(db, collectionName, docName);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
    }
  } catch (e) {
    throw new Error(
      `Error was on getting document in collection:${collectionName}, desc:${e}`
    );
  }
}

async function addDocument(entity, collectionName, docName) {
  try {
    return await setDoc(doc(db, collectionName, docName), entity);
  } catch (e) {
    throw new Error(
      `Error was on adding document in collection:${collectionName}, desc:${e}`
    );
  }
}

async function deleteDocument(collectionName, docName) {
  try {
    return await deleteDoc(doc(db, collectionName, docName));
  } catch (e) {
    throw new Error(
      `Error was on deleting document in collection:${collectionName}, desc:${e}`
    );
  }
}

async function updateDocument(docName, collectionName, user) {
  try {
    const washingtonRef = doc(db, collectionName, docName);
    await updateDoc(washingtonRef, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      city: user.city,
      streetAddress: user.streetAddress
    });
  } catch (e) {
    throw new Error(
      `Error was on updating document in collection:${collectionName}, desc:${e}`
    );
  }
}

async function updateDocumentOfMedicalCard(docName, collectionName, medicalCard) {
  try {
    const washingtonRef = doc(db, collectionName, docName);
    await updateDoc(washingtonRef, {
      firstName: medicalCard.firstName,
      lastName: medicalCard.lastName,
      phoneNumber: medicalCard.phoneNumber,
      city: medicalCard.city,
      streetAddress: medicalCard.streetAddress,
      regularMedications: medicalCard.regularMedications,
      emergencyContactPerson: medicalCard.emergencyContactPerson
    });
  } catch (e) {
    throw new Error(
      `Error was on updating document in collection:${collectionName}, desc:${e}`
    );
  }
}
