import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDoc
} from "firebase/firestore";

import { db } from "../firebase/firebase";


export function listenToRooms(
  hotelId,
  callback
) {
  const roomsRef = collection(db, "rooms");

  const q = query(
    roomsRef,
    where("hotelId", "==", hotelId)
  );

  return onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(rooms);
  });
}


export async function updateRoomStatus(
  roomId,
  status
) {
  const roomRef = doc(db, "rooms", roomId);

  await updateDoc(roomRef, {
    status,
  });
}


export async function checkOutRoom(
  roomId
) {
  const roomRef = doc(db, "rooms", roomId);

  /* GET CURRENT ROOM */
  const roomSnap = await getDoc(
    roomRef
  );

  const roomData = roomSnap.data();

  const bookingId =
    roomData.currentBookingId;

  /* UPDATE ROOM */
  await updateDoc(roomRef, {
    status: "cleaning",

    currentGuestName: "",

    currentBookingId: null,
  });

  /* UPDATE BOOKING */
  if (bookingId) {
    const bookingRef = doc(
      db,
      "bookings",
      bookingId
    );

    await updateDoc(bookingRef, {
      status: "completed",
    });
  }
}


export async function markRoomClean(
  roomId
) {
  const roomRef = doc(db, "rooms", roomId);

  await updateDoc(roomRef, {
    status: "available",
  });
}

export async function assignRoom({
  roomId,
  bookingId,
  guestName,
}) {
  const roomRef = doc(db, "rooms", roomId);

  const bookingRef = doc(
    db,
    "bookings",
    bookingId
  );

  /* ROOM RESERVED */
  await updateDoc(roomRef, {
    status: "reserved",

    currentBookingId: bookingId,

    currentGuestName: guestName,
  });

  /* BOOKING ASSIGNED */
  await updateDoc(bookingRef, {
    status: "assigned",

    assignedRoomId: roomId,
  });
}

export async function checkInRoom(
  roomId,
  bookingId
) {
  const roomRef = doc(db, "rooms", roomId);

  const bookingRef = doc(
    db,
    "bookings",
    bookingId
  );

  /* ROOM OCCUPIED */
  await updateDoc(roomRef, {
    status: "occupied",
  });

  /* BOOKING CHECKED IN */
  await updateDoc(bookingRef, {
    status: "checked_in",
  });
}

export async function shiftRoom({
  oldRoomId,
  newRoomId,
}) {
  /* OLD ROOM */
  const oldRoomRef = doc(
    db,
    "rooms",
    oldRoomId
  );

  /* GET CURRENT DATA */
  const oldRoomSnap = await getDoc(
    oldRoomRef
  );

  const oldRoomData =
    oldRoomSnap.data();

  /* NEW ROOM */
  const newRoomRef = doc(
    db,
    "rooms",
    newRoomId
  );

  /* CLEAR OLD ROOM */
  await updateDoc(oldRoomRef, {
    status: "available",

    currentBookingId: null,

    currentGuestName: "",
  });

  /* MOVE TO NEW ROOM */
  await updateDoc(newRoomRef, {
    status: "occupied",

    currentBookingId:
      oldRoomData.currentBookingId,

    currentGuestName:
      oldRoomData.currentGuestName,
  });
}