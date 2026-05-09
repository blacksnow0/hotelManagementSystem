import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export default function useAvailableRooms(
  hotelId
) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    if (!hotelId) return;

    const roomsRef = collection(db, "rooms");

    const q = query(
      roomsRef,

      where("hotelId", "==", hotelId),

      where("status", "==", "available")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rooms = snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

        setRooms(rooms);
      }
    );

    return () => unsubscribe();
  }, [hotelId]);

  return rooms;
}