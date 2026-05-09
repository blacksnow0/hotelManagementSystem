import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/firebase";

/* LOGIN */
export async function login(email, password) {
  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  return userCredential.user;
}

/* LOGOUT */
export async function logout() {
  await signOut(auth);
}

/* AUTH LISTENER */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

/* GET FIRESTORE USER PROFILE */
export async function getUserProfile(uid) {
  const userRef = doc(db, "users", uid);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data();
}