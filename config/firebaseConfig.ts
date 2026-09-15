// config/firebaseConfig.ts
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    const creds = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    admin.initializeApp({
      credential: admin.credential.cert(creds),
    });
  } else {
    admin.initializeApp();
  }
}

export const auth = admin.auth();
export const db = getFirestore();
