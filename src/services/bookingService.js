import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  getDocs
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import getTodayDate from "../utils/getTodayDate";

export async function createBooking(
  bookingData
) {
  const bookingsRef = collection(
    db,
    "bookings"
  );

  await addDoc(bookingsRef, {
    ...bookingData,

    status: "pending_assignment",

    createdAt: serverTimestamp(),
  });
}


export async function listenToBookings() {
  try {
    const bookingsRef = collection(
      db,
      "bookings"
    );

    const q = query(
      bookingsRef,

      orderBy(
        "createdAt",
        "desc"
      )
    );

    const snapshot =
      await getDocs(q);

    const bookings =
      snapshot.docs.map((doc) => ({
        id: doc.id,

        ...doc.data(),
      }));

    return bookings;
  } catch (error) {
    console.error(error);

    throw error;
  }
}

export function listenToHotelBookings(
  hotelId,
  callback
) {
  const today = getTodayDate(0);

  const tomorrow =
    getTodayDate(1);

  const bookingsRef = collection(
    db,
    "bookings"
  );

  const q = query(
    bookingsRef,

    where("hotelId", "==", hotelId),

    where(
      "status",
      "==",
      "pending_assignment"
    ),

    where(
      "checkInDate",
      ">=",
      today
    ),

    where(
      "checkInDate",
      "<=",
      tomorrow
    ),

    orderBy("checkInDate"),

    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(bookings);
  });
}

export function listenToCheckedInBookings(
  hotelId,
  callback
) {
  const bookingsRef = collection(
    db,
    "bookings"
  );

  const q = query(
    bookingsRef,

    where("hotelId", "==", hotelId),

    where("status", "==", "checked_in"),

    orderBy("createdAt", "desc")
  );

  return onSnapshot(q, (snapshot) => {
    const bookings = snapshot.docs.map(
      (doc) => ({
        id: doc.id,
        ...doc.data(),
      })
    );

    callback(bookings);
  });
}