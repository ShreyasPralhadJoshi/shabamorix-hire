import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const app = initializeApp({
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const googleLogin = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
export const watchAuth = (cb:(u:any)=>void) => onAuthStateChanged(auth, cb);
