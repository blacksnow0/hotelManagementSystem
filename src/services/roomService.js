import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
  getDoc,
  addDoc,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export function listenToRooms(hotelId, callback) {
  const roomsRef = collection(db, "rooms");

  const q = query(roomsRef, where("hotelId", "==", hotelId));

  return onSnapshot(q, (snapshot) => {
    const rooms = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(rooms);
  });
}

export async function updateRoomStatus(roomId, status) {
  const roomRef = doc(db, "rooms", roomId);

  await updateDoc(roomRef, {
    status,
  });
}

export async function checkOutRoom(roomId) {
  const roomRef = doc(db, "rooms", roomId);

  /* GET CURRENT ROOM */
  const roomSnap = await getDoc(roomRef);

  const roomData = roomSnap.data();

  const bookingId = roomData.currentBookingId;

  /* UPDATE ROOM */
  await updateDoc(roomRef, {
    status: "cleaning",

    currentGuestName: "",

    currentBookingId: null,
  });

  /* UPDATE BOOKING */
  if (bookingId) {
    const bookingRef = doc(db, "bookings", bookingId);

    await updateDoc(bookingRef, {
      status: "completed",
    });
  }
}

export async function markRoomClean(roomId) {
  const roomRef = doc(db, "rooms", roomId);

  await updateDoc(roomRef, {
    status: "available",
  });
}

// export async function assignRoom({
//   roomId,
//   bookingId,
//   guestName,
// }) {
//   const roomRef = doc(db, "rooms", roomId);

//   const bookingRef = doc(
//     db,
//     "bookings",
//     bookingId
//   );

//   /* ROOM RESERVED */
//   await updateDoc(roomRef, {
//     status: "reserved",

//     currentBookingId: bookingId,

//     currentGuestName: guestName,
//   });

//   /* BOOKING ASSIGNED */
//   await updateDoc(bookingRef, {
//     status: "assigned",

//     assignedRoomId: roomId,
//   });
// }

export async function assignRoom({
  roomId,
  bookingId,
  guestName,
}) {
  /* ===============================
     REFS
  =============================== */
  const roomRef = doc(
    db,
    "rooms",
    roomId
  );

  const bookingRef = doc(
    db,
    "bookings",
    bookingId
  );

  /* ===============================
     FETCH DATA
  =============================== */
  const bookingSnap =
    await getDoc(bookingRef);

  const roomSnap =
    await getDoc(roomRef);

  const bookingData =
    bookingSnap.data();

  const roomData = roomSnap.data();

  /* ===============================
     VALIDATION
  =============================== */
  if (
    bookingData.assignedRooms
      ?.length >=
    bookingData.roomsRequired
  ) {
    throw new Error(
      "All required rooms already assigned"
    );
  }

  /* ===============================
     ROOM SNAPSHOT
  =============================== */
  const roomPayload = {
    roomId,

    roomNumber:
      roomData.roomNumber,

    floor: roomData.floor,

    type: roomData.type,
  };

  /* ===============================
     UPDATE ROOM
  =============================== */
  await updateDoc(roomRef, {
    status: "reserved",

    currentBookingId: bookingId,

    currentGuestName: guestName,
  });

  /* ===============================
     UPDATE BOOKING
  =============================== */
  await updateDoc(bookingRef, {
    assignedRooms:
      arrayUnion(roomPayload),
  });
}


export async function updateBookingAllocation({
  bookingId,
  selectedRooms,
  guestName,
}) {
  /* ===============================
     BOOKING REF
  =============================== */
  const bookingRef = doc(
    db,
    "bookings",
    bookingId
  );

  const bookingSnap =
    await getDoc(bookingRef);

  const bookingData =
    bookingSnap.data();

  const currentAssignedRooms =
    bookingData.assignedRooms || [];

  /* ===============================
     CALCULATE DIFF
  =============================== */

  /* ROOMS TO REMOVE */
  const roomsToRemove =
    currentAssignedRooms.filter(
      (roomId) =>
        !selectedRooms.includes(roomId)
    );

  /* ROOMS TO ADD */
  const roomsToAdd =
    selectedRooms.filter(
      (roomId) =>
        !currentAssignedRooms.includes(
          roomId
        )
    );

  /* ===============================
     REMOVE OLD ROOMS
  =============================== */
  for (const roomId of roomsToRemove) {
    const roomRef = doc(
      db,
      "rooms",
      roomId
    );

    await updateDoc(roomRef, {
      status: "available",

      currentBookingId: null,

      currentGuestName: null,
    });
  }

  /* ===============================
     ASSIGN NEW ROOMS
  =============================== */
  for (const roomId of roomsToAdd) {
    const roomRef = doc(
      db,
      "rooms",
      roomId
    );

    await updateDoc(roomRef, {
      status: "reserved",

      currentBookingId: bookingId,

      currentGuestName: guestName,
    });
  }

  /* ===============================
     UPDATE BOOKING
  =============================== */
  await updateDoc(bookingRef, {
    assignedRooms: selectedRooms,
  });
}

export async function checkInRoom(roomId, bookingId) {
  const roomRef = doc(db, "rooms", roomId);

  const bookingRef = doc(db, "bookings", bookingId);

  /* ROOM OCCUPIED */
  await updateDoc(roomRef, {
    status: "occupied",
  });

  /* BOOKING CHECKED IN */
  await updateDoc(bookingRef, {
    status: "checked_in",
  });

  await updateDoc(bookingRef, {
    assignedRooms: arrayUnion(roomId),
  });
}

export async function checkInRooms(roomIds, bookingId) {
  try {
    /* UPDATE ALL ROOMS */
    const roomPromises = roomIds.map((roomId) => {
      const roomRef = doc(db, "rooms", roomId);

      return updateDoc(roomRef, {
        status: "occupied",
      });
    });

    await Promise.all(roomPromises);

    /* UPDATE BOOKING */
    const bookingRef = doc(db, "bookings", bookingId);

    await updateDoc(bookingRef, {
      status: "checked_in",

    });

    console.log("All rooms checked in successfully");
  } catch (error) {
    console.error("Check-in failed:", error);
  }
}

export async function shiftRoom({ oldRoomId, newRoomId }) {
  /* OLD ROOM */
  const oldRoomRef = doc(db, "rooms", oldRoomId);

  /* GET CURRENT DATA */
  const oldRoomSnap = await getDoc(oldRoomRef);

  const oldRoomData = oldRoomSnap.data();

  /* NEW ROOM */
  const newRoomRef = doc(db, "rooms", newRoomId);

  /* CLEAR OLD ROOM */
  await updateDoc(oldRoomRef, {
    status: "available",

    currentBookingId: null,

    currentGuestName: "",
  });

  /* MOVE TO NEW ROOM */
  await updateDoc(newRoomRef, {
    status: "occupied",

    currentBookingId: oldRoomData.currentBookingId,

    currentGuestName: oldRoomData.currentGuestName,
  });
}

// export async function createRooms({
//   hotelId,
//   floor,
//   startRoom,
//   endRoom,
//   capacity,
//   type,
// }) {
//   const roomsRef = collection(db, "rooms");

//   const roomPromises = [];

//   for (let roomNumber = startRoom; roomNumber <= endRoom; roomNumber++) {
//     roomPromises.push(
//       addDoc(roomsRef, {
//         hotelId,

//         floor,

//         roomNumber: roomNumber.toString(),

//         capacity,

//         type,

//         status: "available",

//         currentBookingId: null,

//         currentGuestName: "",
//       }),
//     );
//   }

//   await Promise.all(roomPromises);
// }


export async function createRooms(
  rooms = []
) {
  try {
    const promises = rooms.map(
      (room) => {
        return addDoc(
          collection(db, "rooms"),
          {
            hotelId: room.hotelId,

            floor: room.floor,

            roomNumber:
              room.roomNumber,

            capacity:
              room.capacity,

            type: room.type,

            status: "available",

            currentBookingId: null,

            currentGuestName: "",
          }
        );
      }
    );

    await Promise.all(promises);
  } catch (error) {
    console.error(error);

    throw error;
  }
}