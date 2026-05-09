import {
  addDoc,
  doc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

/* CREATE PAYMENT */
export async function createPayment(
  paymentData
) {
  const paymentsRef = collection(
    db,
    "payments"
  );

  await addDoc(paymentsRef, {
    ...paymentData,

    verificationStatus:
      "pending_verification",

    createdAt: serverTimestamp(),
  });
}

/* BOOKING PAYMENTS */
export function listenToBookingPayments(
  bookingId,
  callback
) {
  const paymentsRef = collection(
    db,
    "payments"
  );

  const q = query(
    paymentsRef,

    where("bookingId", "==", bookingId),

    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const payments = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(payments);
  });
}

export async function verifyPayment(
  paymentId
) {
  const paymentRef = doc(
    db,
    "payments",
    paymentId
  );

  await updateDoc(paymentRef, {
    verificationStatus: "verified",
  });
}


export function listenToPendingPayments(
  callback
) {
  const paymentsRef = collection(
    db,
    "payments"
  );

  const q = query(
    paymentsRef,

    where(
      "verificationStatus",
      "==",
      "pending_verification"
    ),

    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const payments = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(payments);
  });
}