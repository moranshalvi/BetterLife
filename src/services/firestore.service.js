import admin from "firebase-admin";
import { getFirestore } from "firebase/firestore";

import serviceAccount from "../.firebase/serviceAccount.json";

if (!admin.apps.length)
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

module.exports = {
  getFirestore,
};
