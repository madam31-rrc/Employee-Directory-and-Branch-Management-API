import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

let db: ReturnType<typeof getFirestore> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

try {
  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    if (!getApps().length) {
      // private key in .env often contains \n sequences; convert them.
      const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");
      const serviceAccount = {
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey,
      };
      initializeApp({ credential: cert(serviceAccount as any) });
    }
    db = getFirestore();
    auth = getAuth();
  } else {
    // not configured — tests will mock this file
    // eslint-disable-next-line no-console
    console.log("Firebase not configured (FIREBASE_ env vars missing).");
  }
} catch (err) {
  // eslint-disable-next-line no-console
  console.log("Failed to initialize firebase", err);
}

export { db, auth };
