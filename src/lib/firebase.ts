import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let _app: FirebaseApp | null   = null;
let _auth: Auth | null         = null;
let _provider: GoogleAuthProvider | null = null;

/** Call only from browser (inside useEffect or event handlers). */
export function getFirebaseAuth(): Auth {
  if (!_auth) {
    _app  = getApps()[0] ?? initializeApp(firebaseConfig);
    _auth = getAuth(_app);
  }
  return _auth;
}

export function getGoogleProvider(): GoogleAuthProvider {
  if (!_provider) _provider = new GoogleAuthProvider();
  return _provider;
}
